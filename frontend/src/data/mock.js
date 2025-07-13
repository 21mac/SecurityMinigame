// Mock data for the security placement game

// Function to generate random building layouts
export const generateRandomBuilding = () => {
  const layouts = [
    // Layout 1: Standard Office
    {
      id: "office_layout_1",
      name: "Corporate Office Building - Floor 1",
      dimensions: { width: 1600, height: 1000 },
      windows: [
        { id: "window_1", x: 50, y: 200, width: 150, height: 30, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_2", x: 1400, y: 200, width: 150, height: 30, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_3", x: 600, y: 50, width: 30, height: 150, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_4", x: 1000, y: 50, width: 30, height: 150, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_5", x: 50, y: 700, width: 150, height: 30, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_6", x: 1400, y: 700, width: 150, height: 30, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_7", x: 300, y: 50, width: 30, height: 150, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_8", x: 1270, y: 50, width: 30, height: 150, allowedDevices: ["security_camera", "motion_sensor"] }
      ],
      doors: [
        { id: "main_entrance", x: 750, y: 950, width: 120, height: 30, allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition", "security_camera"] },
        { id: "executive_door", x: 380, y: 420, width: 30, height: 80, allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition"] },
        { id: "conference_door", x: 790, y: 320, width: 30, height: 80, allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition"] },
        { id: "server_room_door", x: 1190, y: 420, width: 30, height: 80, allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition", "security_camera"] },
        { id: "emergency_exit", x: 50, y: 800, width: 30, height: 100, allowedDevices: ["door_lock", "motion_sensor", "security_camera"] },
        { id: "side_entrance", x: 1520, y: 450, width: 30, height: 80, allowedDevices: ["door_lock", "security_camera"] }
      ]
    },
    
    // Layout 2: Warehouse Style
    {
      id: "warehouse_layout_1",
      name: "Industrial Warehouse - Main Floor",
      dimensions: { width: 1600, height: 1000 },
      windows: [
        { id: "window_1", x: 100, y: 100, width: 120, height: 25, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_2", x: 1380, y: 100, width: 120, height: 25, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_3", x: 100, y: 300, width: 120, height: 25, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_4", x: 1380, y: 300, width: 120, height: 25, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_5", x: 100, y: 600, width: 120, height: 25, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_6", x: 1380, y: 600, width: 120, height: 25, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_7", x: 500, y: 50, width: 25, height: 100, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_8", x: 1100, y: 50, width: 25, height: 100, allowedDevices: ["security_camera", "motion_sensor"] }
      ],
      doors: [
        { id: "main_entrance", x: 700, y: 950, width: 200, height: 30, allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition", "security_camera"] },
        { id: "loading_dock_1", x: 200, y: 950, width: 150, height: 30, allowedDevices: ["door_lock", "motion_sensor", "security_camera"] },
        { id: "loading_dock_2", x: 1250, y: 950, width: 150, height: 30, allowedDevices: ["door_lock", "motion_sensor", "security_camera"] },
        { id: "office_entrance", x: 800, y: 200, width: 25, height: 60, allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition"] },
        { id: "storage_room", x: 400, y: 400, width: 25, height: 60, allowedDevices: ["door_lock", "security_camera"] },
        { id: "emergency_exit", x: 1570, y: 500, width: 30, height: 80, allowedDevices: ["door_lock", "motion_sensor"] }
      ]
    },

    // Layout 3: Mall/Retail
    {
      id: "retail_layout_1", 
      name: "Shopping Mall - Ground Floor",
      dimensions: { width: 1600, height: 1000 },
      windows: [
        { id: "window_1", x: 200, y: 50, width: 200, height: 25, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_2", x: 1200, y: 50, width: 200, height: 25, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_3", x: 50, y: 250, width: 25, height: 150, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_4", x: 1525, y: 250, width: 25, height: 150, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_5", x: 50, y: 600, width: 25, height: 150, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_6", x: 1525, y: 600, width: 25, height: 150, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_7", x: 600, y: 50, width: 25, height: 100, allowedDevices: ["security_camera", "motion_sensor"] },
        { id: "window_8", x: 1000, y: 50, width: 25, height: 100, allowedDevices: ["security_camera", "motion_sensor"] }
      ],
      doors: [
        { id: "main_entrance", x: 740, y: 950, width: 120, height: 30, allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition", "security_camera"] },
        { id: "north_entrance", x: 740, y: 50, width: 120, height: 30, allowedDevices: ["door_lock", "security_camera"] },
        { id: "store_1", x: 300, y: 300, width: 25, height: 60, allowedDevices: ["door_lock", "security_camera"] },
        { id: "store_2", x: 600, y: 300, width: 25, height: 60, allowedDevices: ["door_lock", "security_camera"] },
        { id: "store_3", x: 1000, y: 300, width: 25, height: 60, allowedDevices: ["door_lock", "security_camera"] },
        { id: "store_4", x: 1300, y: 300, width: 25, height: 60, allowedDevices: ["door_lock", "security_camera"] },
        { id: "security_office", x: 800, y: 700, width: 25, height: 60, allowedDevices: ["door_lock", "fingerprint_sensor", "facial_recognition"] }
      ]
    }
  ];

  return layouts[Math.floor(Math.random() * layouts.length)];
};

export const BUILDING_CONFIG = generateRandomBuilding();

export const SECURITY_DEVICES = [
  {
    id: "door_lock",
    name: "Smart Door Lock",
    icon: "🔐",
    color: "#4F46E5",
    description: "Electronic door lock with remote control",
    count: 5
  },
  {
    id: "fingerprint_sensor",
    name: "Fingerprint Scanner",
    icon: "👆",
    color: "#059669",
    description: "Biometric fingerprint access control",
    count: 3
  },
  {
    id: "facial_recognition",
    name: "Facial Recognition",
    icon: "👤",
    color: "#DC2626",
    description: "AI-powered facial recognition system",
    count: 2
  },
  {
    id: "security_camera",
    name: "Security Camera",
    icon: "📹",
    color: "#7C2D12",
    description: "HD security camera with night vision",
    count: 6
  },
  {
    id: "motion_sensor",
    name: "Motion Sensor",
    icon: "📡",
    color: "#B45309",
    description: "PIR motion detection sensor",
    count: 4
  }
];

export const MISSIONS = [
  {
    id: "vip_visit",
    title: "🎩 VIP Executive Visit",
    description: "A high-profile executive is visiting. Secure their route from Main Entrance → Conference Room → Executive Office.",
    difficulty: "Medium",
    timeLimit: null,
    requirements: {
      mandatory: {
        main_entrance: ["facial_recognition", "security_camera"],
        conference_door: ["fingerprint_sensor"],
        executive_door: ["door_lock", "facial_recognition"]
      },
      optional: {
        window_3: ["security_camera"],
        window_4: ["security_camera"]
      }
    },
    story: "CEO of MegaCorp is coming for a confidential merger discussion. Security clearance is essential.",
    reward: "🏆 VIP Security Specialist Badge"
  },
  {
    id: "break_in_threat",
    title: "🥷 Multi-Point Break-in Alert",
    description: "Intelligence reports 3 thieves planning to break in through windows and emergency exits. Secure all entry points!",
    difficulty: "Hard",
    timeLimit: 300,
    requirements: {
      mandatory: {
        window_1: ["motion_sensor"],
        window_2: ["motion_sensor"],
        window_5: ["security_camera"],
        window_6: ["security_camera"],
        emergency_exit: ["door_lock", "motion_sensor"]
      },
      optional: {
        main_entrance: ["security_camera"]
      }
    },
    story: "The 'Shadow Trio' has been spotted in the area. They specialize in simultaneous break-ins.",
    reward: "🛡️ Threat Prevention Expert"
  },
  {
    id: "server_protection",
    title: "🖥️ Critical Server Room Security",
    description: "Our servers contain sensitive data. Implement maximum security around the server room.",
    difficulty: "Easy",
    timeLimit: null,
    requirements: {
      mandatory: {
        server_room_door: ["door_lock", "fingerprint_sensor", "security_camera"]
      },
      optional: {
        window_6: ["motion_sensor"],
        conference_door: ["door_lock"]
      }
    },
    story: "The server room contains classified government contracts. A security audit is due tomorrow.",
    reward: "💾 Data Guardian Certificate"
  },
  {
    id: "budget_crisis",
    title: "💰 Budget Constraints Challenge",
    description: "Security budget has been cut! Use only 3 devices total to secure the most critical areas.",
    difficulty: "Hard",
    timeLimit: null,
    deviceLimits: {
      total: 3
    },
    requirements: {
      mandatory: {
        main_entrance: ["door_lock"],
        server_room_door: ["fingerprint_sensor"]
      },
      optional: {
        executive_door: ["security_camera"]
      }
    },
    story: "Company is in financial trouble. Make every device count!",
    reward: "🎯 Efficiency Expert"
  },
  {
    id: "conference_event",
    title: "🤝 International Conference Security",
    description: "50 international delegates attending conference. Secure conference room and main routes.",
    difficulty: "Medium",
    timeLimit: 240,
    requirements: {
      mandatory: {
        main_entrance: ["facial_recognition"],
        conference_door: ["fingerprint_sensor", "security_camera"]
      },
      optional: {
        window_3: ["motion_sensor"],
        window_4: ["motion_sensor"],
        executive_door: ["door_lock"]
      }
    },
    story: "Representatives from 12 countries are attending. Diplomatic security protocols required.",
    reward: "🌍 International Security Coordinator"
  },
  {
    id: "night_shift",
    title: "🌙 After-Hours Security Setup",
    description: "Setup overnight security. Focus on motion detection and automated access control.",
    difficulty: "Easy",
    timeLimit: null,
    requirements: {
      mandatory: {
        main_entrance: ["door_lock"],
        emergency_exit: ["motion_sensor"]
      },
      optional: {
        window_1: ["motion_sensor"],
        window_2: ["motion_sensor"],
        window_5: ["motion_sensor"],
        window_6: ["motion_sensor"]
      }
    },
    story: "The building will be empty from 8 PM to 6 AM. Automated systems are essential.",
    reward: "🦉 Night Security Specialist"
  }
];

export const OPTIMAL_PLACEMENT = {
  main_entrance: ["door_lock", "facial_recognition"],
  executive_door: ["fingerprint_sensor"],
  conference_door: ["door_lock"],
  server_room_door: ["door_lock", "fingerprint_sensor", "security_camera"],
  emergency_exit: ["door_lock"],
  window_1: ["security_camera"],
  window_2: ["motion_sensor"],
  window_3: ["security_camera"],
  window_4: ["motion_sensor"],
  window_5: ["motion_sensor"],
  window_6: ["security_camera"]
};