import React, { useEffect } from "react";
// import { MapPin, Heart, Hospital, Droplet } from "lucide-react";
import { FaMapMarkerAlt, FaHeart, FaHospital, FaTint } from "react-icons/fa";
import { useStats } from "../../Context/StatsContext";

const StatsSection = () => {
  const { stats, getStats } = useStats();

  useEffect(() => {
    getStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  // console.log(stats.sats.countDonations);

  const statistics = [
    {
      icon: <FaHeart className="text-wine" size={48} />,
      number: stats.countUserDonor,
      title: "Donneurs Actifs",
    },
    {
      icon: <FaHospital className="text-wine" size={48} />,
      number: stats.countUserPatient,
      title: "Patients Accompagnés",
    },
    {
      icon: <FaMapMarkerAlt className="text-wine" size={48} />,
      number: stats.countCenters,
      title: "Centres de Don",
    },
    {
      icon: <FaTint className="text-wine" size={48} />,
      number: stats.countDonations,
      title: "Dons par An",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          
          <div
            key={index}
            className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-center mb-4">{stat.icon}</div>
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
