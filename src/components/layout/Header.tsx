import React from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { AuthButtons } from '../auth/AuthButtons';

export function Header() {
  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation />
          <div className="hidden md:block">
            <AuthButtons />
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}