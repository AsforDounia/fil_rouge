import React from 'react';
// import { ArrowRight } from 'lucide-react';
import { FaArrowRight } from "react-icons/fa";

import { FaMapLocationDot , FaHandHoldingDroplet , FaHospitalUser } from "react-icons/fa6";

const FeaturesSection = () => {
    const features = [
      {
        title: 'Localisez un centre',
        description: 'Trouvez rapidement le centre de don de sang le plus proche de chez vous grâce à notre système de géolocalisation avancé.',
        image: FaMapLocationDot,
        espace: 'Trouver un centre',
        link : '/centre'
      },
      {
        title: 'Suivez vos dons',
        description: 'Gardez une trace de votre historique de don, recevez des rappels et découvrez l\'impact de vos contributions.',
        image: FaHandHoldingDroplet,
        espace: 'S\'incrire',
        link : 'register'

      },
      {
        title: 'Suivi patient personnalisé',
        description: 'Accédez à votre dossier personnalisé, suivez vos besoins en transfusion et restez en contact avec les centres hospitaliers.',
        image: FaHospitalUser,
        espace: 'S\'incrire',
        link : 'register'

      }
    ];

    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-burgundy mb-12 relative">
            Comment BloodLink vous accompagne
            <span className="absolute top-6 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-teal to-wine mt-8"></span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center text-center p-16 text-wine bg-gradient-to-r from-teal to-darkTeal overflow-hidden">
                    <feature.image className='text-7xl'/>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-burgundy mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <a
                    href={feature.link}
                    className="text-darkTeal font-semibold flex items-center hover:text-teal transition-colors"
                  >
                    {feature.espace}
                    <FaArrowRight className="ml-2" size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default FeaturesSection;
