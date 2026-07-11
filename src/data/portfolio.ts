import type {
  CapabilityGroup,
  Education,
  Experience,
  Profile,
  Project,
  ProofPoint,
} from '../types/portfolio';

export const profile: Profile = {
  name: 'Rawezh Ali Rashid',
  title: 'Backend & Mobile Developer',
  statement: 'I build reliable backend systems and production mobile apps.',
  introduction:
    'I connect maintainable .NET services with polished Flutter products, carrying ideas across APIs, data, infrastructure, iOS, and Android.',
  email: 'rawezh.5555@gmail.com',
  location: 'Sulaymaniyah, Iraq',
};

export const proofPoints: readonly ProofPoint[] = [
  { value: '4+', label: 'Years building production software' },
  { value: '06', label: 'Published mobile applications' },
  { value: 'iOS + Android', label: 'Cross-platform delivery' },
  { value: 'Backend + Mobile', label: 'End-to-end product experience' },
];

export const aboutCopy = {
  eyebrow: 'Current direction',
  lead:
    'My work has grown from shipping full mobile products into designing the backend systems that keep them dependable.',
  body:
    'Today I work with C#/.NET, PostgreSQL, Docker, Clean Architecture, and CQRS. My mobile background keeps me close to the user experience, while my backend focus helps me build clear boundaries, reliable communication, and systems that are easier to evolve.',
} as const;

export const experiences: readonly Experience[] = [
  {
    company: 'Moonline Travel',
    role: 'Backend Developer',
    period: 'February 2026 — Present',
    summary:
      'Building backend services with a focus on maintainable architecture, clear application boundaries, and reliable data workflows.',
    highlights: [
      'Work details remain confidential under contract.',
      'Continuously developing deeper backend and infrastructure practices.',
    ],
    technologies: [
      'C#',
      '.NET Web API',
      'PostgreSQL',
      'Docker',
      'Clean Architecture',
      'CQRS',
    ],
    confidential: true,
  },
  {
    company: 'Stack Solvers Company',
    role: 'Full Stack Mobile Developer',
    period: '2022 — 2025',
    summary:
      'Delivered Flutter applications and .NET APIs across healthcare, pharmacy, and education products.',
    highlights: [
      'Built mobile applications and backend APIs for production systems.',
      'Integrated authentication, secure token handling, local caching, and background services.',
      'Implemented push notifications, real-time chat, and external service integrations.',
      'Collaborated with UI/UX designers to ship clear, user-friendly experiences.',
    ],
    technologies: [
      'Flutter',
      'Dart',
      'C#',
      '.NET Web API',
      'SQL Server',
      'Firebase',
      'Twilio',
      'REST APIs',
    ],
  },
];

export const capabilities: readonly CapabilityGroup[] = [
  {
    title: 'Backend systems',
    summary:
      'Maintainable APIs, explicit application flows, secure access, and dependable background work.',
    skills: [
      'C#',
      '.NET Web API',
      'CQRS',
      'Clean Architecture',
      'JWT Authentication',
      'Background Services',
      'REST APIs',
    ],
  },
  {
    title: 'Data & infrastructure',
    summary:
      'Relational data and repeatable development environments for reliable delivery.',
    skills: ['PostgreSQL', 'SQL Server', 'Docker', 'Firebase'],
  },
  {
    title: 'Mobile products',
    summary:
      'Cross-platform applications with smooth UI, local persistence, and reliable backend communication.',
    skills: [
      'Flutter',
      'Dart',
      'Android',
      'iOS',
      'Local Storage',
      'Push Notifications',
    ],
  },
  {
    title: 'Tools & integrations',
    summary:
      'Practical tools and services used to connect, debug, and deliver production features.',
    skills: [
      'Git',
      'Postman',
      'Firebase Messaging',
      'Firebase Auth',
      'Twilio',
      'FIB Payments',
    ],
  },
];

const placeholderMedia = {
  type: 'placeholder',
  label: 'Personal project media coming soon',
} as const;

export const projects: readonly Project[] = [
  {
    name: 'Smart Health Tower',
    category: 'Healthcare',
    role: 'Full-Stack Developer',
    summary:
      'A mobile healthcare experience connecting patients with hospital services through a focused cross-platform product.',
    technologies: ['Flutter', 'Dart', '.NET Web API'],
    media: placeholderMedia,
    stores: [
      {
        platform: 'App Store',
        href: 'https://apps.apple.com/iq/app/smart-health-tower/id6444019538',
      },
      {
        platform: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=smarthealth.group&hl=en',
      },
    ],
  },
  {
    name: 'Vary Pharmacy',
    category: 'Pharmacy',
    role: 'Full-Stack Developer',
    summary:
      'A pharmacy application designed to make browsing and accessing pharmacy services straightforward on iOS and Android.',
    technologies: ['Flutter', 'Dart', '.NET Web API'],
    media: placeholderMedia,
    stores: [
      {
        platform: 'App Store',
        href: 'https://apps.apple.com/iq/app/vary-pharmacy/id6448043911',
      },
      {
        platform: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.varypharmacy.vary_pharmacy&hl=en',
      },
    ],
  },
  {
    name: 'Roshnayi',
    category: 'Education',
    role: 'Front-End Developer',
    summary:
      'A course and education application delivering an approachable learning experience across mobile platforms.',
    technologies: ['Flutter', 'Dart', 'Mobile UI'],
    media: placeholderMedia,
    stores: [
      {
        platform: 'App Store',
        href: 'https://apps.apple.com/us/app/roshnayi/id6502692914',
      },
      {
        platform: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=net.roshnayi.app&hl=en',
      },
    ],
  },
  {
    name: 'Avera Pharmacy & Cosmetic',
    category: 'Pharmacy & cosmetics',
    role: 'Full-Stack Developer',
    summary:
      'A cross-platform shopping experience for pharmacy and cosmetic products, published for both major mobile ecosystems.',
    technologies: ['Flutter', 'Dart', '.NET Web API'],
    media: placeholderMedia,
    stores: [
      {
        platform: 'App Store',
        href: 'https://apps.apple.com/us/app/avera-pharmacy-cosmetic/id6753678916',
      },
      {
        platform: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.avera.pharmacyapp',
      },
    ],
  },
  {
    name: 'Harem Hospital',
    category: 'Healthcare',
    role: 'Full-Stack Developer',
    summary:
      'A hospital mobile application bringing healthcare information and digital services into one accessible experience.',
    technologies: ['Flutter', 'Dart', '.NET Web API'],
    media: placeholderMedia,
    stores: [
      {
        platform: 'App Store',
        href: 'https://apps.apple.com/iq/app/harem-hospital/id6740174619',
      },
      {
        platform: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=org.haremhospital.app&hl=en',
      },
    ],
  },
  {
    name: 'Vary Healthcare',
    category: 'Healthcare',
    role: 'Full-Stack Developer',
    summary:
      'A healthcare application created to make services and information available through a consistent mobile product.',
    technologies: ['Flutter', 'Dart', '.NET Web API'],
    media: placeholderMedia,
    stores: [
      {
        platform: 'App Store',
        href: 'https://apps.apple.com/iq/app/vary-healthcare/id6471336461',
      },
      {
        platform: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.varyhealthcare.app.varyhealthcare.vary_healthcare_app&hl=en_US',
      },
    ],
  },
];

export const education: Education = {
  institution: 'UOS',
  college: 'College of Commerce — IT',
  degree: "Bachelor's degree",
  period: '2018 — 2022',
};
