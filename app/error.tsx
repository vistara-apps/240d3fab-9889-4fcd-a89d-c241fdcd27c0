'use client';

import { useEffect } from 'react';
import { Button } from './components/Button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('TradeSage Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="p-4 bg-danger/20 rounded-full w-fit mx-auto mb-6">
          <AlertTriangle className="h-12 w-12 text-danger" />
        </div>
        
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Something went wrong!
        </h2>
        
        <p className="text-text-secondary mb-6">
          We encountered an unexpected error. This has been logged and our team will investigate.
        </p>
        
        <div className="space-y-3">
          <Button onClick={reset} className="w-full">
            Try again
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Return to Dashboard
          </Button>
        </div>
        
        {error.digest && (
          <p className="text-xs text-text-secondary mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
