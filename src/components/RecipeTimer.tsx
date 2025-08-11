"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

interface Timer {
  id: string;
  name: string;
  duration: number; // in seconds
  remaining: number;
  isRunning: boolean;
  isCompleted: boolean;
}

export default function RecipeTimer() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerDuration, setNewTimerDuration] = useState(5); // default 5 minutes
  const [showAddForm, setShowAddForm] = useState(false);
  const [audio] = useState(() => {
    if (typeof Audio !== 'undefined') {
      try {
        return new Audio('/notification.mp3');
      } catch (error) {
        console.warn('Audio file not found, notifications will be silent');
        return null;
      }
    }
    return null;
  });

  // Function to show notification when timer completes
  const showNotification = () => {
    if (audio) {
      audio.play().catch((error) => {
        console.warn('Could not play audio notification:', error);
        // Fallback to browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('Timer Complete!', {
            body: 'Your cooking timer has finished!',
            icon: '/favicon.ico'
          });
        }
      });
    } else if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Timer Complete!', {
        body: 'Your cooking timer has finished!',
        icon: '/favicon.ico'
      });
    }
  };

  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    const intervals = intervalRefs.current;
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
    
    return () => {
      // Cleanup intervals on unmount
      Object.values(intervals).forEach(clearInterval);
    };
  }, []);

  const addTimer = () => {
    if (!newTimerName.trim()) return;
    
    const newTimer: Timer = {
      id: Date.now().toString(),
      name: newTimerName.trim(),
      duration: newTimerDuration * 60,
      remaining: newTimerDuration * 60,
      isRunning: false,
      isCompleted: false,
    };

    setTimers(prev => [...prev, newTimer]);
    setNewTimerName('');
    setNewTimerDuration(5);
    setShowAddForm(false);
  };

  const toggleTimer = (id: string) => {
    setTimers(prev => prev.map(timer => {
      if (timer.id === id) {
        if (timer.isRunning) {
          // Stop timer
          if (intervalRefs.current[id]) {
            clearInterval(intervalRefs.current[id]);
            delete intervalRefs.current[id];
          }
          return { ...timer, isRunning: false };
        } else {
          // Start timer
          if (timer.remaining > 0 && !timer.isCompleted) {
            startTimer(id);
            return { ...timer, isRunning: true };
          }
        }
      }
      return timer;
    }));
  };

  const startTimer = (id: string) => {
    const interval = setInterval(() => {
      setTimers(prev => prev.map(timer => {
        if (timer.id === id && timer.isRunning && timer.remaining > 0) {
          const newRemaining = timer.remaining - 1;
          if (newRemaining <= 0) {
            // Timer completed
            showNotification();
            clearInterval(interval);
            delete intervalRefs.current[id];
            return { ...timer, remaining: 0, isRunning: false, isCompleted: true };
          }
          return { ...timer, remaining: newRemaining };
        }
        return timer;
      }));
    }, 1000);

    intervalRefs.current[id] = interval;
  };

  const resetTimer = (id: string) => {
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }
    
    setTimers(prev => prev.map(timer => 
      timer.id === id 
        ? { ...timer, remaining: timer.duration, isRunning: false, isCompleted: false }
        : timer
    ));
  };

  const removeTimer = (id: string) => {
    if (intervalRefs.current[id]) {
      clearInterval(intervalRefs.current[id]);
      delete intervalRefs.current[id];
    }
    
    setTimers(prev => prev.filter(timer => timer.id !== id));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (timer: Timer) => {
    return ((timer.duration - timer.remaining) / timer.duration) * 100;
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Recipe Timer
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Keep track of multiple cooking timers with precision and style. Never miss a perfect cooking moment again!
          </p>
        </div>

        {/* Add Timer Form */}
        <div className="mb-12">
          {!showAddForm ? (
            <div className="mb-12">
              {!showAddForm ? (
                <div className="text-center">
                  <Button
                    onClick={() => setShowAddForm(true)}
                    variant="primary"
                    size="lg"
                    className="animate-in fade-in duration-500 hover:scale-105 transition-transform text-gray-700"
                    icon="⏰"
                  >
                    Add New Timer
                  </Button>
                </div>
              ) : null}
            </div>


          ) : (
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl max-w-2xl mx-auto">
              <div className="mb-6">
                <h3 className="text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  Create New Timer
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Input
                  label="Timer Name"
                  placeholder="e.g., Boil pasta, Bake cake"
                  value={newTimerName}
                  onChange={(e) => setNewTimerName(e.target.value)}
                />
                <Input
                  label="Duration (minutes)"
                  type="number"
                  min="1"
                  max="120"
                  value={newTimerDuration}
                  onChange={(e) => setNewTimerDuration(Number(e.target.value))}
                />
                <div className="flex items-end">
                  <div className="flex gap-2 w-full">
                    <Button
                      onClick={addTimer}
                      variant="success"
                      className="flex-1 hover:scale-105 transition-transform text-gray-700"
                      icon="✅"
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() => setShowAddForm(false)}
                      variant="secondary"
                      className="flex-1 hover:scale-105 transition-transform"
                      icon="❌"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-center text-gray-300">
                Duration range: 1-120 minutes
              </p>
            </div>
          )}
        </div>

        {/* Timers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {timers.map((timer) => (
            <div
              key={timer.id}
              className={`bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-6 shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
                timer.isCompleted
                  ? 'border-l-4 border-l-emerald-600 bg-emerald-500/10'
                  : timer.isRunning
                  ? 'border-l-4 border-l-amber-600 bg-amber-500/10'
                  : 'border-l-4 border-l-neutral-500 hover:border-l-neutral-400'
              }`}
            >
              {/* Timer Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white truncate text-lg">{timer.name}</h3>
                <Button
                  onClick={() => removeTimer(timer.id)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-red-400 hover:bg-red-900/20 rounded-full"
                >
                  ×
                </Button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      timer.isCompleted
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500'
                        : timer.isRunning
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500'
                        : 'bg-gradient-to-r from-neutral-500 to-neutral-400'
                    }`}
                    style={{ width: `${getProgress(timer)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-300 mt-2">
                  <span>0:00</span>
                  <span>{formatTime(timer.duration)}</span>
                </div>
              </div>

              {/* Time Display */}
              <div className="text-center mb-6">
                <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-2 drop-shadow-2xl">
                  {formatTime(timer.remaining)}
                </div>
                <div className="flex items-center justify-center gap-2">
                  {timer.isCompleted ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-700 backdrop-blur-sm">
                      🎉 Completed!
                    </span>
                  ) : timer.isRunning ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-700 backdrop-blur-sm">
                      ⏱️ Running...
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/20 backdrop-blur-sm">
                      ⏰ Ready to start
                    </span>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-3">
                <Button
                  onClick={() => toggleTimer(timer.id)}
                  disabled={timer.isCompleted}
                  variant={timer.isCompleted ? 'secondary' : timer.isRunning ? 'accent' : 'primary'}
                  className="flex-1 hover:scale-105 transition-transform"
                  icon={timer.isRunning ? '⏸️' : '▶️'}
                >
                  {timer.isRunning ? 'Pause' : 'Start'}
                </Button>
                
                <Button
                  onClick={() => resetTimer(timer.id)}
                  variant="secondary"
                  size="md"
                  className="hover:scale-105 transition-transform"
                >
                  🔄
                </Button>
              </div>

              {/* Completion Indicator */}
              {timer.isCompleted && (
                <div className="mt-4 flex items-center justify-center gap-2 text-emerald-300 bg-emerald-500/20 p-3 rounded-lg border border-emerald-700 backdrop-blur-sm">
                  <span className="text-xl">🔔</span>
                  <span className="font-medium">Timer Complete!</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {timers.length === 0 && (
          <div className="text-center py-16 text-gray-300 animate-in fade-in duration-500">
            <div className="text-8xl mb-6 filter drop-shadow-lg">⏰</div>
            <h3 className="text-2xl font-semibold mb-2 text-white">No timers yet</h3>
            <p className="text-lg">Add your first cooking timer to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}