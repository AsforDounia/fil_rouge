import React, { useEffect, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import { useAuth } from '../../Context/AuthContext';

const Profile = () => {
  const { user, getUser, loading , updateProfile ,deleteAccount} = useAuth();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    birthDate: '',
    bloodType: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    weight: '',
    height: ''
  });

  // State for password change
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    newPassword_confirmed: ''
  });

  const [passwordError, setPasswordError] = useState('');

  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async() => {
      try {
        await getUser();
      } catch (err) {
        setError('Erreur lors du chargement des données utilisateur');
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        birthDate: user.date_of_birth || '',
        bloodType: user.blood_type || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postal_code || '',
        country: user.country || '',
        weight: user.weight || '',
        height: user.height || '',
        profile_image : user.profile_image ||  "/api/placeholder/128/128",
      });
    }
  }, [user]);


  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
    
    if (name === 'newPassword' || name === 'newPassword_confirmed') {
      setPasswordError('');
      console.log("tesssssssssssssssssst");
      
    }
  };

  // Handle avatar file change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('La taille du fichier ne doit pas dépasser 5MB');
        return;
      }
      
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setError('Format de fichier non supporté. Utilisez JPG ou PNG');
        return;
      }
      
      setAvatarFile(file);
      setError(null);

      const imageUrl = URL.createObjectURL(file);
    
    
      setProfileForm({
        ...profileForm,
        profile_image: file,
      });
    }

  };


  const validatePassword = () => {
    const { newPassword, newPassword_confirmed } = passwordForm;
    
    if (newPassword !== newPassword_confirmed) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return false;
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule et un chiffre');
      return false;
    }
    
    return true;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileForm);

      setSuccessMessage('Profil mis à jour avec succès');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Erreur lors de la mise à jour du profil');
      console.error(err);
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    console.log(passwordForm);
    
    try {
      await updateProfile(passwordForm);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        newPassword_confirmed: ''
      });
      setSuccessMessage('Mot de passe modifié avec succès');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Erreur lors du changement de mot de passe');
      console.error(err);
    }
  };


  const handleDeleteAccount = async() => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      deleteAccount();
    }
  };

  if (loading) {
    return (
      <div className="p-8 w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700 mb-4"></div>
        <p className="text-lg">Chargement des informations d'user...</p>
      </div>
    </div>
    )
  }

  if (error && !user) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        {error}
        <button 
          className="ml-4 underline"
          onClick={() => window.location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Success message */}
      {successMessage && (
        <div className="bg-green-50 p-4 mb-6 rounded-lg text-green-600 flex justify-between">
          {successMessage}
          <button onClick={() => setSuccessMessage('')}>×</button>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 p-4 mb-6 rounded-lg text-red-600 flex justify-between">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Profile Settings */}
      <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-200 relative">
          <h3 className="text-xl font-semibold text-[#4A1E1F]">Informations Personnelles</h3>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
        </div>
        <div className="p-6">
          <form onSubmit={handleProfileSubmit}>
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-4 mb-6">
              <img 
               src={avatarFile ? URL.createObjectURL(avatarFile) : `http://127.0.0.1:8000/storage/${profileForm.profile_image}`}
                alt="Profile" 
                className="w-32 h-32 rounded-full border-3 border-[#40898A] object-cover" 
              />
              <div className="text-center">
                <input 
                  type="file" 
                  id="avatar" 
                  accept="image/jpeg,image/png,image/jpg" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
                <button 
                  type="button" 
                  className="bg-[#1A4B4C] text-white py-3 px-5 rounded-md hover:bg-[#40898A] transition-colors duration-300 font-medium"
                  onClick={() => document.getElementById('avatar').click()}
                >
                  <FaUpload className="inline-block mr-2" /> Modifier la photo
                </button>
                <p className="mt-2 text-gray-500 text-sm">
                  Formats acceptés: JPG, PNG. Taille max: 5MB
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-medium text-[#4A1E1F]">Nom et Prénom</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium text-[#4A1E1F]">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="birthDate" className="block mb-2 font-medium text-[#4A1E1F]">Date de naissance</label>
                <input 
                  type="date" 
                  id="birthDate" 
                  name="birthDate" 
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                  value={profileForm.birthDate}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="bloodType" className="block mb-2 font-medium text-[#4A1E1F]">Groupe sanguin</label>
                <select 
                  id="bloodType" 
                  name="bloodType" 
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20 bg-white"
                  value={profileForm.bloodType}
                  onChange={handleProfileChange}
                >
                  <option value="">Sélectionner</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="h-px bg-gray-200 my-8"></div>
            
            {/* Address Information */}
            <h4 className="text-lg font-semibold mb-6 text-[#4A1E1F]">Adresse</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-6">
                <label htmlFor="address" className="block mb-2 font-medium text-[#4A1E1F]">Adresse complète</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                  value={profileForm.address}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="city" className="block mb-2 font-medium text-[#4A1E1F]">Ville</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                  value={profileForm.city}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="postalCode" className="block mb-2 font-medium text-[#4A1E1F]">Code postal</label>
                <input 
                  type="text" 
                  id="postalCode" 
                  name="postalCode" 
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                  value={profileForm.postalCode}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="country" className="block mb-2 font-medium text-[#4A1E1F]">Pays</label>
                <input 
                  type="text" 
                  id="country" 
                  name="country" 
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                  value={profileForm.country}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div className="h-px bg-gray-200 my-8"></div>

            {/* Health Information */}
            <h4 className="text-lg font-semibold mb-6 text-[#4A1E1F]">Informations médicales</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-6">
                <label htmlFor="weight" className="block mb-2 font-medium text-[#4A1E1F]">Poids (kg)</label>
                <input 
                  type="number" 
                  id="weight" 
                  name="weight" 
                  min="0"
                  max="500"
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                  value={profileForm.weight}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="height" className="block mb-2 font-medium text-[#4A1E1F]">Taille (cm)</label>
                <input 
                  type="number"
                  id="height" 
                  name="height"
                  min="0"
                  max="300"
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                  value={profileForm.height}
                  onChange={handleProfileChange}
                />
              </div>
            </div>

            <div className="h-px bg-gray-200 my-8"></div>

            <div className="flex justify-end gap-4">
              <button 
                type="button" 
                className="py-3 px-6 bg-transparent border border-gray-200 rounded-lg text-[#1A4B4C] hover:border-[#1A4B4C] hover:text-[#40898A] transition-colors duration-300"
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="py-3 px-6 bg-[#8B2326] text-white rounded-lg hover:bg-[#4A1E1F] transition-colors duration-300"
              >
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Password Settings */}
      <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-200 relative">
          <h3 className="text-xl font-semibold text-[#4A1E1F]">Mot de passe</h3>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
        </div>
        <div className="p-6">
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-6">
              <label htmlFor="currentPassword" className="block mb-2 font-medium text-[#4A1E1F]">Mot de passe actuel</label>
              <input 
                type="password" 
                id="currentPassword" 
                name="currentPassword" 
                className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="newPassword" className="block mb-2 font-medium text-[#4A1E1F]">Nouveau mot de passe</label>
              <input 
                type="password" 
                id="newPassword" 
                name="newPassword" 
                className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="newPassword_confirmed" className="block mb-2 font-medium text-[#4A1E1F]">Confirmer le nouveau mot de passe</label>
              <input 
                type="password" 
                id="newPassword_confirmed" 
                name="newPassword_confirmed" 
                className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-[#40898A] focus:ring-2 focus:ring-[#40898A] focus:ring-opacity-20"
                value={passwordForm.newPassword_confirmed}
                onChange={handlePasswordChange}
                required
              />
            </div>
            {passwordError && (
              <div className="mb-6 text-red-600 text-sm">
                {passwordError}
              </div>
            )}
            <p className="text-sm text-gray-500 mb-6">Le mot de passe doit contenir au moins 8 caractères, incluant au moins une lettre majuscule, une lettre minuscule et un chiffre.</p>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className="py-3 px-6 bg-[#8B2326] text-white rounded-lg hover:bg-[#4A1E1F] transition-colors duration-300"
              >
                Changer le mot de passe
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Account */}
      <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-200 relative">
          <h3 className="text-xl font-semibold text-[#4A1E1F]">Supprimer votre compte</h3>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#40898A] to-[#8B2326]"></div>
        </div>
        <div className="p-6">
          <p className="mb-6">La suppression de votre compte est irréversible. Toutes vos données personnelles seront définitivement effacées.</p>
          <div className="flex justify-end">
            <button 
              type="button" 
              className="py-3 px-6 bg-transparent border border-red-600 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-300"
              onClick={handleDeleteAccount}
            >
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;