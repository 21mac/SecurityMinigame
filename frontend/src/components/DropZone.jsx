import React from 'react';

const DropZone = ({ 
  location, 
  placedDevices, 
  showDropZone, 
  draggedDevice, 
  onDrop, 
  onRemoveDevice 
}) => {
  const isValidDrop = draggedDevice && location.allowedDevices.includes(draggedDevice.id);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (isValidDrop) {
      onDrop(location.id);
    }
  };

  const handleDeviceClick = (deviceIndex) => {
    onRemoveDevice(location.id, deviceIndex);
  };

  return (
    <div
      className={`
        absolute border-4 rounded-lg transition-all duration-300 z-10
        ${showDropZone && isValidDrop 
          ? 'border-green-400 bg-green-200/70 shadow-lg shadow-green-400/50 animate-pulse' 
          : showDropZone && draggedDevice
          ? 'border-red-400 bg-red-200/50 shadow-lg shadow-red-400/50'
          : placedDevices.length > 0
          ? 'border-blue-400/50 bg-blue-100/30'
          : 'border-transparent hover:border-gray-400/30'
        }
      `}
      style={{
        left: location.x,
        top: location.y,
        width: location.width,
        height: location.height,
      }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Show drop zone indicator */}
      {showDropZone && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            text-lg font-bold px-3 py-1 rounded-full shadow-lg
            ${isValidDrop 
              ? 'bg-green-500 text-white animate-bounce' 
              : 'bg-red-500 text-white'
            }
          `}>
            {isValidDrop ? '✓ DROP HERE' : '✗ INVALID'}
          </div>
        </div>
      )}

      {/* Placed devices */}
      {placedDevices.length > 0 && !showDropZone && (
        <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-1 p-1">
          {placedDevices.map((device, index) => (
            <div
              key={index}
              onClick={() => handleDeviceClick(index)}
              className="cursor-pointer hover:scale-125 transition-all duration-200 bg-white/95 rounded-full p-2 shadow-lg border-3 hover:shadow-xl"
              style={{ borderColor: device.color }}
              title={`${device.name} (Click to remove)`}
            >
              <span className="text-lg">{device.icon}</span>
            </div>
          ))}
        </div>
      )}

      {/* Location label - always visible when empty */}
      {placedDevices.length === 0 && !showDropZone && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-slate-700/80 text-white text-xs px-2 py-1 rounded-md font-medium">
            {location.id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;