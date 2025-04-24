import { useEffect, useState, useRef } from 'react';
import { FaFillDrip, FaLayerGroup, FaTint } from 'react-icons/fa';
import { useAppointment } from '../../Context/AppointmentContext';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function CreateAppointment() {
    const { appointmentFileds, getAppointmentFileds, getUnavailbleDates, unavailbleDates } = useAppointment();
    const [loading, setLoading] = useState(true);
    const  [dateArray ,setDateArray ] = useState([]);
    const calendarRef = useRef(null);
    const [formData, setFormData] = useState({
        donationType: 'sang_total',
        donationDate: '',
        donationCentre: '',
        centre_id: ''
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
        }
        fetchData();
    }, []);

    const handleDonationTypeSelect = (type) => {
        setFormData({ ...formData, donationType: type });
    };

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleChangeCentre = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const selectedCentre = selectedOption.value;
        const centreId = selectedOption.getAttribute('data-id');
        
        setFormData({ 
            ...formData, 
            donationCentre: selectedCentre,
            centre_id: centreId,
            donationDate: '' // Reset date when center changes
        });
        
        getUnavailbleDates(centreId);
    };

    const handleDateSelect = (info) => {
        const selectedDate = info.dateStr;
        setFormData({ ...formData, donationDate: selectedDate });
    };

    const dayCellClassNames = (arg) => {
        const formattedDate = arg.date.toISOString().split('T')[0];
        
        // setDateArray([...dateArray, formattedDate]);
        // console.log(dateArray);
        console.log("formattedDate : ",formattedDate);
        console.log("unavailbleDates : ",unavailbleDates);
        if (Array.isArray(unavailbleDates) && unavailbleDates.includes(formattedDate)) {
            console.log("hanaaaaaaaaaaaaaaaaaaa");
            return ['fc-day-disabled'];
        }
        
        return [];
    };

    const selectAllow = (selectInfo) => {
        const selectedDate = selectInfo.start.toISOString().split('T')[0];
        return !(Array.isArray(unavailbleDates) && unavailbleDates.includes(selectedDate));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    if (loading) {
        return <div>loading...</div>
    }
    
    const donationOptions = [
        {
            key: 'sang_total',
            icon: <FaTint />,
            title: 'Don de sang total',
            description: 'Don classique de sang complet',
            duration: '45-60 minutes',
            frequency: 'Tous les 56 jours',
        },
        {
            key: 'plasma',
            icon: <FaFillDrip />,
            title: 'Don de plasma',
            description: 'Don de la partie liquide du sang',
            duration: '1h30-2h',
            frequency: 'Tous les 28 jours',
        },
        {
            key: 'plaquettes',
            icon: <FaLayerGroup />,
            title: 'Don de plaquettes',
            description: 'Don des composants responsables de la coagulation',
            duration: '2h-2h30',
            frequency: 'Tous les 14 jours',
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
                        <label className="block mb-4 font-medium text-burgundy">Choisissez le type de don</label>
                        {donationOptions.map((option) => (
                            <div
                                key={option.key}
                                className={`border rounded-lg p-4 mb-4 cursor-pointer transition-all ${
                                    formData.donationType === option.key
                                        ? 'border-teal bg-[#40898a11]'
                                        : 'border-gray-200 hover:border-teal'
                                }`}
                                onClick={() => handleDonationTypeSelect(option.key)}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center">
                                        {option.icon}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-burgundy">{option.title}</div>
                                        <div className="text-gray-500 text-sm">{option.description}</div>
                                    </div>
                                </div>
                                <div className="flex text-sm mt-3">
                                    <div className="flex items-center mr-6">
                                        <i className="fas fa-clock text-teal mr-1"></i>
                                        <span>{option.duration}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <i className="fas fa-calendar-day text-teal mr-1"></i>
                                        <span>{option.frequency}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Date & Location */}
                <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                    <div className="h-1 bg-gradient-to-r from-teal to-wine"></div>
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-burgundy">La date et le lieu</h3>
                    </div>
                    <div className="p-6">
                        <label className="block mb-4 font-medium text-burgundy">Sélectionner une date et un lieu</label>

                        <div className="mb-4">
                            <label className="block mb-2 text-gray-700 font-medium">Centre</label>
                            <select
                                className="w-full border px-3 py-2 rounded"
                                value={formData.donationCentre}
                                onChange={handleChangeCentre}
                            >
                                <option value="">Choisissez un centre</option>
                                {appointmentFileds.centres && appointmentFileds.centres.map((centre) => (
                                    <option 
                                        key={centre.id} 
                                        value={centre.name}
                                        data-id={centre.id}
                                    >
                                        {centre.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {formData.centre_id && (
                            <div className="mb-4">
                                <label className="block mb-2 text-gray-700 font-medium">Date</label>
                                <div className="calendar-container">
                                    <style>
                                        {`
                                        .fc-day-disabled {
                                            background-color: #f5f5f5;
                                            color: #ccc;
                                            cursor: not-allowed;
                                            text-decoration: line-through;
                                        }
                                        .fc .fc-daygrid-day.fc-day-selected {
                                            background-color: #40898a33;
                                        }
                                        .fc .fc-button-primary {
                                            background-color: #40898a;
                                            border-color: #40898a;
                                        }
                                        .fc-daygrid-day-number {
                                            cursor: pointer;
                                        }
                                        .fc-day-today {
                                            background-color: rgba(64, 137, 138, 0.1) !important;
                                        }
                                        `}
                                    </style>
                                    <FullCalendar
                                        ref={calendarRef}
                                        plugins={[dayGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        headerToolbar={{
                                            left: 'prev,next today',
                                            center: 'title',
                                            right: ''
                                        }}
                                        selectable={true}
                                        selectMirror={true}
                                        dayMaxEvents={true}
                                        dayCellClassNames={dayCellClassNames}
                                        selectAllow={selectAllow}
                                        dateClick={handleDateSelect}
                                        validRange={{
                                            start: new Date().toISOString().split('T')[0]
                                        }}
                                        datesSet={() => {
                                            if (formData.donationDate) {
                                                setTimeout(() => {
                                                    const dateElements = document.querySelectorAll('.fc-daygrid-day');
                                                    dateElements.forEach(el => {
                                                        const dataDate = el.getAttribute('data-date');
                                                        if (dataDate === formData.donationDate) {
                                                            el.classList.add('fc-day-selected');
                                                        } else {
                                                            el.classList.remove('fc-day-selected');
                                                        }
                                                    });
                                                }, 0);
                                            }
                                        }}
                                    />
                                </div>
                                {formData.donationDate && (
                                    <div className="mt-2 text-teal">
                                        Date sélectionnée: {new Date(formData.donationDate).toLocaleDateString('fr-FR')}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Confirmation */}
                <section className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                    <div className="h-1 bg-gradient-to-r from-teal to-wine"></div>
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-burgundy">Confirmation du rendez-vous</h3>
                    </div>
                    <div className="p-6">
                        <p className="mb-2">
                            <strong>Type de don :</strong> {formData.donationType}
                        </p>
                        <p className="mb-2">
                            <strong>Date :</strong>{' '}
                            {formData.donationDate
                                ? new Date(formData.donationDate).toLocaleDateString('fr-FR')
                                : 'Non sélectionnée'}
                        </p>
                        <p className="mb-4">
                            <strong>Centre :</strong> {formData.donationCentre || 'Non sélectionné'}
                        </p>
                    </div>
                </section>

                <div className="w-full flex justify-end">
                    <button
                        type="submit"
                        className="btn btn-primary bg-teal text-white px-4 py-2 rounded hover:bg-darkteal"
                        disabled={!formData.donationDate || !formData.centre_id}
                    >
                        Confirmer
                    </button>
                </div>
            </form>
        </div>
    );
}