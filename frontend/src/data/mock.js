// Mock data for the security placement game

export const BUILDING_CONFIG = {
  id: "sample_building_1",
  name: "Office Building - Floor 1",
  dimensions: {
    width: 800,
    height: 600
  },
  windows: [
    {
      id: "window_1",
      x: 50,
      y: 100,
      width: 80,
      height: 15,
      allowedDevices: ["security_camera", "motion_sensor"]
    },
    {
      id: "window_2", 
      x: 650,
      y: 100,
      width: 80,
      height: 15,
      allowedDevices: ["security_camera", "motion_sensor"]
    },
    {
      id: "window_3",
      x: 300,
      y: 50,
      width: 15,
      height: 80,
      allowedDevices: ["security_camera", "motion_sensor"]
    },
    {
      id: "window_4",
      x: 500,
      y: 50,
      width: 15,
      height: 80,
      allowedDevices: ["security_camera", "motion_sensor"]
    }
  ],
  doors: [
    {
      id: "main_door",
      x: 350,
      y: 580,
      width: 100,
      height: 20,
      allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition", "security_camera"]
    },
    {
      id: "office_door_1",
      x: 200,
      y: 250,
      width: 15,
      height: 60,
      allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition"]
    },
    {
      id: "office_door_2",
      x: 585,
      y: 250,
      width: 15,
      height: 60,
      allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition"]
    }
  ]
};

export const SECURITY_DEVICES = [
  {
    id: "door_lock",
    name: "Smart Door Lock",
    icon: "🔐",
    color: "#4F46E5",
    description: "Electronic door lock with remote control",
    count: 3
  },
  {
    id: "fingerprint_sensor",
    name: "Fingerprint Scanner",
    icon: "👆",
    color: "#059669",
    description: "Biometric fingerprint access control",
    count: 2
  },
  {
    id: "facial_recognition",
    name: "Facial Recognition",
    icon: "👤",
    color: "#DC2626",
    description: "AI-powered facial recognition system",
    count: 1
  },
  {
    id: "security_camera",
    name: "Security Camera",
    icon: "📹",
    color: "#7C2D12",
    description: "HD security camera with night vision",
    count: 4
  },
  {
    id: "motion_sensor",
    name: "Motion Sensor",
    icon: "📡",
    color: "#B45309",
    description: "PIR motion detection sensor",
    count: 3
  }
];

export const OPTIMAL_PLACEMENT = {
  main_door: ["door_lock", "facial_recognition"],
  office_door_1: ["door_lock"],
  office_door_2: ["fingerprint_sensor"],
  window_1: ["security_camera"],
  window_2: ["motion_sensor"],
  window_3: ["security_camera"],
  window_4: ["motion_sensor"]
};