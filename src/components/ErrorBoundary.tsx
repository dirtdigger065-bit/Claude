import React from 'react';

interface Props { children: React.ReactNode; }
interface State { hasError: boolean; message: string; }

// Catches render/runtime errors in any child screen so a single broken
// component shows a friendly recovery card instead of white-screening the
// entire app (which previously made unrelated features look "broken" too).
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: any): State {
    return { hasError: true, message: (error && error.message) ? String(error.message) : 'Something went wrong' };
  }

  componentDidCatch(error: any, info: any) {
    console.error('App error caught by ErrorBoundary:', error, info);
  }

  handleReload = () => {
    // Clear the error and force a fresh load of the app.
    this.setState({ hasError: false, message: '' });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6 text-center z-[200]">
          <div className="text-5xl mb-3">🛠️</div>
          <h1 className="text-xl font-bold mb-1">Something hiccuped</h1>
          <p className="text-base-content/60 mb-5 max-w-sm">
            This screen ran into a problem, but your saved work is safe. Tap below to reload.
          </p>
          <button className="btn btn-primary btn-lg min-h-[52px] px-8" onClick={this.handleReload}>
            Reload App
          </button>
          {this.state.message && (
            <p className="text-xs text-base-content/30 mt-6 break-all max-w-xs">{this.state.message}</p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
