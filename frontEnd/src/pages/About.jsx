import React from 'react';

import { FaGlobe, FaHeart } from 'react-icons/fa';
import TestimonialsSection from '../Components/SharedComponents/TestimonialsSection';



const About = () => {
  return (
        <div className="w-full max-w-7xl mx-auto px-8 py-8">
            {/* introduction section */}
          <section className="bg-burgundy text-white rounded-lg px-8 py-16 mb-12 text-center">
            <h1 className="text-5xl mb-6 font-bold">Notre Mission : Sauver des Vies</h1>
            <p className="max-w-3xl mx-auto mb-8 leading-relaxed text-cream">
              BloodLink est né de la conviction que chaque don de sang peut faire la différence.
              Nous travaillons sans relâche pour connecter les donneurs avec ceux qui en ont le plus besoin,
              en transformant la générosité en un acte de solidarité concret.
            </p>
          </section>

          {/* Mission Section */}
          <section className="bg-white rounded-lg p-12 mb-12 shadow-lg">
            <h2 className="font-bold text-4xl text-burgundy mb-8 text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-gradient-to-r after:from-teal after:to-wine">
              Notre Mission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="leading-loose text-gray-600">
                <p className="mb-4">
                  Notre mission est de créer un écosystème simple et efficace pour le don de sang.
                  Nous croyons que chaque individu a le pouvoir de sauver des vies en faisant un don.
                  BloodLink simplifie le processus de don, en supprimant les barrières bureaucratiques
                  et en rapprochant directement les donneurs des patients.
                </p>
                <p>
                  Nous nous engageons à sensibiliser le public, à faciliter les dons et à garantir
                  que chaque unité de sang trouve rapidement le patient qui en a besoin.
                </p>
              </div>
              <div className="text-6xl text-wine text-center">
                <FaHeart />
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="bg-white rounded-lg p-12 mb-12 shadow-lg">
            <h2 className="font-bold text-4xl text-burgundy mb-8 text-center relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-gradient-to-r after:from-teal after:to-wine">
              Notre Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-6xl text-wine text-center order-last md:order-first">
                <FaGlobe />
              </div>
              <div className="leading-loose text-gray-600">
                <p className="mb-4">
                  Notre vision est de créer un réseau national de solidarité où le don de sang devient un réflexe citoyen.
                  Nous aspirons à réduire les pénuries de sang, à améliorer les délais de transfusion
                  et à développer une culture de partage et d'entraide.
                </p>
                <p>
                  À long terme, nous voulons utiliser la technologie pour rendre le processus de don plus transparent,
                  plus accessible et plus impactant pour tous.
                </p>
              </div>
            </div>
          </section>

            <TestimonialsSection />

        </div>

  );
};

export default About;
