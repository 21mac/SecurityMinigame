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
          strokeWidth="4"
          rx="12"
          fillOpacity="0.8"
        />

        {/* Internal walls creating rooms */}
        {/* Horizontal dividing walls */}
        <line x1="50" y1="300" x2="280" y2="300" stroke="#64748B" strokeWidth="4"/>
        <line x1="320" y1="300" x2="880" y2="300" stroke="#64748B" strokeWidth="4"/>
        <line x1="920" y1="300" x2={width - 50} y2="300" stroke="#64748B" strokeWidth="4"/>
        
        <line x1="50" y1="450" x2={width - 50} y2="450" stroke="#64748B" strokeWidth="4"/>
        
        {/* Vertical dividing walls */}
        <line x1="300" y1="50" x2="300" y2="300" stroke="#64748B" strokeWidth="4"/>
        <line x1="900" y1="50" x2="900" y2="300" stroke="#64748B" strokeWidth="4"/>
        <line x1="600" y1="200" x2="600" y2="300" stroke="#64748B" strokeWidth="4"/>

        {/* Bottom wall with main entrance opening */}
        <line x1="50" y1={height - 50} x2="540" y2={height - 50} stroke="#475569" strokeWidth="4"/>
        <line x1="670" y1={height - 50} x2={width - 50} y2={height - 50} stroke="#475569" strokeWidth="4"/>

        {/* Room labels */}
        <text x="175" y="180" className="fill-slate-600 text-lg font-bold" textAnchor="middle">Executive Office</text>
        <text x="450" y="130" className="fill-slate-600 text-lg font-bold" textAnchor="middle">Reception</text>
        <text x="750" y="130" className="fill-slate-600 text-lg font-bold" textAnchor="middle">Lobby</text>
        <text x="1000" y="180" className="fill-slate-600 text-lg font-bold" textAnchor="middle">Server Room</text>
        <text x="450" y="380" className="fill-slate-600 text-lg font-bold" textAnchor="middle">Conference Room</text>
        <text x="750" y="380" className="fill-slate-600 text-lg font-bold" textAnchor="middle">Meeting Room</text>
        <text x="600" y="600" className="fill-slate-600 text-xl font-bold" textAnchor="middle">Main Hall</text>

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
            rx="4"
          />
        ))}

        {/* Doors */}
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
              rx="6"
            />
            <text
              x={door.x + door.width/2}
              y={door.y + door.height/2 + 6}
              className="fill-white text-sm font-bold"
              textAnchor="middle"
            >
              DOOR
            </text>
          </g>
        ))}

        {/* Door labels */}
        <text x="600" y={height - 15} className="fill-purple-700 text-sm font-bold" textAnchor="middle">Main Entrance</text>
        <text x="260" y="340" className="fill-purple-700 text-sm font-bold" textAnchor="middle" transform="rotate(-90 260 340)">Executive</text>
        <text x="570" y="240" className="fill-purple-700 text-sm font-bold" textAnchor="middle" transform="rotate(-90 570 240)">Conference</text>
        <text x="870" y="340" className="fill-purple-700 text-sm font-bold" textAnchor="middle" transform="rotate(-90 870 340)">Server Room</text>
        <text x="30" y="640" className="fill-purple-700 text-sm font-bold" textAnchor="middle" transform="rotate(-90 30 640)">Emergency</text>

        {/* Window labels */}
        <text x="110" y="140" className="fill-blue-700 text-xs font-semibold" textAnchor="middle">Window 1</text>
        <text x="1090" y="140" className="fill-blue-700 text-xs font-semibold" textAnchor="middle">Window 2</text>
        <text x="440" y="40" className="fill-blue-700 text-xs font-semibold" textAnchor="middle">Window 3</text>
        <text x="740" y="40" className="fill-blue-700 text-xs font-semibold" textAnchor="middle">Window 4</text>
        <text x="110" y="490" className="fill-blue-700 text-xs font-semibold" textAnchor="middle">Window 5</text>
        <text x="1090" y="490" className="fill-blue-700 text-xs font-semibold" textAnchor="middle">Window 6</text>
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
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 text-sm space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-blue-500 rounded"></div>
          <span className="text-slate-700">Windows</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-purple-500 rounded"></div>
          <span className="text-slate-700">Doors</span>
        </div>
      </div>
    </div>
  );
};

export default BuildingMap;

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