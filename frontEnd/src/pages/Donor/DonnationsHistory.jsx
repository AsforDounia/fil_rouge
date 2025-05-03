import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import { useDonation } from '../../Context/DonationContext'; // Assuming you have this context

const DonationsHistory = () => {
  const { donations, getDonations } = useDonation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      setIsLoading(true);
      await getDonations(currentPage);
      setIsLoading(false);
    };
    fetchDonations();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    const totalPages = donations?.last_page || 1;
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <div
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex justify-center items-center rounded-lg cursor-pointer ${
            currentPage === i ? 'bg-burgundy text-white' : 'hover:bg-gray-200'
          }`}
        >
          {i}
        </div>
      );
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center p-8">
        <FaSpinner className="animate-spin text-burgundy text-4xl mb-4" />
        <p className="text-lg text-darkteal">Chargement des dons...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-burgundy text-white">
            <tr>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Quantité</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Centre</th>
            </tr>
          </thead>
          <tbody>
            {donations?.data?.map((donation) => (
              <tr key={donation.id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-4">{donation.donation_date}</td>
                <td className="py-3 px-6">{donation.quantity}</td>
                <td className="py-4 px-4">{donation.type_don}</td>
                <td className="py-4 px-4">{donation.centre.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 flex justify-center items-center rounded-lg hover:bg-gray-200"
          >
            <FaChevronLeft />
          </button>
        )}

        {renderPagination()}

        {donations && currentPage < donations.last_page && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 flex justify-center items-center rounded-lg hover:bg-gray-200"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default DonationsHistory;
