import SignInForm from '@/components/auth/SignInForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In - TBWA\\Intelligence',
  description: 'Access your TBWA Intelligence account',
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-black">
      <SignInForm />
    </main>
  );
} 