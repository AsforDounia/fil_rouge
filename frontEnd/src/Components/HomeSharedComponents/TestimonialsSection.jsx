import React, { useEffect, useState } from 'react';
import { useTestimonial } from '../../Context/TestimonialContexte';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { toast } from "react-toastify";

const TestimonialsSection = () => {
  const { getTestimonials, testimonials } = useTestimonial();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [localTestimonials, setLocalTestimonials] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      try {
        await getTestimonials(currentPage);
      } catch (error) {
        toast.error("Error fetching testimonials: " + (error.message || error));
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, [currentPage, getTestimonials]);

  // Store testimonials data locally when it's available
  useEffect(() => {
    if (testimonials && testimonials.data) {
      setLocalTestimonials(testimonials);
    }
  }, [testimonials]);

  if (loading && !localTestimonials) {
    return (
      <div className="p-8 w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-lg">Chargement des testimonials...</p>
      </div>
    </div>
    )
  }

  // Fall back to locally stored data if testimonials becomes unavailable
  const displayTestimonials = localTestimonials || { data: [], current_page: 1, last_page: 1 };

  // Check if we have data to display
  if (!displayTestimonials.data || displayTestimonials.data.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">No testimonials found.</p>
      </div>
    );
  }
  
  const lastPage = displayTestimonials.last_page || 1;
  const currentPageFromData = displayTestimonials.current_page || 1;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-burgundy mb-12 relative">
          Ce que disent nos utilisateurs
          <span className="absolute top-6 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-teal to-wine mt-8"></span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {displayTestimonials.data.map((testimonial, index) => (
            <div
              key={testimonial.id || index}
              className="flex flex-col bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="text-gray-600 italic mb-6">
                {testimonial.contenu}
              </p>
              <div className="flex-1"></div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-burgundy">
                    {testimonial.user && testimonial.user.name ? testimonial.user.name : "Anonymous"}
                  </h4>
                  <p className="text-gray-500 capitalize">
                    {testimonial.user && testimonial.user.roles && testimonial.user.roles[0] && testimonial.user.roles[0].name 
                      ? testimonial.user.roles[0].name.replace(/_/g, ' ') 
                      : "User"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls - Only show if we have more than one page */}
        {lastPage > 1 && (
          <div className="flex justify-center mt-12">
            <nav className="flex items-center">
              <button 
                onClick={() => handlePageChange(currentPageFromData - 1)}
                disabled={currentPageFromData <= 1}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPageFromData <= 1 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-burgundy text-white hover:bg-wine cursor-pointer'
                }`}
                aria-label="Previous page"
              >
                <FaArrowCircleLeft />
              </button>
              
              <div className="flex mx-2">
                {Array.from({ length: lastPage }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 mx-1 rounded-full flex items-center justify-center cursor-pointer ${
                      page === currentPageFromData
                        ? 'bg-burgundy text-white '
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 '
                    }`}
                    aria-label={`Page ${page}`}
                    aria-current={page === currentPageFromData ? 'page' : undefined}
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
                aria-label="Next page"
              >
                <FaArrowCircleRight />
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;