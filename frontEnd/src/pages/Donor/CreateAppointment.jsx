import { useEffect, useState } from "react";
import { FaFillDrip, FaLayerGroup, FaTint } from "react-icons/fa";
import { useAppointment } from "../../Context/AppointmentContext";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useNavigate } from "react-router-dom";

export default function CreateAppointment() {
    const navigate = useNavigate();
  const {
    appointmentFileds,
    getAppointmentFileds,
    getUnavailbleDates,
    unavailbleDates,
    createAppointment,
    getUnavailableTimes,
    unavailbleTimes
  } = useAppointment();
  const [loading, setLoading] = useState(true);
  const [filteredTimes, setFilteredTimes] = useState([]);
  const [selectedDateDate, setSelectedDateDate] = useState(new Date(2025, 4, 28));
  const [disabledDates, setDisabledDates] = useState([]);

  const [formData, setFormData] = useState({
    type_don: "Sang Total",
    appointment_date: "",
    donationCentre: "",
    centre_id: "",
    appointment_time: "",  // Added for appointment time
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAppointmentFileds();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (unavailbleDates && unavailbleDates.dates_unavailable) {
      setDisabledDates(unavailbleDates.dates_unavailable);
    }
  }, [unavailbleDates]);

  // Effect to filter available times when unavailbleTimes changes
  useEffect(() => {
    if (unavailbleTimes) {
      const availableTimes = [
        "09:00:00", "09:15:00", "09:30:00", "09:45:00",
        "10:00:00", "10:15:00", "10:30:00", "10:45:00",
        "11:00:00", "11:15:00", "11:30:00", "11:45:00",
        "14:00:00", "14:15:00", "14:30:00", "14:45:00",
        "15:00:00", "15:15:00", "15:30:00", "15:45:00",
        "16:00:00", "16:15:00", "16:30:00", "16:45:00",
      ];
      
      const filtered = availableTimes.filter(
        (time) => !unavailbleTimes.includes(time)
      );
      
      setFilteredTimes(filtered);
    }
  }, [unavailbleTimes]);

  console.log(unavailbleTimes);
  const handleDonationTypeSelect = (type) => {
    setFormData({ ...formData, type_don: type });
  };

  const handleChangeCentre = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedCentre = selectedOption.value;
    const centreId = selectedOption.getAttribute("data-id");

    setFormData({
      ...formData,
      donationCentre: selectedCentre,
      centre_id: centreId,
      appointment_date: "",
      appointment_time: "",
    });

    getUnavailbleDates(centreId);
  };

  const handleDateSelect = (date) => {
    if (date) {
        const formattedDate =
          date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0');
          
        const dataTime = {
          centre_id: formData.centre_id,
          appointment_date: formattedDate
        };
        
        getUnavailableTimes(dataTime);
        setSelectedDateDate(date);
        setFormData({ ...formData, appointment_date: formattedDate });
      } else {
        setSelectedDateDate(null);
        setFormData({ ...formData, appointment_date: "" });
      }
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, appointment_time: time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await createAppointment(formData);
        navigate("/donneur/appointments");
      } catch (error) {
        console.error(error);
      } 
  };

  if (loading) {
    return <div>loading...</div>;
  }

  const donationOptions = [
    {
      key: "Sang Total",
      icon: <FaTint />,
      title: "Don de sang total",
      description: "Don classique de sang complet",
      frequency: "Tous les 56 jours",
    },
    {
      key: "Plasma",
      icon: <FaFillDrip />,
      title: "Don de plasma",
      description: "Don de la partie liquide du sang",
      frequency: "Tous les 28 jours",
    },
    {
      key: "Globules",
      icon: <FaFillDrip />,
      title: "Don de Globules",
      description: "Don de la partie liquide du sang",
      frequency: "Tous les 28 jours",
    },
    {
      key: "Plaquettes",
      icon: <FaLayerGroup />,
      title: "Don de plaquettes",
      description: "Don des composants responsables de la coagulation",
      frequency: "Tous les 14 jours",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans p-8">
      <form onSubmit={handleSubmit}>
        {/* Donation Type */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="h-1 bg-gradient-to-r from-teal to-wine"></div>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-burgundy">Type de don</h3>
          </div>
          <div className="p-6">
            <label className="block mb-4 font-medium text-burgundy">
              Choisissez le type de don
            </label>
            {donationOptions.map((option) => (
              <div
                key={option.key}
                className={`border rounded-lg p-4 mb-4 cursor-pointer transition-all ${
                  formData.type_don === option.key
                    ? "border-teal bg-[#40898a11]"
                    : "border-gray-200 hover:border-teal"
                }`}
                onClick={() => handleDonationTypeSelect(option.key)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center">
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-burgundy">
                      {option.title}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {option.description}
                    </div>
                  </div>
                </div>
                <div className="flex text-sm mt-3">

                  <div className="flex items-center">
                    <i className="fas fa-calendar-day text-teal mr-1"></i>
                    <span>{option.frequency}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

{/* Quantity Selection */}
<section className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
  <div className="h-1 bg-gradient-to-r from-teal to-wine"></div>
  <div className="p-6 border-b border-gray-200">
    <h3 className="text-xl font-semibold text-burgundy">Quantité</h3>
  </div>
  <div className="p-6">
    <label className="block mb-2 text-gray-700 font-medium">
      Choisissez la quantité
    </label>
    <select
      className="w-full border px-3 py-2 rounded"
      value={formData.quantity}
      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
      required
    >
      {[1, 2, 3, 4, 5].map((q) => (
        <option key={q} value={q}>
          {q}
        </option>
      ))}
    </select>
  </div>
</section>

        {/* Date & Location */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="h-1 bg-gradient-to-r from-teal to-wine"></div>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-burgundy">
              La date et le lieu
            </h3>
          </div>
          <div className="p-6">
            <label className="block mb-4 font-medium text-burgundy">
              Sélectionner une date et un lieu
            </label>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700 font-medium">
                Centre
              </label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={formData.donationCentre}
                onChange={handleChangeCentre}
              >
                <option value="">Choisissez un centre</option>
                {appointmentFileds.centres &&
                  appointmentFileds.centres.map((centre) => (
                    <option key={centre.id} value={centre.name} data-id={centre.id}>
                      {centre.name}
                    </option>
                  ))}
              </select>
            </div>

            {formData.centre_id && (
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 font-medium">Date</label>
                <div className="calendar-container min-w-full">
                  <DayPicker
                    animate
                    mode="single"
                    selected={selectedDateDate}
                    onSelect={handleDateSelect}
                    footer={
                      selectedDateDate
                        ? `Selected: ${selectedDateDate.toLocaleDateString()}`
                        : "Pick a day."
                    }
                    disabled={[
                      { before: new Date() },
                      ...(disabledDates ? disabledDates.map((date) => new Date(date)) : []),
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Time Selection */}
        {formData.appointment_date && (
          <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
            <div className="h-1 bg-gradient-to-r from-teal to-wine"></div>
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-burgundy">Sélectionner l'heure</h3>
            </div>
            <div className="p-6">
              <label className="block mb-2 text-gray-700 font-medium">
                Choisissez une heure
              </label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={formData.appointment_time}
                onChange={(e) => handleTimeSelect(e.target.value)}
              >
                <option value="">Sélectionnez une heure</option>
                {filteredTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </section>
        )}

        {/* Confirmation */}
        <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="h-1 bg-gradient-to-r from-teal to-wine"></div>
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-burgundy">
              Confirmation du rendez-vous
            </h3>
          </div>
          <div className="p-6">
            <p className="mb-2">
              <strong>Type de don :</strong> {formData.type_don}
            </p>
            <p className="mb-2">
              <strong>Quantité :</strong> {formData.quantity}
            </p>
            <p className="mb-2">
              <strong>Date :</strong>{" "}
              {formData.appointment_date
                ? new Date(formData.appointment_date).toLocaleDateString("fr-FR")
                : "Non sélectionnée"}
            </p>
            <p className="mb-2">
              <strong>Heure :</strong> {formData.appointment_time || "Non sélectionnée"}
            </p>
            <p className="mb-4">
              <strong>Centre :</strong>{" "}
              {formData.donationCentre || "Non sélectionné"}
            </p>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex justify-center mb-6">
          <button
            type="submit"
            className="bg-teal text-white px-6 py-3 rounded-lg cursor-pointer"
            disabled={!formData.appointment_time || !formData.appointment_date}
          >
            Confirmer le rendez-vous
          </button>
        </div>
      </form>
    </div>
  );
}