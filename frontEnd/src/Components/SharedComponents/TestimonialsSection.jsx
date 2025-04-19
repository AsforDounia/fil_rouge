import React, { useEffect, useState } from 'react';
import { useTestimonial } from '../../Context/TestimonialContexte';
import { FaArrowCircleLeft , FaArrowCircleRight  } from "react-icons/fa";
const TestimonialsSection = () => {
  const { getTestimonials, testimonials } = useTestimonial();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        await getTestimonials(currentPage);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }


  const lastPage = testimonials.last_page || 1;
  const currentPageFromData = testimonials.current_page || 1;

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
          {testimonials.data && testimonials.data.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <p className="text-gray-600 italic mb-6">
                {testimonial.contenu}
              </p>
              <div className="flex-1">
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-burgundy">
                    {testimonial.user.name}
                  </h4>
                  <p className="text-gray-500 capitalize">
                    {testimonial.user.roles[0].name.replace(/_/g, ' ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
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
              {/* Suivant */}
              <FaArrowCircleRight />
              
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;