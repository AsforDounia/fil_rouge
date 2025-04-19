import React from 'react'
import { useAuth } from '../../Context/AuthContext'
import { toast } from 'react-toastify';


function DonorDashboard() {
  const {logout} = useAuth();

  const handleLogout = async () => {
    try{
      await logout();
    }
    catch(error){
      toast.error('Failed to logout');
    }
  }

  return (
    <div>
      <h1 className=''>Donor Dashboard</h1> 
      <button className='bg-red-500 cursor-pointer' onClick={handleLogout}>deconnecter</button>
    </div>
    
  )
}

export default DonorDashboard