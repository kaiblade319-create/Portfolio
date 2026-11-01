
import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface ProjectResult {
  title: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
}

export interface ProjectDataFile {
  name: string;
  url: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tool: string;
  projectTypes: string[];
  link?: string;
  linkLabel?: string;
  dataFiles?: ProjectDataFile[];
  category: 'Machine Learning' | 'NLP' | 'Data Analysis' | 'Data Visualization';
  projectTrack: 'Independent' | 'Guided';
  paperUrl?: string;
  imageUrl: string;
  imageHint: string;
  goal: string;
  process: string;
  insights: string;
  results: ProjectResult[];
  placeholderLabel?: string;
  githubUrl?: string;
  docsPath: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Customer Churn & Retention Optimization Pipeline',
    description: 'An end-to-end analytical and machine learning workflow built to diagnose root causes of customer churn, forecast attrition risks, and automate retention priority queues.',
    tool: 'Python (scikit-learn, pandas, FastAPI)',
    projectTypes: ['Risk Mitigation', 'Predictive Modeling', 'Pipeline Automation'],
    projectTrack: 'Independent',
    link: 'https://github.com/your-github-handle/customer-churn-pipeline',
    githubUrl: 'https://github.com/your-github-handle/customer-churn-pipeline',
    docsPath: '/projects/1',
    paperUrl: 'https://arxiv.org/abs/2301.00000',
    dataFiles: [
      { name: 'customer_data.csv', url: '/project-files/customer_data.csv' },
      { name: 'churn_labels.csv', url: '/project-files/churn_labels.csv' },
      { name: 'customer_data_clean.xlsx', url: '/project-files/customer_data_clean.xlsx' },
    ],
    category: 'Machine Learning',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-1')?.imageUrl ?? 'https://picsum.photos/seed/churn-pipeline/800/450',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-1')?.imageHint ?? 'analytics dashboard data pipeline chart',
    goal: 'Retention teams lacked an early-warning signal to prioritize at-risk accounts before cancellations occurred, causing recurring revenue leakage.',
    process: 'Historical accounts were sanitized, normalized, and engineered into behavioral feature vectors. Supervised classifiers were trained and validated against holdout sets with AUC-ROC optimization.',
    insights: 'Early engagement in the first 90 days was the single highest predictor of multi-year retention. Targeted early interventions reduce expected attrition by over 25%.',
    results: [
      {
        title: 'Result 1 – Churn Rate Peaks in Younger Age Groups',
        description: 'Younger cohorts had the highest churn rates despite high acquisition volume. Targeted retention campaigns yielded the highest return.',
        imageUrl: 'https://picsum.photos/seed/churn-age/800/450',
        imageHint: 'bar chart churn by age group',
      },
      {
        title: 'Result 2 – Tenure Is the Strongest Predictor',
        description: 'Customers with fewer than 12 months of tenure were 3× more likely to churn. Onboarding improvements are the highest-leverage intervention.',
        imageUrl: 'https://picsum.photos/seed/churn-tenure/800/450',
        imageHint: 'line chart churn rate by tenure months',
      },
      {
        title: 'Result 3 – Random Forest Outperformed Baseline',
        description: 'Achieved an AUC of 0.87 vs. 0.72 for baseline, providing high precision on the top risk tier that matters most for retention action.',
      },
    ],
  },
];

export type SkillLevel = 'Advanced' | 'Intermediate' | 'Beginner';

export interface SkillCategory {
  name: string;
  level: SkillLevel;
  icon: string;
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming',
    level: 'Intermediate',
    icon: 'Code',
    description:
      'Builds maintainable Python and TypeScript solutions for data workflows, dashboards, and portfolio-grade applications.',
  },
  {
    name: 'Databases',
    level: 'Intermediate',
    icon: 'Database',
    description:
      'Comfortable with SQL fundamentals, schema design, and querying structured datasets for analytics use cases.',
  },
  {
    name: 'Cloud',
    level: 'Beginner',
    icon: 'Cloud',
    description:
      'Exploring deployment workflows and managed services for hosting ML demos and data apps.',
  },
  {
    name: 'Machine Learning',
    level: 'Intermediate',
    icon: 'BrainCircuit',
    description:
      'Builds supervised learning pipelines with robust preprocessing, feature engineering, and evaluation practices.',
  },
  {
    name: 'AI',
    level: 'Intermediate',
    icon: 'Bot',
    description:
      'Applies practical AI/NLP patterns in project prototypes, focusing on explainability and usability.',
  },
];

export const tools: string[] = [
    'Python', 'R', 'Java', 'SQL', 'TypeScript',
    'Scikit-learn', 'Pandas', 'NumPy', 'NLP', 'TensorFlow', 'PyTorch', 'Tableau', 'Airflow',
    'AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
    'MySQL', 'PostgreSQL', 'MongoDB',
    'Generative AI', 'Large Language Models'
];


export interface SoftSkill {
  name: string;
  level: SkillLevel;
  icon: string;
  description: string;
}

export const softSkills: SoftSkill[] = [
  {
    name: 'Communication',
    level: 'Intermediate',
    icon: 'MessageCircle',
    description: 'Explains technical decisions clearly to both technical peers and non-technical stakeholders.',
  },
  {
    name: 'Teamwork',
    level: 'Intermediate',
    icon: 'Users',
    description: 'Collaborates effectively in group projects with shared ownership and structured delivery.',
  },
  {
    name: 'Problem Solving',
    level: 'Intermediate',
    icon: 'Puzzle',
    description: 'Breaks complex problems into practical steps and iterates quickly with measurable outputs.',
  },
  {
    name: 'Leadership',
    level: 'Intermediate',
    icon: 'Crown',
    description: 'Takes initiative in project planning, ownership, and delivery follow-through.',
  },
  {
    name: 'Adaptability',
    level: 'Intermediate',
    icon: 'RefreshCw',
    description: 'Learns new tools quickly and adapts project direction based on feedback and constraints.',
  },
];

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface Language {
  name: string;
  level: CEFRLevel;
  icon: string;
  description: string;
}

export const languages: Language[] = [
  {
    name: 'English',
    level: 'B2',
    icon: 'Globe',
    description: 'Professional working proficiency in speaking, reading, and writing.',
  },
  {
    name: 'Hindi',
    level: 'C1',
    icon: 'MessageCircle',
    description: 'Full professional fluency in speaking, reading, and writing.',
  },
  {
    name: 'Gujarati',
    level: 'C1',
    icon: 'MessageSquare',
    description: 'Native or near-native communication in everyday and professional settings.',
  },
];


export const aboutMe = {
  description: "I'm Kaushar Halani, a Computer Science student focused on solving practical challenges through clean analytical workflows, dashboards, and robust code. I enjoy turning raw, messy datasets and complex problems into structured solutions that support better decisions.\n\nI focus on strengthening real-world execution, solid software and data fundamentals, and clear communication. I am continuously exploring emerging technologies, model development, and scalable pipelines to build impactful projects.\n\nI'm actively looking for internships and entry-level opportunities where I can contribute with discipline, ownership, and continuous learning.",
  imageUrl: PlaceHolderImages.find(p => p.id === 'about-me')?.imageUrl ?? 'https://picsum.photos/seed/104/400/400',
  imageHint: PlaceHolderImages.find(p => p.id === 'about-me')?.imageHint ?? 'portrait headshot',
};

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  mode?: string;
  type?: string;
  mentor?: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Technical Coordinator',
    company: 'Blink Beyond',
    period: '01 July 2026 – 30 August 2026',
    mode: 'Remote',
    type: 'Part-Time Internship',
    mentor: 'Reporting to: Nilesh Rajput',
    description: 'Learning-oriented technical and team coordination role focused on managing technology deliverables, website initiatives, and cross-functional team workflows.',
    responsibilities: [
      'Coordinated task distribution, technical requirements, and milestone delivery for technology and web-related projects.',
      'Facilitated clear communication between development and project stakeholders to resolve blockers quickly.',
      'Monitored website quality, deployment readiness, and technical documentation.',
    ],
    achievements: [
      'Ensured structured, timely project delivery across remote team environments.',
      'Streamlined team handoffs and milestone tracking for multi-week web deliverables.',
    ],
  },
  {
    id: 2,
    role: 'Tech Intern',
    company: 'Blink Beyond',
    period: '01 May 2026 – 30 June 2026',
    mode: 'Onsite',
    type: 'Full-Time Internship',
    mentor: 'Reporting to: Nilesh Rajput',
    description: 'Hands-on engineering and web development internship focused on building technology and website-related systems, debugging, and operational implementation.',
    responsibilities: [
      'Built and maintained website features, responsive user interfaces, and technical web components.',
      'Diagnosed layout and script issues, improving web reliability and user experience.',
      'Collaborated onsite with senior engineers on full-cycle website implementation and testing.',
    ],
    achievements: [
      'Successfully delivered technology and web deliverables within scheduled sprint timelines.',
      'Strengthened foundational full-stack software practices, clean code standards, and agile collaboration.',
    ],
  },
  {
    id: 3,
    role: 'Advanced Computer Vision Intern',
    company: 'YOLOvX by WISERLI',
    period: '18 May 2025 – 28 May 2025',
    mode: 'Hybrid / Lab',
    type: 'Academic Credit (60 Hours)',
    mentor: 'Under Mr. Sandeep Dwivedi (AIML Dept., SJCEM) & Dr. Chandrakant Bothe (Founder, YOLOvX)',
    description: 'Completed a rigorous 10-day intensive program (60 hours / 1 academic credit) on state-of-the-art Computer Vision, object detection architectures, and real-time inference using the YOLOvX application.',
    responsibilities: [
      'Trained and evaluated deep learning object detection algorithms on custom image and video datasets.',
      'Performed real-time object detection, bounding-box optimization, and inference testing using the YOLOvX App.',
      'Engaged in hands-on workshops exploring neural network performance, mAP evaluation, and model latency.',
    ],
    achievements: [
      'Successfully earned 1 academic credit under the direct guidance of SJCEM AIML faculty and YOLOvX leadership.',
      'Demonstrated working real-time vision pipelines with reproducible detection accuracy.',
    ],
  },
];

export interface Education {
  id: number;
  degree: string;
  institution: string;
  period: string;
  description: string;
  details: {
    highlights: string[];
    coursework: string[];
  };
}

export const education: Education[] = [
  {
    id: 3,
    degree: 'B.E. in Computer Science Engineering (Data Science)',
    institution: 'St. John College of Engineering and Management',
    period: '2022 - 2027',
    description: 'Pursuing a comprehensive degree focused on the intersection of computer science and data science, covering core engineering principles, advanced algorithms, and practical data analysis techniques.',
    details: {
      highlights: [
        'Currently pursuing degree with a focus on data science specialization (CSE-DS).',
        'Actively participating in coding clubs and data science workshops.'
      ],
      coursework: [
        'Data Structures & Algorithms',
        'Machine Learning',
        'Database Management Systems',
        'Big Data Analytics',
      ],
    },
  },
];

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/your-linkedin-handle',
  github: 'https://github.com/your-github-handle',
  twitter: 'https://twitter.com/your-twitter-handle',
};

export const profileLinks = [
    {
      category: 'Social Media',
      icon: 'Users',
      links: [
        { name: 'LinkedIn', url: socialLinks.linkedin },
        { name: 'GitHub', url: socialLinks.github },
        { name: 'Twitter', url: 'https://twitter.com' },
      ],
    },
    {
      category: 'Research',
      icon: 'BookUser',
      links: [
        { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=your-id' },
        { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/your-name' },
      ],
    },
    {
      category: 'Coding Profiles',
      icon: 'Code',
      links: [
        { name: 'HackerRank', url: 'https://hackerrank.com' },
        { name: 'LeetCode', url: 'https://leetcode.com' },
      ],
    },
  ];

