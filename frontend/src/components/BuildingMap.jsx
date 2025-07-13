import React from 'react';
import DropZone from './DropZone';

const BuildingMap = ({ 
  config, 
  placedDevices, 
  showDropZones, 
  draggedDevice, 
  onDrop, 
  onRemoveDevice 
}) => {
  const { width, height, windows, doors } = config;

  return (
    <div className="relative bg-slate-100 rounded-xl overflow-hidden shadow-2xl">
      <svg width={width} height={height} className="block">
        {/* Building outline */}
        <rect
          x="50"
          y="50"
          width={width - 100}
          height={height - 100}
          fill="#E2E8F0"
          stroke="#475569"
          strokeWidth="3"
          rx="8"
        />

        {/* Internal walls */}
        {/* Horizontal wall */}
        <line
          x1="50"
          y1="200"
          x2={width - 50}
          y2="200"
          stroke="#64748B"
          strokeWidth="2"
        />
        
        {/* Vertical walls */}
        <line
          x1="200"
          y1="50"
          x2="200"
          y2="200"
          stroke="#64748B"
          strokeWidth="2"
        />
        <line
          x1="600"
          y1="50"
          x2="600"
          y2="200"
          stroke="#64748B"
          strokeWidth="2"
        />

        {/* Room labels */}
        <text x="125" y="135" className="fill-slate-600 text-sm font-semibold">Office 1</text>
        <text x="400" y="135" className="fill-slate-600 text-sm font-semibold">Conference Room</text>
        <text x="675" y="135" className="fill-slate-600 text-sm font-semibold">Office 2</text>
        <text x="400" y="400" className="fill-slate-600 text-sm font-semibold">Main Hall</text>

        {/* Windows */}
        {windows.map((window) => (
          <rect
            key={window.id}
            x={window.x}
            y={window.y}
            width={window.width}
            height={window.height}
            fill="#3B82F6"
            stroke="#1E40AF"
            strokeWidth="2"
            rx="2"
          />
        ))}

        {/* Doors */}
        {doors.map((door) => (
          <rect
            key={door.id}
            x={door.x}
            y={door.y}
            width={door.width}
            height={door.height}
            fill="#8B5CF6"
            stroke="#6D28D9"
            strokeWidth="2"
            rx="4"
          />
        ))}
      </svg>

      {/* Drop zones overlay */}
      {[...windows, ...doors].map((location) => (
        <DropZone
          key={location.id}
          location={location}
          placedDevices={placedDevices[location.id] || []}
          showDropZone={showDropZones}
          draggedDevice={draggedDevice}
          onDrop={onDrop}
          onRemoveDevice={onRemoveDevice}
        />
      ))}

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-slate-700">Windows</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-slate-700">Doors</span>
        </div>
      </div>
    </div>
  );
};

export default BuildingMap;