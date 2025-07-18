import React, { useState } from 'react';
import { generateRandomBuilding, SECURITY_DEVICES, MISSIONS } from '../data/mock';
import DeviceInventory from './DeviceInventory';
import DropZone from './DropZone';
import BuildingMap from './BuildingMap';
import MissionSystem from './MissionSystem';
import { useToast } from '../hooks/use-toast';

const GameBoard = () => {
  const [buildingConfig, setBuildingConfig] = useState(generateRandomBuilding());
  const [draggedDevice, setDraggedDevice] = useState(null);
  const [placedDevices, setPlacedDevices] = useState({});
  const [currentMission, setCurrentMission] = useState(null);
  const [deviceInventory, setDeviceInventory] = useState(
    SECURITY_DEVICES.reduce((acc, device) => {
      acc[device.id] = device.count;
      return acc;
    }, {})
  );
  const [showDropZones, setShowDropZones] = useState(false);
  const { toast } = useToast();

  const handleDragStart = (device) => {
    setDraggedDevice(device);
    setShowDropZones(true);
  };

  const handleDragEnd = () => {
    setDraggedDevice(null);
    setShowDropZones(false);
  };

  const handleDrop = (locationId) => {
    if (!draggedDevice) return;

    const location = [...buildingConfig.windows, ...buildingConfig.doors]
      .find(loc => loc.id === locationId);
    
    if (!location?.allowedDevices.includes(draggedDevice.id)) {
      toast({
        title: "Invalid Placement",
        description: `${draggedDevice.name} cannot be placed on this location.`,
        variant: "destructive"
      });
      return;
    }

    if (deviceInventory[draggedDevice.id] <= 0) {
      toast({
        title: "No Devices Available",
        description: `No more ${draggedDevice.name} devices in inventory.`,
        variant: "destructive"
      });
      return;
    }

    // Check mission device limits
    if (currentMission?.deviceLimits?.total) {
      const totalPlaced = Object.values(placedDevices).flat().length;
      if (totalPlaced >= currentMission.deviceLimits.total) {
        toast({
          title: "Device Limit Exceeded",
          description: `Mission allows only ${currentMission.deviceLimits.total} devices total.`,
          variant: "destructive"
        });
        return;
      }
    }

    // Place device
    setPlacedDevices(prev => ({
      ...prev,
      [locationId]: [...(prev[locationId] || []), draggedDevice]
    }));

    // Remove from inventory
    setDeviceInventory(prev => ({
      ...prev,
      [draggedDevice.id]: prev[draggedDevice.id] - 1
    }));

    toast({
      title: "Device Placed",
      description: `${draggedDevice.name} placed successfully!`
    });

    handleDragEnd();
  };

  const handleRemoveDevice = (locationId, deviceIndex) => {
    const deviceToRemove = placedDevices[locationId][deviceIndex];
    
    // Remove from location
    setPlacedDevices(prev => ({
      ...prev,
      [locationId]: prev[locationId].filter((_, index) => index !== deviceIndex)
    }));

    // Add back to inventory
    setDeviceInventory(prev => ({
      ...prev,
      [deviceToRemove.id]: prev[deviceToRemove.id] + 1
    }));

    toast({
      title: "Device Removed",
      description: `${deviceToRemove.name} returned to inventory.`
    });
  };

  const handleMissionSelect = (mission) => {
    // Generate new random building layout for each mission
    const newBuilding = generateRandomBuilding();
    setBuildingConfig(newBuilding);
    
    setCurrentMission(mission);
    
    // Reset inventory based on mission requirements or use default
    const missionInventory = { ...SECURITY_DEVICES.reduce((acc, device) => {
      acc[device.id] = device.count;
      return acc;
    }, {}) };
    
    setDeviceInventory(missionInventory);
    setPlacedDevices({});
    
    toast({
      title: "Mission Started",
      description: `${mission.title} - ${mission.difficulty} difficulty. New building layout generated!`,
    });
  };

  const handleMissionComplete = (success, message) => {
    toast({
      title: success ? "Mission Complete!" : "Mission Failed",
      description: message,
      variant: success ? "default" : "destructive"
    });
    
    if (success) {
      // Show success message for longer
      setTimeout(() => {
        toast({
          title: "🎉 Well Done!",
          description: "Returning to mission selection...",
        });
      }, 1000);

      // Return to mission selection after success
      setTimeout(() => {
        setCurrentMission(null);
        setPlacedDevices({});
        setDeviceInventory(SECURITY_DEVICES.reduce((acc, device) => {
          acc[device.id] = device.count;
          return acc;
        }, {}));
        // Generate new building for next mission selection
        setBuildingConfig(generateRandomBuilding());
      }, 3000);
    } else {
      // For failed missions, also return to selection after a delay
      setTimeout(() => {
        setCurrentMission(null);
        setPlacedDevices({});
        setDeviceInventory(SECURITY_DEVICES.reduce((acc, device) => {
          acc[device.id] = device.count;
          return acc;
        }, {}));
        setBuildingConfig(generateRandomBuilding());
      }, 2000);
    }
  };

  const checkValidation = () => {
    if (currentMission) {
      // Mission validation is handled by MissionSystem component
      return;
    }

    // Default validation for free play
    let isComplete = true;
    let missingDevices = [];

    // Simple check - at least one device per door
    buildingConfig.doors.forEach(door => {
      const placedAtLocation = placedDevices[door.id] || [];
      if (placedAtLocation.length === 0) {
        isComplete = false;
        missingDevices.push(`Any device at ${door.id.replace('_', ' ')}`);
      }
    });

    if (isComplete) {
      toast({
        title: "🎉 Excellent Setup!",
        description: "All doors are secured with devices!",
        variant: "default"
      });
    } else {
      toast({
        title: "Setup Incomplete",
        description: `Missing: ${missingDevices.slice(0, 3).join(', ')}${missingDevices.length > 3 ? '...' : ''}`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-2">
      <div className="max-w-none mx-auto">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-white mb-2">
            Security System Placement Game
          </h1>
          <p className="text-slate-300 text-lg">
            {currentMission 
              ? `Mission: ${currentMission.title}` 
              : "Drag and drop security devices onto windows and doors to secure the building"
            }
          </p>
          <p className="text-slate-400 text-sm mt-1">
            Building: {buildingConfig.name} | {buildingConfig.windows.length} Windows, {buildingConfig.doors.length} Doors
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Main Game Area - Much Larger */}
          <div className="xl:col-span-9">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-1 border border-white/10 overflow-auto">
              <BuildingMap 
                config={buildingConfig}
                placedDevices={placedDevices}
                showDropZones={showDropZones}
                draggedDevice={draggedDevice}
                onDrop={handleDrop}
                onRemoveDevice={handleRemoveDevice}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-3 space-y-4">
            {/* Mission System */}
            <MissionSystem
              currentMission={currentMission}
              onMissionSelect={handleMissionSelect}
              placedDevices={placedDevices}
              deviceInventory={deviceInventory}
              onMissionComplete={handleMissionComplete}
            />
            
            {/* Device Inventory */}
            <DeviceInventory
              devices={SECURITY_DEVICES}
              inventory={deviceInventory}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
            
            {/* Validation Button */}
            {!currentMission && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <button
                  onClick={checkValidation}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Validate Setup
                </button>
                
                <button
                  onClick={() => setBuildingConfig(generateRandomBuilding())}
                  className="w-full mt-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🎲 Generate New Building
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;