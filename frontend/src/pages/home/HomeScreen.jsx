import React from 'react';
import { useAuthStore } from '../../store/authUser';

const HomeScreen = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      HomeScreen
      <button onClick={logout} className='bg-red-400'> Logout</button>
    </div>
  );
};

export default HomeScreen;
