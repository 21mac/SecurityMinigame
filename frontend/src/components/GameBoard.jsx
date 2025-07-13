import React, { useState } from 'react';
import { BUILDING_CONFIG, SECURITY_DEVICES, OPTIMAL_PLACEMENT } from '../data/mock';
import DeviceInventory from './DeviceInventory';
import DropZone from './DropZone';
import BuildingMap from './BuildingMap';
import { useToast } from '../hooks/use-toast';

const GameBoard = () => {
  const [draggedDevice, setDraggedDevice] = useState(null);
  const [placedDevices, setPlacedDevices] = useState({});
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

    const location = [...BUILDING_CONFIG.windows, ...BUILDING_CONFIG.doors]
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

  const checkValidation = () => {
    let isComplete = true;
    let missingDevices = [];

    Object.entries(OPTIMAL_PLACEMENT).forEach(([locationId, requiredDevices]) => {
      const placedAtLocation = placedDevices[locationId] || [];
      const placedDeviceIds = placedAtLocation.map(device => device.id);
      
      requiredDevices.forEach(requiredDeviceId => {
        if (!placedDeviceIds.includes(requiredDeviceId)) {
          isComplete = false;
          const deviceName = SECURITY_DEVICES.find(d => d.id === requiredDeviceId)?.name;
          missingDevices.push(`${deviceName} at ${locationId.replace('_', ' ')}`);
        }
      });
    });

    if (isComplete) {
      toast({
        title: "🎉 Congratulations!",
        description: "All security devices have been placed correctly!",
        variant: "default"
      });
    } else {
      toast({
        title: "Incomplete Setup",
        description: `Missing: ${missingDevices.slice(0, 3).join(', ')}${missingDevices.length > 3 ? '...' : ''}`,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Security System Placement Game
          </h1>
          <p className="text-slate-300 text-lg">
            Drag and drop security devices onto windows and doors to secure the building
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="relative">
                <BuildingMap 
                  config={BUILDING_CONFIG}
                  placedDevices={placedDevices}
                  showDropZones={showDropZones}
                  draggedDevice={draggedDevice}
                  onDrop={handleDrop}
                  onRemoveDevice={handleRemoveDevice}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <DeviceInventory
              devices={SECURITY_DEVICES}
              inventory={deviceInventory}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <button
                onClick={checkValidation}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Validate Setup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;