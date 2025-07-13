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
        absolute border-2 rounded transition-all duration-300
        ${showDropZone && isValidDrop 
          ? 'border-green-400 bg-green-200/50 shadow-lg shadow-green-400/50' 
          : showDropZone && draggedDevice
          ? 'border-red-400 bg-red-200/30'
          : 'border-transparent'
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
            text-xs font-bold px-2 py-1 rounded
            ${isValidDrop 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
            }
          `}>
            {isValidDrop ? '✓' : '✗'}
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
              className="cursor-pointer hover:scale-110 transition-transform duration-200 bg-white/90 rounded-full p-1 shadow-md border-2"
              style={{ borderColor: device.color }}
              title={`${device.name} (Click to remove)`}
            >
              <span className="text-sm">{device.icon}</span>
            </div>
          ))}
        </div>
      )}

      {/* Location label on hover */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {location.id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      </div>
    </div>
  );
};

export default DropZone;