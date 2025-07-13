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
        {/* Building outline - but with gaps for doors */}
        <rect
          x="50"
          y="50"
          width={width - 100}
          height={height - 100}
          fill="#E2E8F0"
          stroke="#475569"
          strokeWidth="3"
          rx="8"
          fillOpacity="0.7"
        />

        {/* Internal walls with door openings */}
        {/* Horizontal wall with door openings */}
        <line x1="50" y1="200" x2="190" y2="200" stroke="#64748B" strokeWidth="3"/>
        <line x1="220" y1="200" x2="575" y2="200" stroke="#64748B" strokeWidth="3"/>
        <line x1="605" y1="200" x2={width - 50} y2="200" stroke="#64748B" strokeWidth="3"/>
        
        {/* Vertical walls */}
        <line x1="200" y1="50" x2="200" y2="200" stroke="#64748B" strokeWidth="3"/>
        <line x1="600" y1="50" x2="600" y2="200" stroke="#64748B" strokeWidth="3"/>

        {/* Bottom wall with main door opening */}
        <line x1="50" y1={height - 50} x2="340" y2={height - 50} stroke="#475569" strokeWidth="3"/>
        <line x1="460" y1={height - 50} x2={width - 50} y2={height - 50} stroke="#475569" strokeWidth="3"/>

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
            strokeWidth="3"
            rx="2"
          />
        ))}

        {/* Doors - make them more prominent */}
        {doors.map((door) => (
          <g key={door.id}>
            <rect
              x={door.x}
              y={door.y}
              width={door.width}
              height={door.height}
              fill="#8B5CF6"
              stroke="#6D28D9"
              strokeWidth="3"
              rx="4"
            />
            <text
              x={door.x + door.width/2}
              y={door.y + door.height/2 + 4}
              className="fill-white text-xs font-bold"
              textAnchor="middle"
            >
              DOOR
            </text>
          </g>
        ))}

        {/* Add door labels */}
        <text x="400" y={height - 25} className="fill-purple-700 text-xs font-bold" textAnchor="middle">Main Entrance</text>
        <text x="180" y="280" className="fill-purple-700 text-xs font-bold" textAnchor="middle" transform="rotate(-90 180 280)">Office 1</text>
        <text x="620" y="280" className="fill-purple-700 text-xs font-bold" textAnchor="middle" transform="rotate(-90 620 280)">Office 2</text>
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