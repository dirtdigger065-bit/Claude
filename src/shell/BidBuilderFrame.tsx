import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User } from '../types';

interface Props {
  currentUser: User;
}

interface PendingAction {
  type: 'new-bid';
  mode: 'simple' | 'advanced';
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
  const [searchParams] = useSearchParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);

  // "New Bid — Simple/Advanced" from the Hub arrives as ?newBid=simple|advanced.
  // Consumed exactly once, on the first auth handshake after the child confirms
  // it's listening — otherwise a re-send (onLoad, the ready effect) would fire
  // createNewBid() again and leave a duplicate draft bid behind.
  const newBidParam = searchParams.get('newBid');
  const pendingActionRef = useRef<PendingAction | null>(
    newBidParam === 'simple' || newBidParam === 'advanced' ? { type: 'new-bid', mode: newBidParam } : null
  );

  const sendAuth = useCallback((includeAction: boolean) => {
    const payload: Record<string, unknown> = {
      source: 'rdmpe-hub',
      type: 'rdmpe-auth',
      user: { name: currentUser.name, role: toBidBuilderRole(currentUser) },
    };
    if (includeAction && pendingActionRef.current) {
      payload.action = pendingActionRef.current;
      pendingActionRef.current = null;
    }
    iframeRef.current?.contentWindow?.postMessage(payload, window.location.origin);
  }, [currentUser]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data;
      if (!data || data.source !== 'rdmpe-bid-builder') return;
      if (data.type === 'ready') {
        setReady(true);
        sendAuth(true);
      } else if (data.type === 'navigate-hub') {
        navigate('/');
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [navigate, sendAuth]);

  useEffect(() => {
    if (ready) sendAuth(false);
  }, [ready, sendAuth]);

  return (
    <div className="h-full w-full flex flex-col">
      <iframe
        ref={iframeRef}
        title="Bid Builder"
        src="/bid-builder/index.html"
        className="flex-1 w-full border-0"
        onLoad={() => sendAuth(false)}
      />
    </div>
  );
};
