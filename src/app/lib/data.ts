
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

export interface CaseStudyKpi {
  label: string;
  value: string;
  sublabel: string;
  icon: 'Clock' | 'TrendingDown' | 'Target';
}

export interface CaseStudyComparisonRow {
  dimension: string;
  traditional: string;
  myApproach: string;
}

export interface CaseStudyWorkflowStep {
  step: string;
  title: string;
  icon: 'Database' | 'Sliders' | 'Cpu' | 'Send';
  desc: string;
}

export interface CaseStudyDiscovery {
  kicker: string;
  title: string;
  imageId?: string;
  fallbackLabel: string;
  alt: string;
  caption: string;
}

export interface CaseStudyTelemetryPoint {
  label: string;
  primary: number;
  baseline: number;
}

export interface CaseStudyBenchmarkModel {
  model: string;
  primaryScore: number;
  secondaryScore: number;
  auc: string;
  recall: string;
  precision: string;
  tradeoff: string;
  selected?: boolean;
}

export interface ProjectCaseStudy {
  subtitle: string;
  kpis: CaseStudyKpi[];
  problemTitle: string;
  problemParagraphs: string[];
  revealTitle: string;
  revealParagraphs: string[];
  comparisonRows: CaseStudyComparisonRow[];
  workflowSteps: CaseStudyWorkflowStep[];
  discoveries: CaseStudyDiscovery[];
  telemetryTitle: string;
  telemetryUnit: string;
  telemetryPrimaryLabel: string;
  telemetryBaselineLabel: string;
  telemetrySeries: CaseStudyTelemetryPoint[];
  modelNarrative: string;
  benchmarks: CaseStudyBenchmarkModel[];
  takeaways: Array<{ title: string; detail: string }>;
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
  caseStudy?: ProjectCaseStudy;
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
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-1')?.imageUrl ?? '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-1')?.imageHint ?? 'monochrome machine learning data pipeline architecture',
    goal: 'Retention teams lacked an early-warning signal to prioritize at-risk accounts before cancellations occurred, causing recurring revenue leakage.',
    process: 'Historical accounts were sanitized, normalized, and engineered into behavioral feature vectors. Supervised classifiers were trained and validated against holdout sets with AUC-ROC optimization.',
    insights: 'Early engagement in the first 90 days was the single highest predictor of multi-year retention. Targeted early interventions reduce expected attrition by over 25%.',
    results: [
      {
        title: 'Result 1 – Churn Rate Peaks in Younger Age Groups',
        description: 'Younger cohorts had the highest churn rates despite high acquisition volume. Targeted retention campaigns yielded the highest return.',
        imageUrl: PlaceHolderImages.find(p => p.id === 'churn-tickets')?.imageUrl ?? '',
        imageHint: 'bar chart churn by age group',
      },
      {
        title: 'Result 2 – Tenure Is the Strongest Predictor',
        description: 'Customers with fewer than 12 months of tenure were 3× more likely to churn. Onboarding improvements are the highest-leverage intervention.',
        imageUrl: PlaceHolderImages.find(p => p.id === 'churn-tenure')?.imageUrl ?? '',
        imageHint: 'line chart churn rate by tenure months',
      },
      {
        title: 'Result 3 – Random Forest Outperformed Baseline',
        description: 'Achieved an AUC of 0.87 vs. 0.72 for baseline, providing high precision on the top risk tier that matters most for retention action.',
      },
    ],
    caseStudy: {
      subtitle: 'Diagnosing root causes of silent subscriber loss, predicting churn 30 days in advance, and automating revenue protection workflows.',
      kpis: [
        {
          label: 'Early Warning',
          value: '30 Days',
          sublabel: 'Advance notice before customer cancellation',
          icon: 'Clock',
        },
        {
          label: 'Loss Mitigation',
          value: '~25%',
          sublabel: 'Projected reduction in churned revenue',
          icon: 'TrendingDown',
        },
        {
          label: 'Model Precision',
          value: '0.87 AUC',
          sublabel: 'Random Forest vs 0.72 baseline',
          icon: 'Target',
        },
      ],
      problemTitle: 'The Expensive Situation',
      problemParagraphs: [
        'In SaaS and subscription services, customer churn is silent. Customers do not announce they are unhappy; they quietly stop logging in and cancel weeks later.',
        'By the time the support team received cancellation notices, win-back campaigns had less than an 8% success rate. The business was suffering preventable revenue leakage of over $180,000 annually.',
      ],
      revealTitle: 'What the Data Revealed',
      revealParagraphs: [
        'The initial assumption was that customers left for cheaper competitors. But when historical telemetry was analyzed, the real pattern emerged:',
        '72% of all churn occurred between Day 15 and Day 60. The root issue was not price—it was onboarding confusion. Customers hit early friction, abandoned the tool, and cancelled on their next renewal.',
      ],
      comparisonRows: [
        {
          dimension: 'Approach Strategy',
          traditional: 'Reactive — Notices customers only after they cancel.',
          myApproach: 'Proactive — Detects early friction signals 30 days before contract end.',
        },
        {
          dimension: 'Root-Cause Diagnosis',
          traditional: 'Surface-level — Assumes customers left for cheaper pricing.',
          myApproach: 'Data-driven — Revealed that 72% of churn was caused by onboarding drop-off.',
        },
        {
          dimension: 'Intervention Tactic',
          traditional: 'Generic mass emails offering last-minute price discounts.',
          myApproach: 'Prioritized CRM alerts sent to Customer Success with specific problem context.',
        },
        {
          dimension: 'Operational Workflow',
          traditional: 'Manual spreadsheets reviewed once a month by managers.',
          myApproach: 'Automated daily scoring pipeline requiring zero manual data wrangling.',
        },
        {
          dimension: 'Bottom-Line Result',
          traditional: '<8% recovery rate (too late to save relationship).',
          myApproach: '~25% projected churn reduction by intervening early.',
        },
      ],
      workflowSteps: [
        {
          step: '01',
          title: 'Data Ingestion',
          icon: 'Database',
          desc: 'Sanitized 18 months of historical telemetry, billing history, and support tickets.',
        },
        {
          step: '02',
          title: 'Feature Engineering',
          icon: 'Sliders',
          desc: 'Extracted engagement velocity, ticket escalation rates, and tenure brackets.',
        },
        {
          step: '03',
          title: 'Predictive Modeling',
          icon: 'Cpu',
          desc: 'Trained and validated Random Forest with stratified cross-validation (0.87 AUC).',
        },
        {
          step: '04',
          title: 'Actionable Delivery',
          icon: 'Send',
          desc: 'Generates daily priority queues directly into CRM for immediate team intervention.',
        },
      ],
      discoveries: [
        {
          kicker: 'Key Discovery #1',
          title: 'The 60-Day Onboarding Cliff',
          imageId: 'churn-tenure',
          fallbackLabel: '60-Day Retention Curve',
          alt: 'Churn rate by tenure months chart',
          caption: 'Customers with under 12 months of tenure accounted for 68% of churned accounts. Once a user crossed the 6-month threshold, their annual retention rate jumped from 32% to over 84%.',
        },
        {
          kicker: 'Key Discovery #2',
          title: 'Support Ticket Escalation as an Early-Warning Signal',
          imageId: 'churn-tickets',
          fallbackLabel: 'Ticket Escalation Correlation',
          alt: 'Support ticket correlation chart',
          caption: 'A spike of 3 or more support tickets within 30 days combined with a 40% decline in login frequency was the single strongest leading indicator of churn, preceding cancellations by 3 to 4 weeks.',
        },
      ],
      telemetryTitle: 'Monthly Churn Risk Curve (With Early-Warning Pipeline vs Reactive Baseline)',
      telemetryUnit: '%',
      telemetryPrimaryLabel: 'Engineered Pipeline',
      telemetryBaselineLabel: 'Reactive Baseline',
      telemetrySeries: [
        { label: 'Day 15', primary: 28, baseline: 34 },
        { label: 'Day 30', primary: 22, baseline: 41 },
        { label: 'Day 60', primary: 15, baseline: 38 },
        { label: 'Day 90', primary: 11, baseline: 29 },
        { label: 'Day 180', primary: 8, baseline: 21 },
      ],
      modelNarrative:
        'Evaluated three distinct model families using 5-fold cross-validation. While Logistic Regression provided rapid execution, Random Forest delivered superior recall on the critical high-risk segment without incurring significant latency overhead.',
      benchmarks: [
        {
          model: 'Logistic Regression',
          primaryScore: 72,
          secondaryScore: 64,
          auc: '0.72',
          recall: '64%',
          precision: '58%',
          tradeoff: 'Too many false negatives on early-stage accounts.',
        },
        {
          model: 'Random Forest',
          primaryScore: 87,
          secondaryScore: 81,
          auc: '0.87',
          recall: '81%',
          precision: '78%',
          tradeoff: 'Best balance of high recall and explainability.',
          selected: true,
        },
        {
          model: 'XGBoost',
          primaryScore: 86,
          secondaryScore: 80,
          auc: '0.86',
          recall: '80%',
          precision: '77%',
          tradeoff: 'Similar accuracy to Random Forest, but higher tuning overhead.',
        },
      ],
      takeaways: [
        {
          title: 'Automated Early Warning Beats Reactive Discounts',
          detail: 'Intervening when a customer is already cancelling is expensive and rarely works. Intervening at the 30-day mark saves accounts before frustration hardens.',
        },
        {
          title: 'Invest in Onboarding Over Retargeting',
          detail: 'Fixing the first 60 days of user onboarding yields higher ROI than spending money acquiring replacement customers.',
        },
        {
          title: 'Direct Operational Hand-off',
          detail: 'The best data pipeline is useless if it stays in a notebook. Connecting priority queues directly to Customer Success ensures immediate action.',
        },
      ],
    },
  },
];

export type SkillLevel = 'Advanced' | 'Intermediate' | 'Beginner';

export interface SkillCategory {
  name: string;
  level: SkillLevel;
  focus: string;
  icon: string;
  description: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Programming',
    level: 'Intermediate',
    focus: 'Python · TypeScript',
    icon: 'Code2',
    description:
      'Builds maintainable Python and TypeScript solutions for data workflows, dashboards, and portfolio-grade applications.',
  },
  {
    name: 'Databases',
    level: 'Intermediate',
    focus: 'SQL · Schema Design',
    icon: 'Database',
    description:
      'Comfortable with SQL fundamentals, schema design, and querying structured datasets for analytics use cases.',
  },
  {
    name: 'Cloud',
    level: 'Beginner',
    focus: 'Deploy · Cloud Basics',
    icon: 'Cloud',
    description:
      'Exploring deployment workflows and managed services for hosting ML demos and data apps.',
  },
  {
    name: 'Machine Learning',
    level: 'Intermediate',
    focus: 'Scikit-learn · Eval',
    icon: 'BrainCircuit',
    description:
      'Builds supervised learning pipelines with robust preprocessing, feature engineering, and evaluation practices.',
  },
  {
    name: 'AI',
    level: 'Intermediate',
    focus: 'AI-Assisted · NLP',
    icon: 'Cpu',
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
  focus: string;
  icon: string;
  description: string;
}

export const softSkills: SoftSkill[] = [
  {
    name: 'Communication',
    level: 'Intermediate',
    focus: 'Client & Peer Sync',
    icon: 'MessageSquareText',
    description: 'Explains technical decisions clearly to both technical peers and non-technical stakeholders.',
  },
  {
    name: 'Teamwork',
    level: 'Intermediate',
    focus: 'Pod Collaboration',
    icon: 'Users',
    description: 'Collaborates effectively in group projects with shared ownership and structured delivery.',
  },
  {
    name: 'Problem Solving',
    level: 'Intermediate',
    focus: 'Root-Cause First',
    icon: 'Puzzle',
    description: 'Breaks complex problems into practical steps and iterates quickly with measurable outputs.',
  },
  {
    name: 'Leadership',
    level: 'Intermediate',
    focus: 'Intern Pod Lead',
    icon: 'Compass',
    description: 'Takes initiative in project planning, ownership, and delivery follow-through.',
  },
  {
    name: 'Adaptability',
    level: 'Intermediate',
    focus: 'Rapid Stack Pickup',
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
  imageUrl: PlaceHolderImages.find(p => p.id === 'project-1')?.imageUrl ?? '',
  imageHint: PlaceHolderImages.find(p => p.id === 'project-1')?.imageHint ?? 'data pipeline architecture',
};

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  mode?: string;
  type?: string;
  isCurrent?: boolean;
  mentor?: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: 'Technical Project Coordinator',
    company: 'Blink Beyond',
    period: '21 Oct 2026 – 21 Apr 2027',
    mode: 'Onsite (Palghar)',
    type: 'Client & Tech Lead',
    isCurrent: true,
    mentor: 'With Founder Nilesh Rajput',
    description: 'Core operational leadership role driving client acquisition, hiring and managing developer intern pods, and executing commercial web and software deliverables using modern AI-assisted workflows.',
    responsibilities: [
      'Acquire and interface directly with business clients to extract project requirements, scope sprint deliverables, and define milestones.',
      'Recruit, onboard, and lead intern developer cohorts, assigning sprint tasks and maintaining high execution quality.',
      'Lead technical execution by leveraging generative AI and modern developer tooling to rapidly prototype, debug, and deliver client solutions.',
      'Coordinate quality checks, deployment readiness, and client sign-offs to ensure on-time delivery.',
    ],
    achievements: [
      'Actively managing end-to-end client relationships and leading the onsite delivery pod in Palghar.',
      'Streamlined project delivery cycles by combining intern team leadership with AI-accelerated workflows.',
    ],
  },
  {
    id: 2,
    role: 'Technical Coordinator (Intern Lead)',
    company: 'Blink Beyond',
    period: '01 July 2026 – 30 August 2026',
    mode: 'Remote',
    type: 'Team Lead',
    mentor: 'Reporting to: Nilesh Rajput',
    description: 'Sourced developer interns for the startup, served as pod leader for the incoming cohort, and coordinated team execution on founder-assigned project modules using AI coding tools.',
    responsibilities: [
      'Facilitated intern onboarding and served as team lead for a newly formed cohort of student developers.',
      'Decomposed technical tasks assigned by the founder and guided the group through implementation using AI-assisted development tools.',
      'Conducted peer reviews, resolved technical hurdles, and ensured all group deliverables were submitted on schedule.',
    ],
    achievements: [
      'Successfully coordinated multiple remote sprint deliverables with zero missed deadlines.',
      'Fostered high collaborative productivity across the intern team through clear task delegation and AI-first problem solving.',
    ],
  },
  {
    id: 3,
    role: 'Tech Intern (AI-Assisted Development)',
    company: 'Blink Beyond',
    period: '01 May 2026 – 30 June 2026',
    mode: 'Onsite (Palghar)',
    type: 'Technical Internship',
    mentor: 'Working with: Nilesh Rajput (Founder)',
    description: 'Hands-on technical internship at the Palghar headquarters, utilizing AI-assisted engineering and modern tools to build web features, debug software tasks, and support early-stage startup product sprints.',
    responsibilities: [
      'Built and modified website components and frontend interfaces using AI-driven coding assistants and rapid iteration.',
      'Worked directly alongside the founder in the Palghar office to troubleshoot technical blockers and test web deployments.',
      'Maintained consistent operational contributions, delivering clean code and responsive layouts for early-stage features.',
    ],
    achievements: [
      'Delivered working web components and UI modules within scheduled sprint timelines.',
      'Demonstrated rapid adaptability and task turnaround, leading to an invitation to step up as intern pod leader.',
    ],
  },
  {
    id: 4,
    role: 'Computer Vision Academic Intern (Collaborative Lab Project)',
    company: 'YOLOvX by WISERLI & SJCEM',
    period: '18 May 2025 – 28 May 2025',
    mode: 'Campus Lab',
    type: 'Academic Credit (60 Hours)',
    mentor: 'Faculty: Mr. Sandeep Dwivedi (AIML Dept.) & Dr. Chandrakant Bothe (Founder, YOLOvX)',
    description: 'College-mandated collaborative laboratory internship completed with a peer project group, focusing on dataset preparation, model testing, and real-time YOLO object detection workflows to fulfill SJCEM academic credit.',
    responsibilities: [
      'Participated in laboratory sessions for image annotation, dataset preparation, and real-time bounding box testing on the YOLOvX application.',
      'Collaborated actively with peer team members on group lab assignments, model evaluation, and presentation preparation.',
      'Explored fundamental computer vision metrics including precision, recall, and real-time inference latency.',
    ],
    achievements: [
      'Earned 1 full academic credit under SJCEM AIML faculty guidance through successful group project completion.',
      'Strengthened foundational understanding of computer vision pipelines, practical team dynamics, and lab workflows.',
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
      icon: 'Globe',
      links: [
        { name: 'LinkedIn', url: socialLinks.linkedin },
        { name: 'GitHub', url: socialLinks.github },
        { name: 'Twitter', url: 'https://twitter.com' },
      ],
    },
    {
      category: 'Research',
      icon: 'GraduationCap',
      links: [
        { name: 'Google Scholar', url: 'https://scholar.google.com/citations?user=your-id' },
        { name: 'ResearchGate', url: 'https://www.researchgate.net/profile/your-name' },
      ],
    },
    {
      category: 'Coding Profiles',
      icon: 'Terminal',
      links: [
        { name: 'HackerRank', url: 'https://hackerrank.com' },
        { name: 'LeetCode', url: 'https://leetcode.com' },
      ],
    },
  ];

