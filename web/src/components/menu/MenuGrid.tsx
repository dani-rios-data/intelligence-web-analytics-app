import Link from 'next/link';

interface MenuItem {
  title: string;
  description: string;
  href: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'Process File',
    description: 'Upload and process CSV or Excel files.',
    href: '/upload',
  },
  {
    title: 'History',
    description: 'View processed files history.',
    href: '/dashboard',
  },
];

export default function MenuGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <div key={item.href} className="card menu-card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <Link href={item.href} className="btn btn-primary mt-4">
            Go to {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
} 