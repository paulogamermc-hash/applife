import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  path: string;
  icon: string;
  label: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: '🏠', label: 'Dashboard' },
  { path: '/missions', icon: '📋', label: 'Missions' },
  { path: '/shop', icon: '🛒', label: 'Shop' },
  { path: '/profile', icon: '👤', label: 'Profile' },
];

export function BottomNavigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-light-surface dark:bg-dark-surface border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="mobile-container">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? 'text-accent-blue'
                    : 'text-gray-500 dark:text-gray-400 hover:text-accent-blue'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
