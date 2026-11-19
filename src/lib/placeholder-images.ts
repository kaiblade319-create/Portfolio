import projectChurnHero from '@/assets/images/project_churn_hero_1795030021927.jpg';
import churnTenureChart from '@/assets/images/churn_tenure_chart_1795030021208.jpg';
import churnTicketsChart from '@/assets/images/churn_tickets_chart_1795030022915.jpg';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = [
  {
    id: 'project-1',
    description: 'Monochrome ML churn & retention pipeline architecture',
    imageUrl: projectChurnHero.src,
    imageHint: 'monochrome machine learning data pipeline architecture',
  },
  {
    id: 'churn-tenure',
    description: 'Churn rate by customer tenure cliff chart',
    imageUrl: churnTenureChart.src,
    imageHint: 'monochrome line chart showing sharp churn peak in first 60 days',
  },
  {
    id: 'churn-tickets',
    description: 'Support ticket escalation correlation chart',
    imageUrl: churnTicketsChart.src,
    imageHint: 'monochrome bar chart showing ticket escalation signal',
  },
];
