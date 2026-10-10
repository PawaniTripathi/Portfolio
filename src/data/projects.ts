export interface Project {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  date: string;
  technologies: string[];
  previewClass: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  results: { value: string; label: string }[];
  githubUrl: string | null;
  liveUrl: string | null;
}

export const projects: Project[] = [
  {
    slug: 'collab-engine',
    num: '01',
    name: 'Collab Engine',
    tagline: 'A real-time collaboration platform organised around workspaces and channels.',
    date: 'August 2026',
    technologies: ['Node.js', 'Express', 'React', 'PostgreSQL', 'Prisma', 'Redis'],
    previewClass: 'project-preview--collab',
    description:
      'Collab Engine is a real-time collaboration platform that centralises team communication through workspaces and channels, designed to handle thousands of concurrent users with persistent low-latency connections.',
    problem:
      'Teams working on distributed projects need a reliable, fast communication layer that keeps conversation history, supports concurrent users, and remains performant under load. Many solutions either lack real-time fidelity or struggle with database query latency as user counts grow.',
    solution:
      'Built a production-ready chat architecture using Node.js and Express on the backend, React on the frontend, PostgreSQL (via Prisma ORM) for persistent storage, and Redis for caching frequently-accessed data. Persistent WebSocket connections power real-time message delivery.',
    features: [
      'Centralised communication via workspaces and channels for structured team collaboration.',
      'Redis caching layer that cut average query latency by 50%.',
      'Persistent low-latency WebSocket connections for real-time message delivery.',
      'Sub-100ms message delivery and 99.9% uptime achieved in testing.',
      'Secured frontend with authentication and authorisation flows.',
      'Prisma ORM for type-safe, maintainable database access.',
    ],
    architecture:
      'The backend is an Express server managing REST endpoints for history and a WebSocket server for live events. PostgreSQL stores workspaces, channels, and messages with relational integrity enforced through Prisma migrations. Redis sits in front of the database for frequently-queried data such as recent messages and channel member lists, reducing round-trip times significantly.',
    challenges:
      'Keeping WebSocket connections stable for thousands of concurrent users required careful connection lifecycle management and heartbeat mechanisms. Deciding which data to cache in Redis versus query live required profiling real access patterns. The Prisma schema also needed several iterations to correctly model workspace membership, channel permissions, and message threading.',
    results: [
      { value: '50%', label: 'Reduction in average query latency via Redis caching' },
      { value: '<100ms', label: 'Message delivery latency in testing' },
      { value: '99.9%', label: 'Uptime achieved in testing' },
    ],
    githubUrl: null,
    liveUrl: null,
  },
  {
    slug: 'campushire',
    num: '02',
    name: 'CampusHire',
    tagline: 'A role-based campus placement and recruitment portal.',
    date: 'July 2026',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Redux Toolkit', 'Tailwind CSS'],
    previewClass: 'project-preview--campus',
    description:
      'CampusHire is a MERN-stack placement portal that streamlines the campus hiring process through two distinct role-based interfaces — one for students applying to roles and one for recruiters managing applications.',
    problem:
      'Campus placement processes often rely on spreadsheets, email threads, and manual tracking, leading to missed applications, slow feedback loops, and recruiter overload. Students lack visibility into their application status and struggle to upload required documents reliably.',
    solution:
      'Designed and built a full-stack MERN application with separate applicant and recruiter dashboards. Redux Toolkit manages shared state across 10+ interactive UI components. The backend handles authenticated access, resume and PDF uploads, and centralised application tracking.',
    features: [
      'Two role-based interfaces: student applicant dashboard and recruiter management panel.',
      'Secure authentication with JWT-based access control.',
      'Resume and PDF upload with server-side validation and storage.',
      'Centralised state management using Redux Toolkit across 10+ UI components.',
      'Applicant tracking with status updates visible in real time.',
      'Responsive UI optimised for both desktop and mobile.',
      'Reported 70% reduction in manual tracking effort.',
      'Reported 85% improvement in page load speed after optimisation.',
    ],
    architecture:
      'A Node.js and Express.js REST API connects to MongoDB through Mongoose. The React frontend uses Redux Toolkit for predictable state management, with separate slices for authentication, job listings, and application state. Tailwind CSS provides a consistent, responsive design system.',
    challenges:
      'Handling file uploads securely required server-side validation and careful MIME-type checking. Designing two distinct UI flows for different roles while sharing common components needed careful component decomposition. State synchronisation between the applicant and recruiter views when actions are taken on either side was solved with selective Redux invalidation.',
    results: [
      { value: '70%', label: 'Reported reduction in manual tracking effort' },
      { value: '85%', label: 'Reported improvement in page load speed' },
      { value: '10+', label: 'Interactive UI components managed with Redux' },
    ],
    githubUrl: null,
    liveUrl: null,
  },
  {
    slug: 'wandersmart',
    num: '03',
    name: 'WanderSmart',
    tagline: 'A full-stack travel platform combining booking, discovery, and AI-assisted itinerary generation.',
    date: 'April 2025',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JavaScript', 'HTML5', 'CSS3'],
    previewClass: 'project-preview--wander',
    description:
      'WanderSmart is a full-stack travel portal combining hotel booking, tour reservations, and destination discovery. It integrates Google Generative AI to produce personalised itineraries, reducing trip planning time significantly.',
    problem:
      'Planning a trip involves visiting multiple websites for flights, hotels, tours, and itineraries. This fragmentation is time-consuming and often results in suboptimal plans. Travellers need a single platform that consolidates these workflows and adds intelligent suggestions.',
    solution:
      'Built a unified travel portal with Node.js, Express, and MongoDB. Authentication is secured with JWT and bcrypt. The Google Generative AI SDK generates bespoke itineraries based on user preferences. Server-side rendering ensures fast initial loads and good SEO.',
    features: [
      'Hotel booking, tour reservations, and destination discovery in one platform.',
      'Covers approximately 80% of typical travel planning needs.',
      'JWT authentication and bcrypt password hashing for secure accounts.',
      'Google Generative AI SDK integration for personalised itinerary generation.',
      'Server-side rendering for fast page loads.',
      'Responsive web application accessible across devices.',
      'Reported 50% reduction in planning time.',
      'Reported 90% user satisfaction score.',
    ],
    architecture:
      'The backend is structured around Express routes for auth, destinations, bookings, and the AI itinerary endpoint. MongoDB with Mongoose stores user accounts, booking records, and destination data. The AI itinerary generation route accepts user preferences and proxies them to the Google Generative AI API, returning structured itinerary objects that the frontend renders.',
    challenges:
      'Integrating the Google Generative AI SDK required careful prompt engineering to produce structured, consistently formatted itinerary responses. Handling authentication across multiple route groups without code duplication was solved with reusable Express middleware. Responsive layout design without a CSS framework required careful media query planning.',
    results: [
      { value: '50%', label: 'Reported reduction in trip planning time' },
      { value: '90%', label: 'Reported user satisfaction score' },
      { value: '80%', label: 'Of travel planning needs covered in one platform' },
    ],
    githubUrl: null,
    liveUrl: null,
  },
];
