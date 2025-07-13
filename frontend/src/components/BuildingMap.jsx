import React, { useEffect, useRef } from 'react';
import DropZone from './DropZone';

const BuildingMap = ({ 
  config, 
  placedDevices, 
  showDropZones, 
  draggedDevice, 
  onDrop, 
  onRemoveDevice 
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { width, height, windows, doors } = config;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = width;
    canvas.height = height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Background with gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f1f5f9');
    gradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Building outline
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 6;
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(50, 50, width - 100, height - 100);
    ctx.strokeRect(50, 50, width - 100, height - 100);
    
    // Internal walls creating rooms
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 4;
    
    // Horizontal walls
    ctx.beginPath();
    ctx.moveTo(50, 400);
    ctx.lineTo(370, 400);
    ctx.moveTo(420, 400);
    ctx.lineTo(1180, 400);
    ctx.moveTo(1230, 400);
    ctx.lineTo(width - 50, 400);
    
    ctx.moveTo(50, 600);
    ctx.lineTo(width - 50, 600);
    
    // Vertical walls
    ctx.moveTo(400, 50);
    ctx.lineTo(400, 400);
    ctx.moveTo(1200, 50);
    ctx.lineTo(1200, 400);
    ctx.moveTo(800, 250);
    ctx.lineTo(800, 400);
    
    ctx.stroke();
    
    // Bottom wall with main entrance opening
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    ctx.lineTo(740, height - 50);
    ctx.moveTo(880, height - 50);
    ctx.lineTo(width - 50, height - 50);
    ctx.stroke();
    
    // Room labels
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    
    ctx.fillText('Executive Office', 225, 250);
    ctx.fillText('Reception', 600, 180);
    ctx.fillText('Lobby', 1000, 180);
    ctx.fillText('Server Room', 1350, 250);
    ctx.fillText('Conference Room', 600, 500);
    ctx.fillText('Meeting Room', 1000, 500);
    ctx.fillText('Main Hall', 800, 800);
    
    // Windows
    windows.forEach((window) => {
      ctx.fillStyle = '#3b82f6';
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 4;
      ctx.fillRect(window.x, window.y, window.width, window.height);
      ctx.strokeRect(window.x, window.y, window.width, window.height);
      
      // Window labels
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px Arial';
      const labelX = window.x + window.width / 2;
      const labelY = window.y + window.height / 2 + 6;
      ctx.fillText(window.id.replace('_', ' ').toUpperCase(), labelX, labelY);
    });
    
    // Doors
    doors.forEach((door) => {
      ctx.fillStyle = '#8b5cf6';
      ctx.strokeStyle = '#6d28d9';
      ctx.lineWidth = 4;
      ctx.fillRect(door.x, door.y, door.width, door.height);
      ctx.strokeRect(door.x, door.y, door.width, door.height);
      
      // Door labels
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px Arial';
      const labelX = door.x + door.width / 2;
      const labelY = door.y + door.height / 2 + 6;
      ctx.fillText('DOOR', labelX, labelY);
    });
    
    // Door name labels
    ctx.fillStyle = '#6d28d9';
    ctx.font = 'bold 18px Arial';
    ctx.fillText('Main Entrance', 810, height - 20);
    
    // Add other door labels with proper positioning
    ctx.save();
    ctx.translate(350, 460);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Executive', 0, 0);
    ctx.restore();
    
    ctx.save();
    ctx.translate(770, 360);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Conference', 0, 0);
    ctx.restore();
    
    ctx.save();
    ctx.translate(1160, 460);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Server Room', 0, 0);
    ctx.restore();
    
    ctx.save();
    ctx.translate(30, 850);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Emergency', 0, 0);
    ctx.restore();
    
    ctx.save();
    ctx.translate(1570, 490);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Side Exit', 0, 0);
    ctx.restore();
    
  }, [config, width, height, windows, doors]);

  return (
    <div ref={containerRef} className="relative bg-slate-100 rounded-xl overflow-auto shadow-2xl">
      <canvas
        ref={canvasRef}
        className="block"
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          maxWidth: 'none'
        }}
      />

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
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 text-sm space-y-2 z-10">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-blue-500 rounded"></div>
          <span className="text-slate-700">Windows ({windows.length})</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-purple-500 rounded"></div>
          <span className="text-slate-700">Doors ({doors.length})</span>
        </div>
        <div className="text-xs text-slate-600">
          Building: {width} x {height}px
        </div>
      </div>
    </div>
  );
};

export default BuildingMap;