import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaProcedures, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoLocationSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../Context/AdminContext';

const AddUser = () => {
    const navigate = useNavigate()
  const { addUser } = useAdmin();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setshowPasswordConfirmation] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('centre_manager');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePassworConfirmationdVisibility = () => {
    setshowPasswordConfirmation(!showPasswordConfirmation);
  };

  const onSubmit = async (data) => {
    const submissionData = {
      ...data,
      accountType: selectedAccount
    };
    console.log(submissionData);
    try {
      await addUser(submissionData);
      toast.success('user is create with success');
      navigate('/admin/users');
    } catch (error) {
      toast.error("creation user failed: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-4/5 mx-auto mt-16'>

      <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-8">
        <div
          onClick={() => setSelectedAccount('centre_manager')}
          className={`flex-1 py-2 flex flex-col items-center justify-center cursor-pointer transition-colors border-r-2
          ${selectedAccount === 'centre_manager' ? 'bg-burgundy text-white' : 'bg-white text-black'}`}
          role="button"
          aria-selected={selectedAccount === 'centre_manager'}
        >
          <FaProcedures />
          <span>Centre Manager</span>
        </div>

        <div onClick={() => setSelectedAccount('donor')}
          className={`flex-1 py-2 flex flex-col items-center justify-center cursor-pointer transition-colors border-r-2
          ${selectedAccount === 'donor' ? 'bg-burgundy text-white' : 'bg-white text-black'}`}
          role="button"
          aria-selected={selectedAccount === 'donor'}
        >
          <FaUser />
          <span>Donneur</span>
        </div>

        <div onClick={() => setSelectedAccount('patient')}
          className={`flex-1 py-2 flex flex-col items-center justify-center cursor-pointer transition-colors
          ${selectedAccount === 'patient' ? 'bg-burgundy text-white' : 'bg-white text-black'}`}
          role="button"
          aria-selected={selectedAccount === 'patient'}
        >
          <FaProcedures />
          <span>Patient</span>
        </div>

      </div>

      <input type="hidden" {...register('accountType')} value={selectedAccount} />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="name" className="block text-burgundy font-medium mb-1">
            {selectedAccount === 'centre_manager' ? 'Nom du Centre' : 'Nom'}
          </label>
          <div className="relative">
            <FaUser className='absolute top-1/2 left-2 -translate-y-1/2 text-gray-400' />
            <input
              type="text"
              id="name"
              placeholder={selectedAccount === 'centre_manager' ? 'Entrez le nom du centre' : 'Entrez user nom'}
              {...register('name', { 
                required: selectedAccount === 'centre_manager' ? 'Le nom du centre est requis' : 'Le nom est requis' 
              })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-burgundy font-medium mb-1">
            Adresse Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Format d'email invalide"
                }
              })}
              placeholder="user@email.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Location fields for all user types */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="address" className="block text-burgundy font-medium mb-2">
            {selectedAccount === 'centre_manager' ? 'Adresse du Centre' : 'Adresse'}
          </label>
          <div className="relative">
            <IoLocationSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="address"
              {...register('address', {
                required: 'Adresse est requise'
              })}
              placeholder={selectedAccount === 'centre_manager' ? 'Adresse complète du centre' : 'user adresse complète'}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="city" className="block text-burgundy font-medium mb-2">
            Ville
          </label>
          <div className="relative">
            <IoLocationSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="city"
              {...register('city', {
                required: 'La ville est requise'
              })}
              placeholder={selectedAccount === 'centre_manager' ? 'Ville du centre' : 'Ville d\'user'}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            />
          </div>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="latitude" className="block text-burgundy font-medium mb-2">
            Latitude
          </label>
          <div className="relative">
            <IoLocationSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="latitude"
              {...register('latitude', {
                required: 'Latitude est requise',
                pattern: {
                  value: /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/,
                  message: 'Format de latitude invalide'
                }
              })}
              placeholder="Ex: 48.8566"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            />
          </div>
          {errors.latitude && (
            <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="longitude" className="block text-burgundy font-medium mb-2">
            Longitude
          </label>
          <div className="relative">
            <IoLocationSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="longitude"
              {...register('longitude', {
                required: 'Longitude est requise',
                pattern: {
                  value: /^-?([1-9]{1}[0-9]{0,2}|0)\.{1}\d{1,6}/,
                  message: 'Format de longitude invalide'
                }
              })}
              placeholder="Ex: 2.3522"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            />
          </div>
          {errors.longitude && (
            <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="password" className="block text-burgundy font-medium mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password', {
                required: 'Mot de passe est requis',
                minLength: {
                  value: 6,
                  message: 'Le mot de passe doit contenir au moins 6 caractères'
                }
              })}
              placeholder="Mot de passe"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-darkTeal"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password_confirmation" className="block text-burgundy font-medium mb-2">
            Confirmation
          </label>
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPasswordConfirmation ? 'text' : 'password'}
              id="password_confirmation"
              {...register('password_confirmation', {
                required: 'Confirmation requise',
                validate: (value) => value === watch('password') || 'Les mots de passe ne correspondent pas'
              })}
              placeholder="Confirmation de mot de passe"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
            />
            <button
              type="button"
              onClick={togglePassworConfirmationdVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-darkTeal"
            >
              {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password_confirmation && (
            <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
          )}
        </div>
      </div>

      <button type="submit" className="w-full bg-wine text-white p-2 rounded-lg hover:bg-burgundy transition-colors mt-4 cursor-pointer">
        Ajouter
      </button>
    </form>
  );
};

export default AddUser;