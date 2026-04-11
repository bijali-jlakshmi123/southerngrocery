
'use client';

import { useState, useEffect } from 'react';

export default function CountdownTrigger() {
  const [timeLeft, setTimeLeft] = useState('23:59:59');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const hours = 23 - now.getHours();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      setTimeLeft(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <div className="text-3xl font-heading font-black text-secondary tabular-nums">{timeLeft}</div>;
}
