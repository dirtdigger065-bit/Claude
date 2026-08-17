import React from 'react';
import { Briefcase, ClipboardList, Clock, Camera, LayoutDashboard, Calendar, Users, FileText, Megaphone, Palmtree } from 'lucide-react';
import { Screen, User } from '../types';

interface Props {
  activeScreen: Screen;
  currentUser: User;
  onNavigate: (screen: Screen) => void;
}

interface TabDef {
  screen: Screen;
  icon: React.ReactNode;
  label: string;
}

export const MobileNav: React.FC<Props> = ({ activeScreen, currentUser, onNavigate }) => {
  const role = currentUser.role;

  const tabs: TabDef[] = (() => {
    switch (role) {
      case 'admin':
        return [
          { screen: 'jobs', icon: <Briefcase size={20} />, label: 'Jobs' },
          { screen: 'schedule', icon: <Calendar size={20} />, label: 'Schedule' },
          { screen: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
          { screen: 'timecards', icon: <FileText size={20} />, label: 'Timecards' },
          { screen: 'time-off', icon: <Palmtree size={20} />, label: 'Time Off' },
          { screen: 'user-management', icon: <Users size={20} />, label: 'Users' },
          { screen: 'announcements', icon: <Megaphone size={20} />, label: 'TV' },
        ];
      case 'office':
        return [
          { screen: 'jobs', icon: <Briefcase size={20} />, label: 'Jobs' },
          { screen: 'schedule', icon: <Calendar size={20} />, label: 'Schedule' },
          { screen: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
          { screen: 'timecards', icon: <FileText size={20} />, label: 'Timecards' },
          { screen: 'time-off', icon: <Palmtree size={20} />, label: 'Time Off' },
        ];
      case 'foreman':
        return [
          { screen: 'jobs', icon: <Briefcase size={20} />, label: 'Jobs' },
          { screen: 'daily-log', icon: <ClipboardList size={20} />, label: 'Log' },
          { screen: 'timecards', icon: <FileText size={20} />, label: 'Timecards' },
          { screen: 'schedule', icon: <Calendar size={20} />, label: 'Schedule' },
          { screen: 'photos', icon: <Camera size={20} />, label: 'Photos' },
          { screen: 'time-off', icon: <Palmtree size={20} />, label: 'Time Off' },
          { screen: 'announcements', icon: <Megaphone size={20} />, label: 'TV' },
        ];
      case 'crew':
        return [
          { screen: 'time-entry', icon: <Clock size={20} />, label: 'Clock In' },
          { screen: 'photos', icon: <Camera size={20} />, label: 'Photos' },
          { screen: 'time-off', icon: <Palmtree size={20} />, label: 'Time Off' },
        ];
      case 'payroll':
        return [
          { screen: 'timecards', icon: <FileText size={20} />, label: 'Timecards' },
          { screen: 'jobs', icon: <Briefcase size={20} />, label: 'Jobs' },
        ];
      default:
        return [
          { screen: 'jobs', icon: <Briefcase size={20} />, label: 'Jobs' },
        ];
    }
  })();

  return (
    <div className="bg-base-200 border-b border-base-300 z-50 flex-shrink-0">
      <div className="flex w-full">
        {tabs.map(tab => {
          const isActive = activeScreen === tab.screen;
          return (
            <button
              key={tab.screen}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 px-1 gap-0.5 transition-colors min-h-[52px]
                ${isActive
                  ? 'text-primary bg-primary/10 border-b-2 border-primary'
                  : 'text-base-content/60 hover:text-base-content/80 hover:bg-base-300/50 border-b-2 border-transparent'
                }`}
              onClick={() => onNavigate(tab.screen)}
            >
              {tab.icon}
              <span className={`text-[11px] font-medium leading-tight ${isActive ? 'text-primary' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
