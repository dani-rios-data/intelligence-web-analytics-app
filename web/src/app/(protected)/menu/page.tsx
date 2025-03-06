import MenuGrid from '@/components/menu/MenuGrid';

export default function MenuPage() {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Main Menu
        </h1>
        <MenuGrid />
      </div>
    </div>
  );
} 