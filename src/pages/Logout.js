import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
//import AuthContext from '../context/AuthProvider';
import { useSignOut } from 'react-auth-kit';

const Logout = () => {

  const signOut = useSignOut();

    let navigate = useNavigate();
    //const { setAuth } = useContext(AuthContext);

    useEffect(()=>{
    //     setAuth({
    //     currentUser:'',
    //     role:'',
    //     userID:''
    // })
    signOut();
    navigate('/login');
    })

  return (
    <>
      
    </>
  )
}

export default Logout;