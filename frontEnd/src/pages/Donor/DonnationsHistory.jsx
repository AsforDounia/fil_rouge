import { useEffect, useState } from 'react';
import { 
  FaEye, 
  FaDownload, 
  FaChevronLeft, 
  FaChevronRight, 
  FaCheck, 
  FaTint, 
  FaHeart, 
  FaCalendarCheck, 
  FaArrowCircleLeft,
  FaArrowCircleRight
} from 'react-icons/fa';
import { useDonation } from '../../Context/DonationContext';

export default function BloodDonationDashboard() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);

  const {getDonations , donations} = useDonation();

  useEffect(()=>{
    const fetchData = async () =>{
            await getDonations();
        
    }
    fetchData();
  },[]);





  if(!donations){
      return <div>loading ...</div>
    }


    const handleDownload = async () => {

    }


    const lastPage = donations.last_page || 1;
    const currentPageFromData = donations.current_page || 1;
  
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= lastPage) {
        setCurrentPage(newPage);
      }
    };
    console.log("donations : ",donations);
  return (
    <div className="max-w-6xl mx-auto p-4 font-sans text-gray-800">

      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <h3 className="text-xl font-bold mb-4 md:mb-0">Mes Dons de Sang</h3>

          </div>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Type de Don</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Centre</th>
                  {/* <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {donations.data.map((donation, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">{donation.donation_date}</td>
                    <td className="py-4 px-4">{donation.type_don}</td>
                    <td className="py-4 px-4">{donation.centre.name}</td>
                    {/* <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button onClick={handleDownload} className="p-1 text-gray-600 hover:text-blue-600 cursor-pointer">
                          <FaDownload size={16} />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <nav className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPageFromData - 1)}
              disabled={currentPageFromData <= 1}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPageFromData <= 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-burgundy text-white hover:bg-wine cursor-pointer '
              }`}
            >
              <FaArrowCircleLeft />
            </button>

            <div className="flex mx-2">
              {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 mx-1 rounded-full flex items-center justify-center cursor-pointer ${
                    page === currentPageFromData
                      ? 'bg-burgundy text-white '
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPageFromData + 1)}
              disabled={currentPageFromData >= lastPage}
              className={`px-4 py-2 mx-1 rounded-md ${
                currentPageFromData >= lastPage
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-burgundy text-white hover:bg-wine cursor-pointer'
              }`}
            >
              <FaArrowCircleRight />
            </button>
          </nav>
        </div>
        </div>
      </div>


    </div>
  );
}