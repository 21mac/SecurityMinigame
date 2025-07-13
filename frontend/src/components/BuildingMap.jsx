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
    <div className="relative bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl overflow-auto shadow-2xl border-4 border-slate-400">
      <div 
        className="relative bg-slate-50"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          minWidth: `${width}px`,
          minHeight: `${height}px`
        }}
      >
        {/* Building outline */}
        <div 
          className="absolute bg-slate-100 border-4 border-slate-600 rounded-lg"
          style={{
            left: '50px',
            top: '50px',
            width: `${width - 100}px`,
            height: `${height - 100}px`
          }}
        >
          {/* Room dividers */}
          {/* Horizontal walls */}
          <div className="absolute bg-slate-600 h-1" style={{ left: '0px', top: '350px', width: '320px' }}></div>
          <div className="absolute bg-slate-600 h-1" style={{ left: '370px', top: '350px', width: '760px' }}></div>
          <div className="absolute bg-slate-600 h-1" style={{ left: '1180px', top: '350px', width: '370px' }}></div>
          
          <div className="absolute bg-slate-600 h-1" style={{ left: '0px', top: '550px', width: `${width - 100}px` }}></div>
          
          {/* Vertical walls */}
          <div className="absolute bg-slate-600 w-1" style={{ left: '350px', top: '0px', height: '350px' }}></div>
          <div className="absolute bg-slate-600 w-1" style={{ left: '1150px', top: '0px', height: '350px' }}></div>
          <div className="absolute bg-slate-600 w-1" style={{ left: '750px', top: '200px', height: '150px' }}></div>

          {/* Room labels */}
          <div className="absolute text-slate-700 font-bold text-2xl" style={{ left: '125px', top: '200px' }}>
            Executive Office
          </div>
          <div className="absolute text-slate-700 font-bold text-2xl" style={{ left: '500px', top: '130px' }}>
            Reception
          </div>
          <div className="absolute text-slate-700 font-bold text-2xl" style={{ left: '900px', top: '130px' }}>
            Lobby
          </div>
          <div className="absolute text-slate-700 font-bold text-2xl" style={{ left: '1200px', top: '200px' }}>
            Server Room
          </div>
          <div className="absolute text-slate-700 font-bold text-2xl" style={{ left: '450px', top: '450px' }}>
            Conference Room
          </div>
          <div className="absolute text-slate-700 font-bold text-2xl" style={{ left: '850px', top: '450px' }}>
            Meeting Room
          </div>
          <div className="absolute text-slate-700 font-bold text-3xl" style={{ left: '650px', top: '750px' }}>
            Main Hall
          </div>
        </div>

        {/* Windows */}
        {windows.map((window) => (
          <div
            key={window.id}
            className="absolute bg-blue-500 border-2 border-blue-700 rounded flex items-center justify-center"
            style={{
              left: `${window.x}px`,
              top: `${window.y}px`,
              width: `${window.width}px`,
              height: `${window.height}px`
            }}
          >
            <span className="text-white font-bold text-sm">
              {window.id.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        ))}

        {/* Doors */}
        {doors.map((door) => (
          <div
            key={door.id}
            className="absolute bg-purple-500 border-2 border-purple-700 rounded flex items-center justify-center"
            style={{
              left: `${door.x}px`,
              top: `${door.y}px`,
              width: `${door.width}px`,
              height: `${door.height}px`
            }}
          >
            <span className="text-white font-bold text-sm">DOOR</span>
          </div>
        ))}

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
      </div>

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 text-sm space-y-2 z-20 shadow-lg">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-blue-500 rounded"></div>
          <span className="text-slate-700">Windows ({windows.length})</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-purple-500 rounded"></div>
          <span className="text-slate-700">Doors ({doors.length})</span>
        </div>
        <div className="text-xs text-slate-600 border-t pt-2">
          Building: {width} x {height}px
        </div>
      </div>
    </div>
  );
};

export default BuildingMap;