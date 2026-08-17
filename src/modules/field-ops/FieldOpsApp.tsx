import React, { useState, useEffect, useCallback } from 'react';
import { User, Job, Screen } from '../../types';
import { getJobs, migrateTimeEntries } from '../../utils/supabase';
import { Header } from '../../components/Header';
import { MobileNav } from '../../components/MobileNav';
import { JobList } from '../../components/JobList';
import { CreateJob } from '../../components/CreateJob';
import { JobDetail } from '../../components/JobDetail';
import { DailyLogForm } from '../../components/DailyLogForm';
import { TimeEntryForm } from '../../components/TimeEntryForm';
import { Timecards } from '../../components/Timecards';
import { PhotoCapture } from '../../components/PhotoCapture';
import { Dashboard } from '../../components/Dashboard';
import { Schedule } from '../../components/Schedule';
import { UserManagement } from '../../components/UserManagement';
import { Announcements } from '../../components/Announcements';
import TimeOffRequests from '../../components/TimeOffRequests';

interface Props {
  currentUser: User;
  users: User[];
  onLogout: () => void;
  onGoHub: () => void;
  onUsersChanged: () => void;
}

export default function FieldOpsApp({ currentUser, users, onLogout, onGoHub, onUsersChanged }: Props) {
  const startScreen: Screen = currentUser.role === 'crew' ? 'time-entry' : currentUser.role === 'payroll' ? 'timecards' : 'jobs';

  const [screen, setScreen] = useState<Screen>(startScreen);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Screen[]>([]);

  useEffect(() => {
    (async () => {
      try {
        await migrateTimeEntries();
        setJobs(await getJobs());
      } catch (err) {
        console.error('Field Ops init failed:', err);
      }
      setLoading(false);
    })();
  }, []);

  const loadJobs = useCallback(async () => {
    try {
      setJobs(await getJobs());
    } catch (err) {
      console.error('Failed to load jobs:', err);
    }
  }, []);

  const navigate = (to: Screen) => {
    setHistory(prev => [...prev, screen]);
    setScreen(to);
  };

  const goBack = () => {
    const prev = history[history.length - 1] || startScreen;
    setHistory(h => h.slice(0, -1));
    setScreen(prev);
    if (prev === 'jobs' || prev === 'dashboard' || prev === 'schedule' || prev === 'timecards' || prev === 'time-entry') {
      setSelectedJobId(null);
    }
  };

  const selectJob = (jobId: string) => {
    setSelectedJobId(jobId);
    navigate('job-detail');
  };

  const navToDailyLog = (jobId?: string, logId?: string) => {
    if (jobId) setSelectedJobId(jobId);
    setEditingLogId(logId || null);
    navigate('daily-log');
  };

  const navToTimeEntry = (jobId?: string) => {
    if (jobId) setSelectedJobId(jobId);
    navigate('time-entry');
  };

  const navToPhotos = (jobId?: string) => {
    if (jobId) setSelectedJobId(jobId);
    navigate('photos');
  };

  const selectedJob = jobs.find(j => j.id === selectedJobId) || null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full flex-1">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-2 text-sm text-base-content/60">Loading Field Ops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full flex-1 bg-base-100 min-h-0">
      <Header user={currentUser} onLogout={onLogout} onGoHub={onGoHub} />

      <MobileNav
        activeScreen={screen}
        currentUser={currentUser}
        onNavigate={(s) => {
          setSelectedJobId(null);
          setHistory([]);
          setScreen(s);
        }}
      />

      <div className="flex-1 overflow-auto">
        {screen === 'jobs' && (
          <JobList
            jobs={jobs}
            currentUser={currentUser}
            onSelectJob={selectJob}
            onCreateJob={() => navigate('create-job')}
            onRefresh={loadJobs}
          />
        )}

        {screen === 'create-job' && (
          <CreateJob
            currentUser={currentUser}
            users={users}
            existingJobs={jobs}
            onBack={goBack}
            onCreated={(jobId) => {
              loadJobs();
              setSelectedJobId(jobId);
              setScreen('job-detail');
            }}
          />
        )}

        {screen === 'job-detail' && selectedJob && (
          <JobDetail
            job={selectedJob}
            currentUser={currentUser}
            users={users}
            onBack={goBack}
            onNavigateDailyLog={navToDailyLog}
            onNavigateTimeEntry={navToTimeEntry}
            onNavigatePhotos={navToPhotos}
            onRefresh={loadJobs}
          />
        )}

        {screen === 'daily-log' && (
          <DailyLogForm
            jobs={jobs}
            currentUser={currentUser}
            users={users}
            preselectedJobId={selectedJobId}
            editLogId={editingLogId}
            onBack={goBack}
            onSaved={loadJobs}
          />
        )}

        {screen === 'time-entry' && (
          <TimeEntryForm
            jobs={jobs}
            currentUser={currentUser}
            users={users}
            preselectedJobId={selectedJobId}
            onBack={goBack}
            onSaved={loadJobs}
          />
        )}

        {screen === 'timecards' && (
          <Timecards
            jobs={jobs}
            users={users}
            currentUser={currentUser}
            onSaved={() => { loadJobs(); onUsersChanged(); }}
          />
        )}

        {screen === 'photos' && (
          <PhotoCapture
            jobs={jobs}
            currentUser={currentUser}
            preselectedJobId={selectedJobId}
            onBack={goBack}
            onSaved={loadJobs}
          />
        )}

        {screen === 'dashboard' && (
          <Dashboard
            jobs={jobs}
            users={users}
            currentUser={currentUser}
            onSelectJob={selectJob}
            onRefresh={() => { loadJobs(); onUsersChanged(); }}
          />
        )}

        {screen === 'schedule' && (
          <Schedule
            jobs={jobs}
            users={users}
            currentUser={currentUser}
            onSelectJob={selectJob}
          />
        )}

        {screen === 'announcements' && (
          <Announcements currentUser={currentUser} />
        )}

        {screen === 'time-off' && (
          <TimeOffRequests currentUser={currentUser} users={users} />
        )}

        {screen === 'user-management' && (
          <UserManagement
            currentUser={currentUser}
            onBack={goBack}
            onUsersChanged={onUsersChanged}
          />
        )}
      </div>
    </div>
  );
}
