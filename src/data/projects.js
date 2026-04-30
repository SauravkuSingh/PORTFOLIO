export const PROJECTS = [
  {
    slug: "shopsphere",
    title: "ShopSphere",
    tagline: "Modern E-commerce Platform",
    category: "Full Stack",
    shortDescription:
      "A full stack e-commerce platform with modern UI and secure payments.",
    description:
      "A full-featured e-commerce platform with user authentication, product management, orders, checkout and payment integration.",
    stack: ["Next.js", "Stripe", "MongoDB"],
    fullStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Stripe",
    ],
    url: "shopsphere.dev",
    liveUrl: "#",
    codeUrl: "#",
    accent: "from-blue-500/40 via-indigo-500/30 to-purple-600/40",
    mockup: "shop",
    overview:
      "ShopSphere is a modern e-commerce platform built with Next.js and Tailwind CSS. It provides a seamless shopping experience with features like user authentication, product browsing, cart management and secure payments.",
    features: [
      "User Authentication & Authorization",
      "Product Catalog & Search",
      "Shopping Cart & Wishlist",
      "Secure Checkout & Payments",
      "Order Tracking & History",
      "Responsive Design",
    ],
    info: {
      Category: "E-commerce",
      Duration: "3 weeks",
      Client: "Personal Project",
      Role: "Full Stack Developer",
      Date: "April 2024",
    },
  },
  {
    slug: "devconnect",
    title: "DevConnect",
    tagline: "Developer Social Platform",
    category: "Full Stack",
    shortDescription:
      "A developer social platform to connect, share and grow together.",
    description:
      "A real-time social network for developers to share projects, post updates and collaborate through chat and feeds.",
    stack: ["React", "Node.js", "Socket.io"],
    fullStack: ["React", "Node.js", "Express", "Socket.io", "MongoDB", "JWT"],
    url: "devconnect.app",
    liveUrl: "#",
    codeUrl: "#",
    accent: "from-fuchsia-500/40 via-pink-500/30 to-rose-500/40",
    mockup: "social",
    overview:
      "DevConnect is a real-time social platform tailored for developers. It combines a feed, project showcase and chat so engineers can share work, get feedback and grow their network in one place.",
    features: [
      "Real-time Chat & Notifications",
      "Project & Skill Showcase",
      "Personalized Feed",
      "Follow / Unfollow System",
      "Profile & Activity Pages",
      "JWT-secured Auth",
    ],
    info: {
      Category: "Social Network",
      Duration: "5 weeks",
      Client: "Personal Project",
      Role: "Full Stack Developer",
      Date: "June 2024",
    },
  },
  {
    slug: "task-manager",
    title: "Task Manager",
    tagline: "Productivity & Workflow App",
    category: "Frontend",
    shortDescription:
      "A productivity app to organize your tasks and boost your workflow.",
    description:
      "A clean, keyboard-friendly task manager focused on speed, persistence, and a calm workspace.",
    stack: ["React", "Tailwind CSS", "LocalStorage"],
    fullStack: ["React", "Tailwind CSS", "Vite", "LocalStorage", "Framer Motion"],
    url: "tasks.local",
    liveUrl: "#",
    codeUrl: "#",
    accent: "from-cyan-400/40 via-teal-400/30 to-emerald-500/40",
    mockup: "tasks",
    overview:
      "Task Manager is a fast, distraction-free productivity app. Tasks are saved locally so your workflow stays available offline, and a clean UI keeps focus on what matters next.",
    features: [
      "Create / Edit / Delete Tasks",
      "Drag & Drop Reordering",
      "Categories & Priorities",
      "Offline-first via LocalStorage",
      "Keyboard Shortcuts",
      "Dark Mode UI",
    ],
    info: {
      Category: "Productivity",
      Duration: "2 weeks",
      Client: "Personal Project",
      Role: "Frontend Developer",
      Date: "February 2024",
    },
  },
  {
    slug: "weather-app",
    title: "Weather App",
    tagline: "Real-time Weather Updates",
    category: "Web Apps",
    shortDescription:
      "A weather application that provides real-time weather updates around the world.",
    description:
      "A snappy weather dashboard with live conditions, multi-day forecasts and smart location search powered by a public weather API.",
    stack: ["JavaScript", "API", "CSS"],
    fullStack: ["JavaScript", "HTML", "CSS", "OpenWeather API", "Vite"],
    url: "weather.app",
    liveUrl: "#",
    codeUrl: "#",
    accent: "from-sky-400/40 via-blue-500/30 to-indigo-600/40",
    mockup: "weather",
    overview:
      "Weather App pulls live conditions and forecasts from a public weather API, with location search and a clean, responsive interface that adapts to any device.",
    features: [
      "Live Weather Conditions",
      "5-day Forecast",
      "City / Location Search",
      "Geolocation Support",
      "Animated Weather Icons",
      "Responsive Layout",
    ],
    info: {
      Category: "Utility",
      Duration: "1 week",
      Client: "Personal Project",
      Role: "Frontend Developer",
      Date: "March 2024",
    },
  },
];

export const getProjectBySlug = (slug) =>
  PROJECTS.find((p) => p.slug === slug) || null;
