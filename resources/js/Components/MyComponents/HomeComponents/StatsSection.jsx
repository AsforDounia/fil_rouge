import React from 'react';
import {
  MapPin,
  Heart,
  Hospital,
  Droplet,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const StatsSection = () => {
    const stats = [
      {
        icon: <Heart className="text-wine" size={48} />,
        number: '25,000+',
        title: 'Donneurs Actifs'
      },
      {
        icon: <Hospital className="text-wine" size={48} />,
        number: '15,000+',
        title: 'Patients Accompagnés'
      },
      {
        icon: <MapPin className="text-wine" size={48} />,
        number: '150+',
        title: 'Centres de Don'
      },
      {
        icon: <Droplet className="text-wine" size={48} />,
        number: '40,000+',
        title: 'Dons par An'
      }
    ];

    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <h2 className="text-3xl font-bold text-burgundy mb-2">
                {stat.number}
              </h2>
              <p className="text-darkTeal">{stat.title}</p>
            </div>
          ))}
        </div>
      </section>
    );
};

export default StatsSection;
