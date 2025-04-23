import React, { useEffect, useState } from "react";
// import { MapPin, Heart, Hospital, Droplet } from "lucide-react";
import { FaMapMarkerAlt, FaHeart, FaHospital, FaTint } from "react-icons/fa";
import { useStats } from "../../Context/StatsContext";
import { toast } from "react-toastify";
const StatsSection = () => {

  const [loading, setLoading] = useState(true);
  const { stats, getStats } = useStats();


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await getStats();
      } catch (error) {
        toast.error("Error fetching events :" + error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }


  const statistics = [
    {
      icon: <FaHeart className="text-wine" size={48} />,
      number: stats.countDonors,
      title: "Donneurs Actifs",
    },
    {
      icon: <FaHospital className="text-wine" size={48} />,
      number: stats.countPatients,
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
