import React, { useState, useEffect } from 'react';
import { MISSIONS } from '../data/mock';

const MissionSystem = ({ 
  currentMission, 
  onMissionSelect, 
  placedDevices, 
  deviceInventory, 
  onMissionComplete 
}) => {
  const [showMissionSelect, setShowMissionSelect] = useState(!currentMission);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Timer effect for missions with time limits
  useEffect(() => {
    if (currentMission?.timeLimit && timeRemaining === null) {
      setTimeRemaining(currentMission.timeLimit);
    }
  }, [currentMission]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      onMissionComplete(false, "⏰ Time's up! Mission failed.");
    }
  }, [timeRemaining, onMissionComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const checkMissionProgress = () => {
    if (!currentMission) return { completed: 0, total: 0, isComplete: false };

    const { mandatory, optional = {} } = currentMission.requirements;
    let completed = 0;
    let total = 0;

    // Check mandatory requirements
    Object.entries(mandatory).forEach(([locationId, requiredDevices]) => {
      const placedAtLocation = placedDevices[locationId] || [];
      const placedDeviceIds = placedAtLocation.map(device => device.id);
      
      requiredDevices.forEach(requiredDeviceId => {
        total++;
        if (placedDeviceIds.includes(requiredDeviceId)) {
          completed++;
        }
      });
    });

    // Check device limits if any
    if (currentMission.deviceLimits?.total) {
      const totalDevicesPlaced = Object.values(placedDevices)
        .flat()
        .length;
      
      if (totalDevicesPlaced > currentMission.deviceLimits.total) {
        return { completed, total, isComplete: false, error: `Too many devices! Limit: ${currentMission.deviceLimits.total}` };
      }
    }

    const isComplete = completed === total;
    return { completed, total, isComplete };
  };

  const progress = checkMissionProgress();

  const handleMissionSelect = (mission) => {
    onMissionSelect(mission);
    setShowMissionSelect(false);
    if (mission.timeLimit) {
      setTimeRemaining(mission.timeLimit);
    }
  };

  if (showMissionSelect) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-4">🎯 Select Mission</h2>
        <div className="space-y-4">
          {MISSIONS.map((mission) => (
            <div
              key={mission.id}
              onClick={() => handleMissionSelect(mission)}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 cursor-pointer hover:bg-white/30 hover:scale-105 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white text-lg">{mission.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDifficultyColor(mission.difficulty)}`}>
                  {mission.difficulty}
                </span>
              </div>
              <p className="text-slate-200 text-sm mb-3">{mission.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 text-xs">{mission.story}</span>
                {mission.timeLimit && (
                  <span className="text-orange-300 text-xs">⏱️ {formatTime(mission.timeLimit)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!currentMission) return null;

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-white">{currentMission.title}</h2>
        <button
          onClick={() => setShowMissionSelect(true)}
          className="px-3 py-1 bg-slate-600 hover:bg-slate-500 text-white text-xs rounded-lg transition-colors"
        >
          Change Mission
        </button>
      </div>

      {/* Timer */}
      {timeRemaining !== null && (
        <div className="mb-4">
          <div className={`text-center p-2 rounded-lg font-bold ${
            timeRemaining < 60 ? 'bg-red-600 text-white animate-pulse' : 'bg-orange-600 text-white'
          }`}>
            ⏱️ {formatTime(timeRemaining)}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold">Progress</span>
          <span className="text-white text-sm">{progress.completed}/{progress.total}</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              progress.isComplete ? 'bg-green-500' : 'bg-blue-500'
            }`}
            style={{ width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%` }}
          ></div>
        </div>
        {progress.error && (
          <p className="text-red-300 text-xs mt-1">{progress.error}</p>
        )}
      </div>

      {/* Mission Details */}
      <div className="space-y-3">
        <div>
          <h4 className="text-white font-semibold mb-2">📋 Mission Brief</h4>
          <p className="text-slate-200 text-sm">{currentMission.description}</p>
          <p className="text-slate-300 text-xs mt-1 italic">{currentMission.story}</p>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="text-white font-semibold mb-2">✅ Requirements</h4>
          <div className="space-y-2">
            {Object.entries(currentMission.requirements.mandatory).map(([locationId, devices]) => (
              <div key={locationId} className="bg-white/10 rounded-lg p-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-200 text-sm font-medium">
                    {locationId.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <div className="flex space-x-1">
                    {devices.map((deviceId, index) => {
                      const isPlaced = (placedDevices[locationId] || [])
                        .some(device => device.id === deviceId);
                      return (
                        <span
                          key={index}
                          className={`text-xs px-2 py-1 rounded ${
                            isPlaced ? 'bg-green-600 text-white' : 'bg-slate-600 text-slate-300'
                          }`}
                        >
                          {deviceId.replace('_', ' ')}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Limits */}
        {currentMission.deviceLimits && (
          <div>
            <h4 className="text-white font-semibold mb-2">⚠️ Constraints</h4>
            <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-lg p-2">
              <p className="text-yellow-200 text-sm">
                Maximum devices allowed: {currentMission.deviceLimits.total}
              </p>
              <p className="text-yellow-300 text-xs">
                Currently placed: {Object.values(placedDevices).flat().length}
              </p>
            </div>
          </div>
        )}

        {/* Reward */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-3">
          <h4 className="text-white font-semibold mb-1">🏆 Reward</h4>
          <p className="text-purple-200 text-sm">{currentMission.reward}</p>
        </div>

        {/* Mission Complete */}
        {progress.isComplete && (
          <button
            onClick={() => onMissionComplete(true, `🎉 Mission Complete! You earned: ${currentMission.reward}`)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse"
          >
            🎯 Complete Mission
          </button>
        )}
      </div>
    </div>
  );
};

export default MissionSystem;