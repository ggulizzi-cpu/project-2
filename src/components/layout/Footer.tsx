import React from 'react';
import { Logo } from './Logo';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

const contactInfo = [
  { icon: Mail, text: 'contact@aitravel.com' },
  { icon: Phone, text: '+1 (555) 123-4567' },
  { icon: MapPin, text: 'New York, NY 10001' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <Logo />
            </div>
            <p className="text-gray-400">
              Your AI-powered travel companion for discovering amazing destinations worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#destinations" className="text-gray-400 hover:text-white">Destinations</a></li>
              <li><a href="#blog" className="text-gray-400 hover:text-white">Travel Blog</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              {contactInfo.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center space-x-2 text-gray-400">
                  <Icon className="h-5 w-5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AI Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}