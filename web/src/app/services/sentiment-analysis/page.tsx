import type { Metadata } from 'next';
import SentimentAnalysis from '@/components/sentiment/SentimentAnalysis';

export const metadata: Metadata = {
  title: 'Sentiment Analysis - TBWA\\Intelligence',
  description: 'Analyze social media sentiment and engagement patterns',
};

export default function SentimentAnalysisPage() {
  return <SentimentAnalysis />;
} 