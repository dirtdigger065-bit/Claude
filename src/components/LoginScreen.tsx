import React, { useState } from 'react';
import { HardHat, LogIn, UserPlus, ArrowLeft, Phone, User as UserIcon, CheckCircle } from 'lucide-react';
import { User } from '../types';
import { getUserByPin, getUsers, saveUser } from '../utils/supabase';

interface Props {
  onLogin: (user: User) => void;
  joinCode?: string | null;
}

const VALID_JOIN_CODE = 'rdmpe2026';

export const LoginScreen: React.FC<Props> = ({ onLogin, joinCode }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sign-up state
  const [isSignUp, setIsSignUp] = useState(!!joinCode && joinCode === VALID_JOIN_CODE);
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const [createdUser, setCreatedUser] = useState<User | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;
    setLoading(true);
    setError('');
    try {
      const user = await getUserByPin(pin.trim());
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid PIN. Contact your admin.');
        setPin('');
      }
    } catch {
      setError('Connection error. Try again.');
    }
    setLoading(false);
  };

  const handlePinButton = (digit: string) => {
    if (pin.length < 6) setPin(prev => prev + digit);
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const generatePin = (existingPins: string[]): string => {
    let newPin = '';
    do {
      newPin = Math.floor(1000 + Math.random() * 9000).toString();
    } while (existingPins.includes(newPin));
    return newPin;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim()) {
      setSignUpError('Please enter your name');
      return;
    }
    setSignUpLoading(true);
    setSignUpError('');
    try {
      const existingUsers = await getUsers();
      const existingPins = existingUsers.map(u => u.pin);
      const newPin = generatePin(existingPins);

      const newUser: User = {
        id: crypto.randomUUID(),
        name: signUpName.trim(),
        role: 'crew',
        pin: newPin,
        active: true,
        employeeType: 'hourly',
        phone: signUpPhone.trim() || undefined,
        textReminders: !!signUpPhone.trim(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await saveUser(newUser);
      setCreatedUser(newUser);
    } catch (err) {
      setSignUpError('Failed to create account. Try again.');
      console.error(err);
    }
    setSignUpLoading(false);
  };

  // Success screen after sign-up
  if (createdUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-base-100 p-6 overflow-y-auto">
        <div className="text-center max-w-sm">
          <CheckCircle size={64} className="mx-auto text-success mb-4" />
          <h1 className="text-2xl font-bold mb-2">Welcome, {createdUser.name}! 🎉</h1>
          <p className="text-base-content/60 mb-6">Your account has been created.</p>

          <div className="bg-base-200 rounded-2xl p-6 mb-6">
            <p className="text-sm text-base-content/60 mb-2">Your PIN</p>
            <div className="flex justify-center gap-3">
              {createdUser.pin.split('').map((d, i) => (
                <div key={i} className="w-14 h-14 rounded-xl bg-primary text-primary-content flex items-center justify-center text-2xl font-bold">
                  {d}
                </div>
              ))}
            </div>
            <p className="text-xs text-base-content/40 mt-3">Save this PIN — you'll need it every time you log in</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-blue-800 mb-1">📱 Add to Home Screen</p>
            <p className="text-xs text-blue-600">
              {/iPad|iPhone|iPod/.test(navigator.userAgent)
                ? 'Tap the Share button (⬆️) at the bottom of Safari, then "Add to Home Screen"'
                : 'Tap the ⋮ menu in Chrome, then "Add to Home Screen" or "Install App"'}
            </p>
          </div>

          <button className="btn btn-primary w-full btn-lg" onClick={() => onLogin(createdUser)}>
            <LogIn size={20} /> Start Using RDMPE Ops
          </button>
        </div>
      </div>
    );
  }

  // Sign-up form
  if (isSignUp) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-base-100 p-6 overflow-y-auto">
        <div className="text-center mb-6">
          <HardHat size={48} className="mx-auto text-primary mb-3" />
          <h1 className="text-2xl font-bold">Join RDMPE Ops</h1>
          <p className="text-sm text-base-content/60 mt-1">Create your crew account</p>
        </div>

        <form onSubmit={handleSignUp} className="w-full max-w-xs space-y-4">
          <div>
            <label className="label pb-1">
              <span className="label-text font-medium">Your Name *</span>
            </label>
            <div className="relative">
              <UserIcon size={18} className="absolute left-3 top-3.5 text-base-content/40" />
              <input
                type="text"
                className="input input-bordered w-full pl-10 min-h-[48px]"
                placeholder="First and Last Name"
                value={signUpName}
                onChange={e => setSignUpName(e.target.value)}
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="label pb-1">
              <span className="label-text font-medium">Phone Number <span className="text-base-content/40">(optional)</span></span>
            </label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-3.5 text-base-content/40" />
              <input
                type="tel"
                className="input input-bordered w-full pl-10 min-h-[48px]"
                placeholder="(515) 555-1234"
                value={signUpPhone}
                onChange={e => setSignUpPhone(e.target.value)}
              />
            </div>
            <p className="text-xs text-base-content/40 mt-1">For clock-in reminders (can be turned off)</p>
          </div>

          {signUpError && (
            <div className="alert alert-error py-2 text-sm">
              <span>{signUpError}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full min-h-[48px] gap-2" disabled={signUpLoading}>
            {signUpLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              <>
                <UserPlus size={18} /> Create My Account
              </>
            )}
          </button>

          <button type="button" className="btn btn-ghost w-full gap-2" onClick={() => setIsSignUp(false)}>
            <ArrowLeft size={16} /> Already have a PIN? Sign in
          </button>
        </form>
      </div>
    );
  }

  // Normal PIN login
  return (
    <div className="flex flex-col items-center justify-center h-full bg-base-100 p-6 overflow-y-auto">
      <div className="text-center mb-8">
        <HardHat size={48} className="mx-auto text-primary mb-3" />
        <h1 className="text-2xl font-bold">RDMPE Ops</h1>
        <p className="text-sm text-base-content/60 mt-1">Enter your PIN to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        {/* PIN display */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xl font-bold transition-all ${
                pin.length > i
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-base-300 bg-base-200'
              }`}
            >
              {pin.length > i ? '•' : ''}
            </div>
          ))}
        </div>

        {error && (
          <div className="alert alert-error py-2 text-sm">
            <span>{error}</span>
          </div>
        )}

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
            <button
              key={d}
              type="button"
              className="btn btn-lg btn-ghost bg-base-200 text-xl font-bold"
              onClick={() => handlePinButton(d)}
            >
              {d}
            </button>
          ))}
          <button type="button" className="btn btn-lg btn-ghost text-sm" onClick={handleClear}>
            Clear
          </button>
          <button
            type="button"
            className="btn btn-lg btn-ghost bg-base-200 text-xl font-bold"
            onClick={() => handlePinButton('0')}
          >
            0
          </button>
          <button type="button" className="btn btn-lg btn-ghost text-sm" onClick={handleBackspace}>
            ⌫
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full gap-2"
          disabled={loading || pin.length < 4}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <>
              <LogIn size={18} /> Sign In
            </>
          )}
        </button>

        {joinCode === VALID_JOIN_CODE && (
          <button type="button" className="btn btn-ghost w-full gap-2 text-sm" onClick={() => setIsSignUp(true)}>
            <UserPlus size={16} /> New here? Create an account
          </button>
        )}
      </form>
    </div>
  );
};
