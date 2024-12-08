import React, { memo, useState, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../../utils/constants';

function MobileMenuComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleItemClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="text-gray-600 hover:text-blue-600 focus:outline-none"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-t">
          <div className="px-4 py-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-blue-600"
                onClick={handleItemClick}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const MobileMenu = memo(MobileMenuComponent);