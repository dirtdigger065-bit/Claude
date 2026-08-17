import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User } from './types';
import { getUsers, ensureDefaultAdmin } from './utils/supabase';
import { LoginScreen } from './components/LoginScreen';
import { TVDashboard } from './components/TVDashboard';
import FieldOpsApp from './modules/field-ops/FieldOpsApp';
import { Hub } from './shell/Hub';
import { BidBuilderFrame } from './shell/BidBuilderFrame';
import { Download, X, Share2 } from 'lucide-react';

const SESSION_KEY = 'rdmpe-session-uid';

interface FieldOpsRouteProps {
  currentUser: User;
  users: User[];
  onLogout: () => void;
  onUsersChanged: () => void;
}

function FieldOpsRoute({ currentUser, users, onLogout, onUsersChanged }: FieldOpsRouteProps) {
  const navigate = useNavigate();
  return (
    <FieldOpsApp
      currentUser={currentUser}
      users={users}
      onLogout={onLogout}
      onGoHub={() => navigate('/')}
      onUsersChanged={onUsersChanged}
    />
  );
}

export default function App() {
  // TV Dashboard mode — no login required, public kiosk display. Computed up
  // front (not an early return) so every hook below still runs on every
  // render, in the same order, regardless of which mode this is.
  const params = new URLSearchParams(window.location.search);
  const isTvMode = params.has('token') || window.location.pathname === '/tv';
  const joinCode = params.get('join');

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(!isTvMode);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const loadUsers = useCallback(async () => {
    if (isTvMode) return;
    try {
      setUsers(await getUsers());
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  }, [isTvMode]);

  useEffect(() => {
    if (isTvMode) return;

    (async () => {
      try {
        await ensureDefaultAdmin();
        const loadedUsers = await getUsers();
        setUsers(loadedUsers);

        const savedUid = sessionStorage.getItem(SESSION_KEY);
        if (savedUid) {
          const restored = loadedUsers.find(u => u.id === savedUid && u.active);
          if (restored) setCurrentUser(restored);
        }
      } catch (err) {
        console.error('Init failed:', err);
      }
      setLoading(false);
    })();

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = localStorage.getItem('pwa-dismissed');
      if (!dismissed || Date.now() - parseInt(dismissed) > 7 * 24 * 60 * 60 * 1000) {
        setShowInstallBanner(true);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [isTvMode]);

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      if (result.outcome === 'accepted') setShowInstallBanner(false);
      setDeferredPrompt(null);
    }
  };

  const dismissInstallBanner = () => {
    setShowInstallBanner(false);
    localStorage.setItem('pwa-dismissed', Date.now().toString());
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem(SESSION_KEY, user.id);
    if (joinCode) window.history.replaceState({}, '', '/');
    showIOSInstallHint();
  };

  const showIOSInstallHint = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;
    const hintShown = localStorage.getItem('ios-hint-shown');
    if (isIOS && !isStandalone && !hintShown) {
      setShowInstallBanner(true);
      localStorage.setItem('ios-hint-shown', 'true');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(SESSION_KEY);
  };

  if (isTvMode) {
    return <TVDashboard />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="mt-2 text-sm text-base-content/60">Loading RDMPE Ops...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} joinCode={joinCode} />;
  }

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;

  return (
    <div className="flex flex-col h-screen bg-base-100">
      {showInstallBanner && !isStandalone && (
        <div className="bg-blue-600 text-white px-4 py-3 flex items-center gap-3 z-[200]">
          <div className="flex-1">
            {isIOS ? (
              <p className="text-sm">
                <strong>📱 Add to Home Screen:</strong> Tap <Share2 size={14} className="inline mx-1" /> then "Add to Home Screen" for quick access
              </p>
            ) : (
              <p className="text-sm">
                <strong>📱 Install RDMPE Ops</strong> — add to your home screen for one-tap access
              </p>
            )}
          </div>
          {deferredPrompt && (
            <button className="btn btn-sm bg-white text-blue-600 border-none hover:bg-blue-50" onClick={handleInstallPWA}>
              <Download size={16} /> Install
            </button>
          )}
          <button className="btn btn-sm btn-ghost text-white" onClick={dismissInstallBanner}>
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex-1 min-h-0">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hub currentUser={currentUser} users={users} onLogout={handleLogout} />} />
            <Route
              path="/field-ops"
              element={
                <FieldOpsRoute
                  currentUser={currentUser}
                  users={users}
                  onLogout={handleLogout}
                  onUsersChanged={loadUsers}
                />
              }
            />
            <Route path="/bid-builder" element={<BidBuilderFrame currentUser={currentUser} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
