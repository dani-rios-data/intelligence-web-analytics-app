import Layout from '@/components/common/Layout';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <main className="flex-1">
        {children}
      </main>
    </Layout>
  );
} 