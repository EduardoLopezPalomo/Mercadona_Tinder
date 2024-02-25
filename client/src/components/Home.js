import { React, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {FaHeart, FaTimes} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import Profile from './Profile';
import '../styles/HomePage.css';
import '../App.css';


function Home() {
  let navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [imageClicked, setImageClicked] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/${localStorage.getItem("id")}`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const userData = await response.json();
      setPeople(userData.map(user => ({
        id: user._id,
        name: user.firstname, 
        imageUrl: user.imageUrl
      })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  const handleLike = async () => {
    try{
      const response = await fetch('http://localhost:4000/users/updateProfile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userlikedId: `${people[currentPersonIndex].id}`,
            yourId: `${localStorage.getItem('id')}`
          })
        })
        if (!response.ok) {
          throw new Error('Failed to update user data');
        }
        const match = response.status === 200; // Check if the status is 200 OK
        if (match) {
         showToastMessageSucces(`You match with ${people[currentPersonIndex].name}`);
         localStorage.setItem("userMatched",people[currentPersonIndex].name );
        }
        setImageClicked(false);
        setCurrentPersonIndex(currentPersonIndex + 1);
      }catch(error){
        console.error('Error fetching like:', error);
      }
  };

  const handleDislike = () => {
    setImageClicked(false);
    setCurrentPersonIndex(currentPersonIndex + 1);
  };

  const currentPerson = people.length > 0 ? people[currentPersonIndex] : null;

  const showToastMessageSucces = (message) =>
  {
    toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light"
        });
  }

  const handleImageClick = () => {
    setImageClicked(true);
  };


  return (
    <div className='HomePageBackground'>
    {currentPerson ? (
      <div>
        {currentPerson.imageUrl.length > 0  ? (
            <img src={currentPerson.imageUrl} alt={currentPerson.name} className="profile-image" onClick={handleImageClick} />
        ) : (
          <p>This user is so shy that it doesn't have a picture</p>
        )}
        <h1>{currentPerson.name}</h1>
        <div>
          <button className="button-dislike" onClick={handleDislike}><FaTimes /></button> 
          <button className="button-like" onClick={handleLike}><FaHeart /></button>
        </div>
      </div>
    ) : (
      <h1>There is no more users left</h1>
    )}
    {imageClicked && <div className="profile-details">
        <Profile userId={currentPerson.id} />
      </div>}
    <ToastContainer />
  </div>
    
  )
}

export default Home