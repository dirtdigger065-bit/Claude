import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface Props {
  currentUser: User;
}

// Bid Builder is a standalone vanilla-JS app served from /bid-builder/. It only
// understands two roles: 'admin' and 'estimator'. Every other Field Ops role
// (office, foreman, crew, payroll) gets estimator-level access when it opens
// the module from the Hub.
function toBidBuilderRole(user: User): 'admin' | 'estimator' {
  return user.role === 'admin' ? 'admin' : 'estimator';
}

export const BidBuilderFrame: React.FC<Props> = ({ currentUser }) => {
  const navigate = useNavigate();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  const sendAuth = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        source: 'rdmpe-hub',
        type: 'rdmpe-auth',
        user: { name: currentUser.name, role: toBidBuilderRole(currentUser) },
      },
      window.location.origin
    );
  }, [currentUser]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data;
      if (!data || data.source !== 'rdmpe-bid-builder') return;
      if (data.type === 'ready') {
        setReady(true);
        sendAuth();
      } else if (data.type === 'navigate-hub') {
        navigate('/');
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [navigate, sendAuth]);

  useEffect(() => {
    if (ready) sendAuth();
  }, [ready, sendAuth]);

  return (
    <div className="h-full w-full flex flex-col">
      <iframe
        ref={iframeRef}
        title="Bid Builder"
        src="/bid-builder/index.html"
        className="flex-1 w-full border-0"
        onLoad={sendAuth}
      />
    </div>
  );
};
