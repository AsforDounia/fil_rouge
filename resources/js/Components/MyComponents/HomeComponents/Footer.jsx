import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-burgundy text-cream py-12 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* First Column - Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Blood<span className="text-white">Link</span>
          </h2>
          <p className="text-cream mb-6 leading-relaxed">
            BloodLink sécurise le don de sang en connectant donneurs, centres et patients, assurant un approvisionnement régulier et sauvant des milliers de vies chaque année.
          </p>
          <div className="flex space-x-4">
            {[
              { Icon: Facebook, href: '#' },
              { Icon: Twitter, href: '#' },
              { Icon: Instagram, href: '#' },
              { Icon: Linkedin, href: '#' }
            ].map(({ Icon, href }, index) => (
              <a
                key={index}
                href={href}
                className="bg-white/10 text-white rounded-full p-2 hover:bg-teal transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl text-white mb-4">Liens Rapides</h3>
          <ul className="space-y-2">
            {[
              { label: 'Accueil', href: '/' },
              { label: 'À propos', href: '/about' },
              { label: 'Centres de Don', href: '/centers' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Contact', href: '/contact' }
            ].map(({ label, href }, index) => (
              <li key={index}>
                <a
                  href={href}
                  className="text-cream hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl text-white mb-4">Ressources</h3>
          <ul className="space-y-2">
            {[
              { label: 'Éligibilité au Don', href: '#' },
              { label: 'Processus de Don', href: '#' },
              { label: 'Groupes Sanguins', href: '#' },
              { label: 'Témoignages', href: '#' },
              { label: 'Blog', href: '#' }
            ].map(({ label, href }, index) => (
              <li key={index}>
                <a
                  href={href}
                  className="text-cream hover:text-white transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl text-white mb-4">Contact</h3>
          <ul className="space-y-3">
            {[
              {
                Icon: MapPin,
                text: '123 Rue du Don, 75001 Paris',
                href: 'https://maps.google.com/?q=123+Rue+du+Don,+75001+Paris'
              },
              {
                Icon: Phone,
                text: '+33 1 23 45 67 89',
                href: 'tel:+33123456789'
              },
              {
                Icon: Mail,
                text: 'contact@bloodlink.fr',
                href: 'mailto:contact@bloodlink.fr'
              }
            ].map(({ Icon, text, href }, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Icon size={20} className="text-white" />
                <a
                  href={href}
                  className="text-cream hover:text-white transition-colors"
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
        <p>&copy; 2025 BloodLink. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
