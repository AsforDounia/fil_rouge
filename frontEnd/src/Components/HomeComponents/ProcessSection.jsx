import React from 'react';


const ProcessSection = () => {
    const steps = [
      {
        number: '1',
        title: 'Inscription',
        description: 'Créez votre compte et remplissez le questionnaire de santé préliminaire en ligne.'
      },
      {
        number: '2',
        title: 'Entretien',
        description: 'Rencontrez un professionnel de santé pour un bref entretien confidentiel.'
      },
      {
        number: '3',
        title: 'Don',
        description: 'Le prélèvement dure environ 10 minutes dans un environnement confortable et sécurisé.'
      },
      {
        number: '4',
        title: 'Repos',
        description: 'Profitez d\'une collation et d\'une boisson pour vous reposer avant de repartir.'
      }
    ];

    return (
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto rounded-lg p-12 mb-12 shadow-md bg-white">
          <h2 className="text-4xl font-bold text-center text-burgundy mb-12 relative">
            Le processus de don en 4 étapes
            <span className="absolute top-6 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-teal to-wine mt-8"></span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center relative pb-8 md:pb-0"
              >
                <div className="w-16 h-16 bg-burgundy text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-burgundy mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-[-2rem] w-16 h-1 bg-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
};

export default ProcessSection;
