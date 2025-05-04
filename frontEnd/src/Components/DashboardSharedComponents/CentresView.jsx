import React, { useEffect, useState, useRef } from 'react';
import { useCenter } from '../../Context/CenterContext';
import { FaMapMarkerAlt, FaHeart, FaStethoscope, FaUsers, FaSearch, FaSpinner, FaClock, FaPhoneAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';


const CentresView = () => {
  const { centers, getCenters, searchCenters } = useCenter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getCenters(currentPage);
      setIsLoading(false);
    };
    
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length >= 1) {
        setIsSearching(true);
        try {
          const results = await searchCenters(searchTerm);
          setSuggestions(results);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        } finally {
          setIsSearching(false);
        }
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (searchTerm.length >= 1) {
        fetchSuggestions();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    
    if (!isLoading && centers && mapRef.current && !mapInstanceRef.current) {
      import('leaflet').then((L) => {
        mapInstanceRef.current = L.map(mapRef.current).setView([33.5731, -7.5898], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstanceRef.current);

        markersLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);

        addCentersToMap();
      });
    }


    console.log(centers);
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLoading, centers]);


  useEffect(() => {
    if (mapInstanceRef.current && markersLayerRef.current && !isLoading) {
      addCentersToMap();
    }
  }, [searchTerm, suggestions]);

  const addCentersToMap = () => {
    if (!markersLayerRef.current) return;
    
    import('leaflet').then((L) => {
     
      markersLayerRef.current.clearLayers();
      
      
      const centersToShow = searchTerm.length >= 1 ? suggestions : (centers ? centers.data : []);
      
      const iconHtml = renderToString(
        <div className="text-burgundy" style={{ fontSize: '24px' }}>
          <FaMapMarkerAlt />
        </div>
      );
      

      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: iconHtml,
        iconSize: [24, 24],
        iconAnchor: [14, 28], 
        popupAnchor: [0, -28] 
      });

      centersToShow.forEach(center => {
        if (center.localisation && center.localisation.latitude && center.localisation.longitude) {
          const marker = L.marker(
            [parseFloat(center.localisation.latitude), parseFloat(center.localisation.longitude)],
            { icon: customIcon }
          ).bindPopup(`
            <div class="text-center p-2">
              <h3 class="font-bold text-burgundy">${center.name}</h3>
              <p class="text-sm">${center.localisation.address}</p>
              <p class="text-sm mt-1">${center.hours || 'Horaires non disponibles'}</p>
            </div>
          `);
          
          markersLayerRef.current.addLayer(marker);
        }
      });
      
      if (centersToShow.length > 0 && centersToShow.length !== (centers ? centers.data.length : 0)) {
        const bounds = markersLayerRef.current.getBounds();
        if (bounds && bounds.isValid()) {
          mapInstanceRef.current.fitBounds(bounds);
        }
      }
    });
  };

  const focusOnCenter = (center) => {
    if (mapInstanceRef.current && center.localisation) {
      const lat = parseFloat(center.localisation.latitude);
      const lng = parseFloat(center.localisation.longitude);
      
      if (!isNaN(lat) && !isNaN(lng)) {
        mapInstanceRef.current.setView([lat, lng], 15);
        
        import('leaflet').then((L) => {
          markersLayerRef.current.eachLayer((layer) => {
            const markerLatLng = layer.getLatLng();
            if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
              layer.openPopup();
            }
          });
        });

        document.getElementById('centers-map').scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (isLoading || !centers) {
    return (
      <div className="p-8 w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-lg">Chargement des centres...</p>
      </div>
    </div>
    );
  }


  const handleSearch = (e) => {
    const value = e.target.value.trim();
    setSearchTerm(value);
  };
  

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    setSuggestions([]);
  };
  
  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion.name);
    setShowSuggestions(false);
    
 
    if (suggestion.localisation) {
      focusOnCenter(suggestion);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {

    if (searchTerm.length >= 1) return null;
    
    const totalPages = centers.last_page || 1;
    const pages = [];

    pages.push(
      <div 
        key={1}
        onClick={() => handlePageChange(1)}
        className={`w-10 h-10 flex justify-center items-center rounded-lg cursor-pointer ${
          currentPage === 1 ? 'bg-burgundy text-white' : 'hover:bg-gray-200'
        }`}
      >
        1
      </div>
    );

    if (currentPage > 3) {
      pages.push(
        <div key="ellipsis1" className="w-10 h-10 flex justify-center items-center rounded-lg">
          ...
        </div>
      );
    }


    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= 1 || i >= totalPages) continue;
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

    if (currentPage < totalPages - 2) {
      pages.push(
        <div key="ellipsis2" className="w-10 h-10 flex justify-center items-center rounded-lg">
          ...
        </div>
      );
    }

    if (totalPages > 1) {
      pages.push(
        <div
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`w-10 h-10 flex justify-center items-center rounded-lg cursor-pointer ${
            currentPage === totalPages ? 'bg-burgundy text-white' : 'hover:bg-gray-200'
          }`}
        >
          {totalPages}
        </div>
      );
    }

    return pages;
  };
  

  const benefits = [
    {
      id: 1,
      icon: <FaHeart />,
      title: "Sauver des vies",
      description: "Un seul don de sang peut sauver jusqu'à 3 vies. Votre geste est précieux et irremplaçable."
    },
    {
      id: 2,
      icon: <FaStethoscope />,
      title: "Check-up gratuit",
      description: "Chaque don s'accompagne d'un bilan de santé gratuit, incluant la vérification de votre groupe sanguin et d'autres paramètres."
    },
    {
      id: 3,
      icon: <FaUsers />,
      title: "Aider votre communauté",
      description: "Votre don aide directement les personnes dans votre communauté qui ont besoin de transfusions sanguines d'urgence."
    }
  ];


  const renderCentersList = () => {
    if (searchTerm.length >= 1 && isSearching) {
      return (
        <div className="col-span-3 bg-white rounded-lg p-8 text-center">
          <FaSpinner className="text-wine text-4xl mb-4 mx-auto animate-spin" />
          <h3 className="text-xl text-burgundy font-semibold mb-2">Recherche en cours...</h3>
          <p className="text-darkteal">Veuillez patienter pendant que nous recherchons "{searchTerm}"</p>
        </div>
      );
    }
    
    if (searchTerm.length >= 1 && suggestions.length > 0) {
      return suggestions.map(center => (
        <div key={center.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-gray-200 hover:border-teal">
          <img src={center.profile_image} alt={center.name} className="w-full h-48 object-cover" />
          <div className="p-6">
            <h3 className="text-xl font-semibold text-burgundy mb-2">{center.name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${
                center.status === 'open' ? 'bg-green-500' : 
                center.status === 'closing' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className={
                center.status === 'open' ? 'text-green-500' : 
                center.status === 'closing' ? 'text-yellow-500' : 'text-red-500'
              }>{center.statusText || 'Ouvert'}</span>
            </div>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2 text-darkteal">
                <FaMapMarkerAlt className="text-wine" />
                <span>{center.localisation ? center.localisation.address : center.address}</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-darkteal">
                <FaClock className="text-wine" />
                <span>{center.hours || '08:00 - 18:00'}</span>
              </div>
              <div className="flex items-center gap-2 mb-2 text-darkteal">
                <FaPhoneAlt className="text-wine" />
                <span>{center.phone || '+212 5xx-xxxxxx'}</span>
              </div>
            </div>

          </div>
        </div>
      ));
    }

    if (searchTerm.length >= 1 && suggestions.length === 0 && !isSearching) {
      return (
        <div className="col-span-3 bg-white rounded-lg p-8 text-center">
          <FaSearch className="text-wine text-4xl mb-4 mx-auto" />
          <h3 className="text-xl text-burgundy font-semibold mb-2">Aucun centre ne correspond à votre recherche</h3>
          <p className="text-darkteal">Essayez avec d'autres termes ou réinitialisez la recherche</p>
          <button 
            onClick={clearSearch}
            className="mt-4 bg-burgundy hover:bg-wine text-white py-2 px-4 rounded-lg transition-all duration-300"
          >
            Réinitialiser la recherche
          </button>
        </div>
      );
    }
    
    return centers.data.map(center => (
      <div key={center.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-gray-200 hover:border-teal">
        <img src={center.profile_image} alt={center.name} className="w-full h-48 object-cover" />
        <div className="p-6">
          <h3 className="text-xl font-semibold text-burgundy mb-2">{center.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full ${
              center.status === 'open' ? 'bg-green-500' : 
              center.status === 'closing' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className={
              center.status === 'open' ? 'text-green-500' : 
              center.status === 'closing' ? 'text-yellow-500' : 'text-red-500'
            }>{center.statusText || 'Ouvert'}</span>
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2 text-darkteal">
              <FaMapMarkerAlt className="text-wine" />
              <span>{center.localisation ? center.localisation.address : center.address}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-darkteal">
              <FaClock className="text-wine" />
              <span>{center.hours || '08:00 - 18:00'}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-darkteal">
              <FaPhoneAlt className="text-wine" />
              <span>{center.phone || '+212 5xx-xxxxxx'}</span>
            </div>
          </div>

        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-lightGray">

          <div className="mb-8 flex items-center gap-4">
            <div ref={searchRef} className="relative flex-grow">
              <div className="flex items-center bg-white rounded-lg p-3 shadow-md">
                <FaSearch className="text-gray-400 mr-3" />
                <input 
                  type="text" 
                  className="border-none outline-none w-full" 
                  placeholder="Rechercher un centre par nom ou par localité..."
                  value={searchTerm}
                  onChange={handleSearch}
                  onFocus={() => searchTerm.length >= 1 && setShowSuggestions(true)}
                />
                {searchTerm && (
                  <button 
                    onClick={clearSearch} 
                    className="text-gray-400 hover:text-burgundy"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {showSuggestions && searchTerm.length >= 1 && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  {isSearching ? (
                    <div className="p-4 text-center text-gray-500 flex items-center justify-center gap-2">
                      <FaSpinner className="animate-spin" />
                      Recherche en cours...
                    </div>
                  ) : suggestions.length > 0 ? (
                    <ul>
                      {suggestions.map((suggestion) => (
                        <li 
                          key={suggestion.id}
                          className="p-3 hover:bg-lightGray cursor-pointer border-b border-gray-100 last:border-none"
                          onClick={() => handleSelectSuggestion(suggestion)}
                        >
                          <div className="font-medium text-burgundy">{suggestion.name}</div>
                          {suggestion.localisation && (
                            <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <FaMapMarkerAlt className="text-wine text-xs" />
                              {suggestion.localisation.address}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Aucune suggestion trouvée
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
          
          {/* Map View with Leaflet */}
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal to-wine"></div>
                <h3 className="text-xl font-semibold text-burgundy">Carte des Centres</h3>
              </div>
              <div 
                ref={mapRef} 
                className="h-96 w-full z-10"
                id="centers-map"
              ></div>
              <div className="p-4 bg-lightGray text-center text-sm text-darkteal">
                <p>Cliquez sur un centre sur la carte pour plus d'informations ou utilisez le bouton 
                  <FaMapMarkerAlt className="inline-block text-wine mx-1" /> 
                  sur un centre ci-dessous pour localiser
                </p>
              </div>
            </div>
          </div>
          
          {/* Centers/Suggestions List */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {renderCentersList()}
          </div>
          
          {/* Pagination - Only show when not searching */}
          {!searchTerm && (
            <div className="flex justify-center items-center gap-2 my-8">
              <div 
                className={`w-10 h-10 flex justify-center items-center rounded-lg ${
                  currentPage > 1 
                    ? 'cursor-pointer bg-lightGray border border-gray-200 hover:bg-gray-200' 
                    : 'cursor-not-allowed bg-gray-100 text-gray-400'
                }`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              >
                <FaChevronLeft />
              </div>
              
              {renderPagination()}
              
              <div
                className={`w-10 h-10 flex justify-center items-center rounded-lg ${
                  currentPage < centers.last_page
                    ? 'cursor-pointer bg-lightGray border border-gray-200 hover:bg-gray-200' 
                    : 'cursor-not-allowed bg-gray-100 text-gray-400'
                }`}
                onClick={() => currentPage < centers.last_page && handlePageChange(currentPage + 1)}
              >
                <FaChevronRight />
              </div>
            </div>
          )}
          
          {/* Why Donate Section */}
          <section className="bg-white rounded-lg p-8 mb-8 shadow-md text-center">
            <h2 className="flex flex-col items-center text-2xl text-burgundy font-bold mb-6 relative pb-2">
              Pourquoi Donner son Sang?
              <span className=" w-20 h-1 bg-gradient-to-r from-teal to-wine"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map(benefit => (
                <div key={benefit.id} className="bg-lightGray rounded-lg p-6 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-4xl text-wine mb-4 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl text-burgundy font-semibold mb-2">{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

    </div>
  );
};

export default CentresView;