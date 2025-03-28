import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Home, Info, MapPin, HelpCircle, Mail } from 'lucide-react';

const Header = () => {
  const { url } = usePage();

  const navItems = [
    {
      href: "/",
      icon: Home,
      label: "Accueil"
    },
    {
      href: "/about",
      icon: Info,
      label: "À propos"
    },
    {
      href: "/centers",
      icon: MapPin,
      label: "Centres de Don"
    },
    {
      href: "/faq",
      icon: HelpCircle,
      label: "FAQ"
    },
    {
      href: "/contact",
      icon: Mail,
      label: "Contact"
    }
  ];

  return (
    <header className="bg-burgundy text-white py-4 px-8 flex justify-between items-center font-sans">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-cream">
          Blood<span className="text-white">Link</span>
        </h1>
      </div>

      <nav className="flex space-x-6">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = url === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center space-x-1
                ${isActive
                  ? 'text-white font-bold border-b-2 border-teal py-2'
                  : 'text-cream hover:text-white'}
              `}
            >
              {/* <IconComponent size={18} /> */}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex space-x-4">
        <button className="border border-cream text-cream px-4 py-2 rounded-lg hover:bg-cream hover:text-burgundy">
          <Link href='api/login'>Connexion</Link>
        </button>
        <button className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-darkTeal">
          <Link href='api/register'>Inscription</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
