import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  startTime: number;
}

export function Timer({ startTime }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      <Clock size={14} />
      <span>{(elapsed / 1000).toFixed(1)}s</span>
    </div>
  );
}