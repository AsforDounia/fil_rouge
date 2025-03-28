import React from 'react';
import {
  MapPin,
  Heart,
  Hospital,
  Droplet,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: '"Grâce à BloodLink, j\'ai pu trouver un donneur compatible en moins d\'une heure lors d\'une urgence. Cette plateforme sauve littéralement des vies!"',
      name: 'Sophie M.',
      role: 'Patient'
    },
    {
      quote: '"En tant que donneur régulier, BloodLink me permet de savoir exactement quand et où mon sang est nécessaire. C\'est gratifiant de voir l\'impact direct de mes dons."',
      name: 'Thomas L.',
      role: 'Donneur'
    },
    {
      quote: '"L\'interface est intuitive et le processus est transparent. BloodLink a révolutionné la façon dont nous gérons les besoins en sang dans les hôpitaux."',
      name: 'Martin R.',
      role: 'Donneur'
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-burgundy mb-12 relative">
          Ce que disent nos utilisateurs
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-teal to-wine mt-2"></span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="text-gray-600 italic mb-6">
                {testimonial.quote}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-burgundy">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
