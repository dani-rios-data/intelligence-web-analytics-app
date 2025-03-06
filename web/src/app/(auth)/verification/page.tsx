import VerificationForm from '@/components/auth/VerificationForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verification - TBWA\\Intelligence',
  description: 'Verify your access code',
};

export default function VerificationPage() {
  return (
    <main className="min-h-screen bg-black">
      <VerificationForm />
    </main>
  );
} 