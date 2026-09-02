// data/gulzarProfile.js

export const gulzarProfile = {
  name: "Gulzar Hussain",

  headline: "3rd-year B.Tech CSE (AIML) student and MERN Stack Developer",

  education: {
    college: "Haldia Institute of Technology",
    degree: "B.Tech CSE (AIML)",
    year: "3rd Year",
  },

  skills: [
    "C++",
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Docker",
    "Redis",
    "RabbitMQ",
    "Machine Learning",
    "DSA",
  ],
  projects: [
    {
      name: "ShopSphere",

      type: "Microservices E-commerce Platform",

      status: "Backend-focused microservices project",

      description:
        "ShopSphere is a microservices-based e-commerce platform built to understand and implement scalable distributed backend architecture. Instead of keeping authentication, products, inventory, orders, payments, notifications and analytics inside one backend, each responsibility is handled by an independent service.",

      purpose:
        "The project was created to learn production-oriented backend concepts such as service-to-service communication, API Gateway architecture, asynchronous event-driven communication, inventory reservation, payment processing, distributed workflows, Docker networking and independent microservices.",

      techStack: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "RabbitMQ",
        "Docker",
        "Docker Compose",
        "JWT",
        "Axios",
        "http-proxy-middleware",
      ],

      architecture: "Microservices Architecture",

      services: [
        {
          name: "API Gateway",
          port: 5050,
          responsibility:
            "Provides a single entry point for frontend requests and forwards requests to the appropriate microservice.",
        },
        {
          name: "Auth Service",
          port: 5001,
          responsibility:
            "Handles user authentication, registration, login and JWT-based authorization.",
        },
        {
          name: "Product Service",
          port: 5002,
          responsibility:
            "Manages product creation, product information and product-related APIs.",
        },
        {
          name: "Inventory Service",
          port: 5003,
          responsibility:
            "Tracks product stock and handles stock reservation, release and commit operations.",
        },
        {
          name: "Order Service",
          port: 5004,
          responsibility:
            "Coordinates the complete order creation workflow between inventory and payment services.",
        },
        {
          name: "Payment Service",
          port: 5005,
          responsibility:
            "Processes payment requests coming from the order workflow.",
        },
        {
          name: "Notification Service",
          port: 5006,
          responsibility:
            "Designed to handle notifications generated from application events.",
        },
        {
          name: "Analytics Service",
          port: 5007,
          responsibility:
            "Designed to consume application events and generate analytics data.",
        },
      ],

      keyFeatures: [
        "User authentication and authorization",
        "Product management",
        "Inventory management",
        "Stock reservation before order confirmation",
        "Order creation workflow",
        "Payment processing",
        "Inventory rollback when an order fails",
        "API Gateway for routing requests",
        "RabbitMQ-based asynchronous communication",
        "Redis integration",
        "Dockerized microservices",
        "Independent databases and services",
        "Health checks for infrastructure services",
      ],

      orderFlow: [
        "Client sends order request through API Gateway",
        "Order Service receives the request",
        "Inventory Service reserves requested stock",
        "Payment Service processes the payment",
        "Order is created after successful payment",
        "Reserved inventory is committed",
        "Order-created events can be published through RabbitMQ",
        "If payment or another step fails, reserved inventory can be released",
      ],

      backendConcepts: [
        "Microservices",
        "API Gateway",
        "Service-to-service REST communication",
        "Event-driven architecture",
        "RabbitMQ exchanges and queues",
        "Redis",
        "Distributed transactions",
        "Inventory reservation pattern",
        "Compensating operations",
        "Docker networking",
        "Environment-based configuration",
        "JWT authentication",
      ],

      challengesSolved: [
        "Microservices communicating through Docker service names",
        "MongoDB container networking",
        "RabbitMQ connection issues",
        "Redis connection issues",
        "API Gateway proxy target configuration",
        "Port conflicts between services",
        "Inventory reserve, release and commit workflow",
        "Order and payment service integration",
      ],

      learning:
        "ShopSphere helped strengthen understanding of distributed systems, microservices communication, message brokers, Docker networking, API Gateway design and reliable order-processing workflows.",
    },

    {
      name: "MicroLearn",

      type: "Microservices Learning Platform",

      description:
        "MicroLearn is a microservices-based online learning platform where users can access courses, complete lessons, attempt quizzes and track their learning progress.",

      purpose:
        "The project was built to understand how a learning platform can be divided into independent services and how those services can communicate using REST APIs, Redis and RabbitMQ.",

      techStack: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Redis",
        "RabbitMQ",
        "Docker",
        "Docker Compose",
        "JWT",
        "Jest",
        "Supertest",
      ],

      architecture: "Microservices Architecture",

      services: [
        {
          name: "Auth Service",
          port: 5001,
          responsibility: "Handles user authentication and account management.",
        },
        {
          name: "Course Service",
          port: 5002,
          responsibility:
            "Manages courses, lessons and course-related information.",
        },
        {
          name: "Progress Service",
          port: 5003,
          responsibility:
            "Tracks completed lessons and calculates course completion percentage.",
        },
        {
          name: "Notification Service",
          port: 5004,
          responsibility:
            "Consumes events and handles learning-related notifications.",
        },
        {
          name: "Analytics Service",
          responsibility:
            "Collects platform activity and learning-related analytics.",
        },
        {
          name: "API Gateway",
          port: 5050,
          responsibility:
            "Acts as the common entry point for requests to different services.",
        },
      ],

      keyFeatures: [
        "User authentication",
        "Course creation and management",
        "Courses containing multiple lessons",
        "Video-based lesson support",
        "Quiz support",
        "Lesson completion tracking",
        "Course completion percentage",
        "Learning progress tracking",
        "RabbitMQ event communication",
        "Redis integration",
        "Dockerized services",
        "API Gateway routing",
        "Backend API testing",
      ],

      courseStructure: {
        course: ["Title", "Description", "Level", "Instructor", "Lessons"],

        lesson: ["Title", "Content", "Video URL", "Duration"],

        progress: [
          "Completed lessons",
          "Course completion percentage",
          "User progress",
        ],
      },

      eventDrivenFeatures: [
        "Services communicate through RabbitMQ events",
        "Progress completion events can be published",
        "Notification and analytics services can react to application events",
        "Topic-based RabbitMQ exchange is used for service decoupling",
      ],

      testing: [
        "Jest",
        "Supertest",
        "Authenticated API testing",
        "Cookie-based authentication testing",
      ],

      backendConcepts: [
        "Microservices architecture",
        "RabbitMQ",
        "Redis",
        "API Gateway",
        "REST APIs",
        "JWT authentication",
        "Event-driven communication",
        "Docker Compose",
        "Service isolation",
        "Automated testing",
      ],

      learning:
        "MicroLearn helped build practical understanding of microservices, asynchronous communication, progress-tracking systems, message brokers, Docker and backend testing.",
    },

    {
      name: "Smart Tractor Management System",

      type: "Multi-tenant Tractor Business Management Platform",

      description:
        "Smart Tractor Management System is a multi-tenant platform designed for tractor owners to manage their complete tractor business including owners, drivers, tractors, farmers, work records, payments, expenses and reports.",

      purpose:
        "The system is designed for real-world tractor businesses, especially where owners manage multiple tractors and drivers working for different farmers. Multiple unrelated tractor businesses can use the same application while keeping their data completely isolated.",

      architecture:
        "Multi-tenant MERN application with role-based access control",

      techStack: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Cookies",
        "Socket.IO",
        "Tailwind CSS",
      ],

      userRoles: [
        {
          role: "Owner",
          permissions: [
            "Create additional owners",
            "Create drivers",
            "Manage tractors",
            "Assign drivers",
            "Manage farmers",
            "View all work records",
            "Manage payments",
            "Manage expenses",
            "View reports",
            "Manage business settings",
          ],
        },
        {
          role: "Driver",
          permissions: [
            "View personal work history",
            "View farmers the driver has worked for",
            "Add and manage permitted farmer information",
            "View work records",
            "View work performance of drivers belonging to the same business",
          ],
        },
      ],

      multiTenantDesign: [
        "Every tractor business has its own Business ID",
        "Users belonging to one business cannot access another business's data",
        "Multiple owners can belong to the same business",
        "Owners within the same business share business data",
        "Drivers belong to a specific business",
      ],

      keyFeatures: [
        "Multi-business support",
        "Multiple owners per business",
        "Driver management",
        "Farmer management",
        "Tractor management",
        "Driver-to-tractor assignment",
        "Work record management",
        "Real-time work status",
        "Payment tracking",
        "Due payment calculation",
        "Expense tracking",
        "Driver work history",
        "Farmer work history",
        "Driver leaderboard",
        "Business reports",
        "Role-based authentication",
        "Business-level data isolation",
      ],

      workTypes: [
        "HAL",
        "ROTAVATOR",
        "CULTIVATOR",
        "SEEDER",
        "SPRAYER",
        "THRESHER",
        "TROLLEY",
        "LEVELLER",
        "HARVESTER",
        "WATER_PUMP",
      ],

      workTracking: {
        statuses: ["RUNNING", "PAUSED", "STOPPED", "IDLE"],

        tracks: [
          "Total work duration",
          "Work rate",
          "Total amount",
          "Paid amount",
          "Due amount",
          "Payment status",
          "Farmer",
          "Driver",
          "Tractor",
          "Work type",
        ],
      },

      mainPages: [
        "Dashboard",
        "Farmers",
        "Drivers",
        "Tractors",
        "Work Records",
        "Add Work",
        "Payments",
        "Due Summary",
        "Expenses",
        "Reports",
        "Settings",
      ],

      authentication: [
        "Owner authentication",
        "Driver authentication",
        "JWT",
        "HTTP-only cookies",
        "Role-based middleware",
        "Business-level authorization",
      ],

      backendConcepts: [
        "Multi-tenancy",
        "Role-based access control",
        "JWT authentication",
        "MongoDB relationships",
        "Business-level data isolation",
        "Middleware authorization",
        "Real-time communication using Socket.IO",
        "Payment calculations",
        "Work tracking",
      ],

      realWorldProblem:
        "Tractor owners often maintain farmer work, driver performance and payments manually. This system digitizes those operations and provides centralized business management.",

      learning:
        "The project provided experience designing a real-world multi-tenant SaaS-like system, defining user permissions, modeling relationships in MongoDB and building complex business logic.",
    },

    {
      name: "CampusHub",

      type: "College Community Platform",

      description:
        "CampusHub is a MERN-based college community platform that combines a Lost & Found system with a student marketplace. Students can report missing items, post found items, sell products or post requirements for items they want to buy.",

      purpose:
        "The platform was created to solve common campus problems by providing students with one centralized place for lost-and-found communication and peer-to-peer buying and selling.",

      techStack: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Cookies",
        "Nodemailer",
        "Multer",
        "Cloudinary",
        "Tailwind CSS",
      ],

      architecture: "MERN Stack Web Application",

      postTypes: [
        {
          type: "Lost",
          description: "Students can report an item they have lost.",
        },
        {
          type: "Found",
          description: "Students can post items they have found on campus.",
        },
        {
          type: "Sell",
          description: "Students can list products they want to sell.",
        },
        {
          type: "Buy / Need",
          description:
            "Students can post products or items they are looking to buy.",
        },
      ],

      keyFeatures: [
        "Student registration",
        "Student login",
        "Email OTP verification",
        "JWT authentication",
        "HTTP-only cookie authentication",
        "Create posts",
        "Lost item posts",
        "Found item posts",
        "Sell product posts",
        "Buy or need posts",
        "Image uploads",
        "Cloudinary media storage",
        "Post management",
        "Student marketplace",
        "Lost and Found system",
      ],

      authentication: {
        methods: [
          "JWT authentication",
          "HTTP-only cookies",
          "Email OTP verification",
        ],

        otpExpiry: "5 minutes",
      },

      mediaHandling: [
        "Multer for receiving uploaded files",
        "Cloudinary for storing images",
      ],

      backendConcepts: [
        "REST APIs",
        "Authentication",
        "Authorization",
        "Email OTP verification",
        "Cloud file uploads",
        "MongoDB CRUD operations",
        "Cookie-based authentication",
        "Protected routes",
      ],

      realWorldProblem:
        "College students frequently lose belongings or want to buy and sell items within their campus community. CampusHub combines these requirements into a single platform.",

      learning:
        "CampusHub strengthened full-stack MERN skills including authentication, email verification, image uploading, Cloudinary integration, protected APIs and frontend-backend integration.",
    },
  ],

  achievements: {
    leetcode: "Solved more than 300 DSA problems",
  },

  career: {
    roles: [
      "Software Engineering Intern",
      "MERN Stack Developer",
      "Backend Developer",
      "AI/ML Intern",
    ],
    availability: "Available for internship opportunities",
  },

  contact: {
    email: "gulzarhu88@gmail.com",
    github: "https://github.com/gulzarhu80",
    linkedin: "https://www.linkedin.com/in/gulzar-hussain-123456789/",
  },
  college: {
    collegeName: "Haldia Institute of Technology",
    city: "Haldia",
    state: "West Bengal",
    country: "India",
  },
  address: {
    village: "Nasirganj",
    city: "Barsoi",
    state: "Bihar",
    country: "India",
    zip: "854317",
  },
};
