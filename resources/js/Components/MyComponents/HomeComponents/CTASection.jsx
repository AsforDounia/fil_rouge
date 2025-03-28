import React from 'react';
import {
  MapPin,
  Heart,
  Hospital,
  Droplet,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const CTASection = () => {
    return (
      <section className="bg-darkTeal text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à faire la différence?</h2>
          <p className="text-xl text-cream mb-8 max-w-2xl mx-auto">
            Chaque jour, des centaines de personnes ont besoin de transfusions sanguines. Votre don peut sauver jusqu'à trois vies. Rejoignez notre réseau de donneurs dès aujourd'hui.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-cream text-burgundy px-6 py-3 rounded-lg hover:bg-white transition-colors">
              Trouver un Centre
            </button>
            <button className="border-2 border-cream text-cream px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">
              En Savoir Plus
            </button>
          </div>
        </div>
      </section>
    );
};

export default CTASection;
