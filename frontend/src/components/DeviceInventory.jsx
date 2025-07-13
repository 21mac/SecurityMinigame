import React from 'react';

const DeviceInventory = ({ devices, inventory, onDragStart, onDragEnd }) => {
  const handleDragStart = (e, device) => {
    e.dataTransfer.setData('text/plain', '');
    onDragStart(device);
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-4">Device Inventory</h2>
      <div className="space-y-3">
        {devices.map((device) => (
          <div
            key={device.id}
            draggable={inventory[device.id] > 0}
            onDragStart={(e) => handleDragStart(e, device)}
            onDragEnd={onDragEnd}
            className={`
              p-4 rounded-xl border-2 transition-all duration-300 cursor-grab active:cursor-grabbing
              ${inventory[device.id] > 0 
                ? 'bg-white/20 border-white/30 hover:bg-white/30 hover:border-white/50 hover:scale-105 shadow-lg hover:shadow-xl' 
                : 'bg-gray-600/20 border-gray-500/30 cursor-not-allowed opacity-50'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="text-3xl p-2 rounded-lg"
                  style={{ backgroundColor: `${device.color}20`, border: `2px solid ${device.color}` }}
                >
                  {device.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{device.name}</h3>
                  <p className="text-xs text-slate-300">{device.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div 
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                  style={{ 
                    backgroundColor: inventory[device.id] > 0 ? device.color : '#6B7280',
                    color: 'white'
                  }}
                >
                  {inventory[device.id]}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
        <p className="text-xs text-blue-200">
          💡 Tip: Drag devices to compatible windows and doors. Each location has device restrictions.
        </p>
      </div>
    </div>
  );
};

export default DeviceInventory;