import React from 'react';
import {
  MapPin,
  Heart,
  Hospital,
  Droplet,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const HeroSection = () => {
    return (
      <section className="bg-burgundy text-white py-16 px-8 mt-16 mx-48 rounded-2xl">
        <div className="flex flex-col justify-center items-center space-y-8 max-w-[800px] mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Unir Donneurs et Patients, Sauver des Vies
            </h1>
            <p className="text-cream text-xl">
              BloodLink facilite les dons de sang en mettant directement en relation les patients et les donneurs compatibles
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <button className="bg-teal text-white px-6 py-3 rounded-lg hover:bg-darkTeal transition-colors">
                Je veux donner
              </button>
              <button className="bg-wine text-white px-6 py-3 rounded-lg hover:bg-burgundy transition-colors">
                Je suis patient
              </button>
            </div>
        </div>
      </section>
    );
};

export default HeroSection;
