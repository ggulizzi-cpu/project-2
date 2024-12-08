import React, { memo } from 'react';
import { NAV_ITEMS } from '../../utils/constants';

function NavigationComponent() {
  return (
    <nav className="hidden md:flex space-x-6">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export const Navigation = memo(NavigationComponent);