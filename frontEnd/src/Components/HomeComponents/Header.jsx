import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      href: "/",
      label: "Accueil"
    },
    {
      href: "/about",
      label: "À propos"
    },
    {
      href: "/centers",
      label: "Centres de Don"
    },
    {
      href: "/events",
      label: "Evenements"
    },

  ];

  const handleNavigation = (href) => {
    navigate(href);
  };

  return (
    <header className="bg-burgundy text-white py-4 px-8 flex justify-between items-center font-sans">
      <div className="flex items-center space-x-3">
        <h1 className="text-2xl font-bold text-cream">
          Blood<span className="text-white">Link</span>
        </h1>
      </div>

      <nav className="flex space-x-6">
        {navItems.map((item) => {
          const isActive = window.location.pathname === item.href;

          return (
            <button 
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              className={`
                flex items-center space-x-1 cursor-pointer
                ${isActive
                  ? 'text-white font-bold border-b-2 border-teal py-2'
                  : 'text-cream hover:text-white'}
              `}
            >
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex space-x-4">
        <button className="border border-cream text-cream px-4 py-2 rounded-lg hover:bg-cream hover:text-burgundy cursor-pointer">
          <Link to="/login">Connexion</Link>
        </button>
        <button className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-darkteal cursor-pointer">
          <Link to="/register">Inscription</Link>
        </button>
      </div>
    </header>
  );
};

export default Header;
