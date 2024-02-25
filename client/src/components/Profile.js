import { React, useState, useEffect } from 'react';
import '../styles/MyProfile.css';

function Profile({userId}) {
    const [user, setUser ] = useState(null);

    useEffect(() => {
        fetchUserData();
      }, []);
  
  
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/users/getData/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUser (userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    return (
      <div className='HomePageBackground'>
        {user ? (
          <>
            <h1>{user.firstname} Profile</h1>
            <div className='Background'>
              <div className='MyInfo'>
                <div className='profileText'>
                  <p>Firstname: {user.firstname}</p>
                  <p>Lastname: {user.lastname}</p>
                  <p>Email: {user.email}</p>
                  <p>Description: {user.bio}</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Reload the page if your information doesn't show</p>
        )}
      </div>
    )}
  
  export default Profile