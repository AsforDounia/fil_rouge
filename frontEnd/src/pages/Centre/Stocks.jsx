import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useStock } from '../../Context/StockContext';
import { FaSearch, FaFilter, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { FaDroplet } from "react-icons/fa6";

export default function Stocks() {
  const { stocks, getStocks, addStock, updateStock, deleteStock } = useStock();
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [filters, setFilters] = useState({
    bloodGroup: 'all',
    component: 'all',
  });
  const [showModal, setShowModal] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [formData, setFormData] = useState({
    groupSanguin: '',
    composantSanguin: '',
    quantite: 1
  });

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        await getStocks();
      } catch (error) {
        toast.error("Erreur lors du chargement des stocks: " + error.message);
      }
    };
    fetchStocks();
  }, [getStocks]);

  useEffect(() => {
    if (stocks) {
      let results = [...stocks];
      
      if (filters.bloodGroup !== 'all') {
        results = results.filter(item => item.groupSanguin === filters.bloodGroup);
      }

      if (filters.component !== 'all') {
        results = results.filter(item => item.composantSanguin === filters.component);
      }
      
      setFilteredStocks(results);
    }
  }, [stocks, filters]);

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantite' ? parseInt(value) : value
    });
  };

  const handleAddClick = () => {
    setCurrentStock(null);
    setFormData({
      groupSanguin: 'A+',
      composantSanguin: 'Globules rouges',
      quantite: 1
    });
    setShowModal(true);
  };

  const handleEditClick = (stock) => {
    setCurrentStock(stock);
    setFormData({
      groupSanguin: stock.groupSanguin,
      composantSanguin: stock.composantSanguin,
      quantite: stock.quantite
    });
    setShowModal(true);
  };

  const handleDeleteClick = async (stockId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stock?')) {
      try {
        await deleteStock(stockId);
      } catch (error) {
        toast.error('Erreur lors de la suppression: ' + error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (currentStock) {
        await updateStock(currentStock.id, formData);
      } else {
        await addStock(formData);
      }
      await getStocks();
      setShowModal(false);
    } catch (error) {
      toast.error(`Erreur lors de ${currentStock ? 'la mise à jour' : 'l\'ajout'}: ` + error.message);
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const bloodGroupOptions = stocks ? ['all', ...new Set(stocks.map(item => item.groupSanguin))] : ['all'];
  const componentOptions = stocks ? ['all', ...new Set(stocks.map(item => item.composantSanguin))] : ['all'];
  const bloodComponents = ['Globules rouges', 'Plasma', 'Plaquettes', 'Sang total'];

  // Return appropriate color based on stock level
  const getStockLevelColor = (quantity) => {
    if (quantity <= 2) return 'text-red-600';
    if (quantity <= 5) return 'text-yellow-600';
    return 'text-green-600';
  };


  const getBloodGroupColor = (group) => {
    const colors = {
      'A+': 'bg-blue-100 text-blue-800',
      'A-': 'bg-blue-200 text-blue-900',
      'B+': 'bg-green-100 text-green-800',
      'B-': 'bg-green-200 text-green-900',
      'AB+': 'bg-purple-100 text-purple-800',
      'AB-': 'bg-purple-200 text-purple-900',
      'O+': 'bg-red-100 text-red-800',
      'O-': 'bg-red-200 text-red-900',
    };
    return colors[group] || 'bg-gray-100 text-gray-800';
  };

  if (!stocks) {
    return (
      <div className="p-8 w-full flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
          <p className="text-lg">Chargement des stocks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600 flex items-center gap-2">
          <FaDroplet /> {filteredStocks.length} type{filteredStocks.length > 1 ? 's' : ''} de stock disponible{filteredStocks.length > 1 ? 's' : ''}
        </p>
        <button
          onClick={handleAddClick}
          className="bg-teal hover:bg-darkteal text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
        >
          <FaPlus /> Ajouter un stock
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4 justify-end">
          
          <div className="w-1/2">
            <div className="relative">
              <select 
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none w-full"
                value={filters.bloodGroup}
                onChange={(e) => handleFilterChange('bloodGroup', e.target.value)}
              >
                <option value="all">Tous groupes</option>
                {bloodGroupOptions.filter(g => g !== 'all').map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaFilter className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="w-1/2">
            <div className="relative">
              <select 
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none w-full"
                value={filters.component}
                onChange={(e) => handleFilterChange('component', e.target.value)}
              >
                <option value="all">Tous composants</option>
                {componentOptions.filter(c => c !== 'all').map(component => (
                  <option key={component} value={component}>{component}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FaFilter className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stocks Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Groupe Sanguin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Composant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière mise à jour
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStocks.length > 0 ? (
                filteredStocks.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getBloodGroupColor(item.groupSanguin)}`}>
                        {item.groupSanguin}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.composantSanguin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${getStockLevelColor(item.quantite)}`}>
                          {item.quantite}
                        </span>
                        <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.quantite <= 2 ? 'bg-red-600' : 
                              item.quantite <= 5 ? 'bg-yellow-600' : 'bg-green-600'
                            }`}
                            style={{ width: `${Math.min(item.quantite * 10, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.updated_at).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-3 justify-end">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Modifier"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Aucun stock ne correspond aux critères de recherche
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary section */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-wrap gap-4">
            {componentOptions.filter(c => c !== 'all').map(component => {
              const totalForComponent = stocks 
                ? stocks.filter(s => s.composantSanguin === component)
                  .reduce((sum, item) => sum + item.quantite, 0)
                : 0;
              
              return (
                <div key={component} className="bg-white px-4 py-2 rounded-md shadow-sm flex items-center">
                  <span className="font-medium mr-2">{component}:</span>
                  <span className={getStockLevelColor(totalForComponent)}>{totalForComponent} unités</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {currentStock ? 'Modifier le stock' : 'Ajouter un nouveau stock'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Groupe Sanguin
                </label>
                <select
                  name="groupSanguin"
                  value={formData.groupSanguin}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  {bloodGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Composant Sanguin
                </label>
                <select
                  name="composantSanguin"
                  value={formData.composantSanguin}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  {bloodComponents.map(component => (
                    <option key={component} value={component}>{component}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Quantité
                </label>
                <input
                  type="number"
                  name="quantite"
                  value={formData.quantite}
                  onChange={handleFormChange}
                  min="0"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                >
                  {currentStock ? 'Mettre à jour' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}