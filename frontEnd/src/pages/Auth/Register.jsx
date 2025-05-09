import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaUser, FaProcedures, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHeartbeat,FaCalendarAlt ,FaHistory   } from 'react-icons/fa';
import { IoNotifications , IoLocationSharp } from "react-icons/io5";
import { useAuth } from '../../Context/AuthContext';
import { toast } from "react-toastify";

const Register = () => {
  const { registerf } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setshowPasswordConfirmation] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('donor');

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
    try {
      await registerf(submissionData);
    } catch (error) {
      toast.error("Registration failed: " + error);
    }
  };

  return (
    <div className="max-h-screen py-2 bg-gray-50 flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden flex">
          <div className="w-1/2 bg-burgundy relative flex flex-col justify-between items-center p-8">
                <div className='pt-28 text-center'>
                    <FaHeartbeat className="text-6xl text-cream mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-cream">
                        Blood<span className="text-white">Link</span>
                    </h1>
                    <p className="text-teal mt-2">Donnez du sang, sauvez des vies</p>
                </div>

                <div className='text-left'>
                    <h1 className='font-medium text-cream text-xl'>Pourquoi s'inscrire ?</h1>
                    <h3 className='text-white'>
                        Rejoignez notre communauté et
                        contribuez à sauver des vies par le don
                        de sang.
                    </h3>
                    <ul className="text-white mt-6 space-y-2">
                        <li> <FaCalendarAlt className='relative -top-1 inline text-teal'/> Planifiez vos rendez-vous</li>
                        <li><FaHistory className='relative -top-1 inline text-teal' /> Suivez votre historique</li>
                        <li><IoNotifications className='relative -top-1 inline text-teal text-lg' /> Recevez des alertes</li>
                        <li><IoLocationSharp  className='relative -top-1 inline text-teal text-lg' />  Trouvez des centres</li>
                    </ul>
                </div>

          </div>

          <div className="w-3/5 p-12">
            <h2 className="text-2xl font-bold text-burgundy mb-5 text-center">Créer un compte</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-4">
                <div
                  onClick={() => setSelectedAccount('donor')}
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

              <input type="hidden" {...register('accountType')} defaultValue={selectedAccount} />

              <div className='mb-2'>
                  <label htmlFor="name" className="block text-burgundy font-medium mb-1">
                  Nom && Prénom
                  </label>
                  <div className="relative">
                    <FaUser className='absolute top-1/2 left-2 -translate-y-1/2 text-gray-400'/>
                  <input
                    type="text"
                    id="name"
                    placeholder='Entrez votre nom et prénom'
                    {...register('name', { required: 'Le nom et prénom est requis' })}
                    className="w-full pl-10 pr-4 py-3  border  border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
              </div>

              <div className="mb-2">
                <label htmlFor="email" className="block text-burgundy font-medium mb-2">
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
                    placeholder="votre@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              
                <div className="mb-2">
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

                <div className="mb-2">
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
              

              <button type="submit" className="w-full bg-wine text-white p-2 rounded-lg hover:bg-burgundy transition-colors mt-4 cursor-pointer">
                S'inscrire
              </button>
            </form>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-4 text-gray-500">ou</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="text-center">
              <p>
                Vous avez de compte ? {' '}
                <a href="login" className="text-wine hover:underline">
                  Connectez
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
