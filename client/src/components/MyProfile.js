import { React, useState, useEffect } from 'react';
import '../styles/MyProfile.css';
import Button from "@mui/material/Button";
import EditDetailsModal from '../modals/EditDetailsModal';
import ImageUpload from './UploadImage';

function EventItem(props)
{
  //this states the image profile of the user
  const [image, setImage] = useState("");


  // These states store the original event data
  const [Firstname, setFirstname] = useState(props.Firstname);
  const [Lastname, setLastname] = useState(props.Lastname);
  const [Email, setEmail] = useState(props.Email);
  const [Bio, setBio] = useState(props.Bio);

  // These states store the data that is edited
  const [edit, setEdit] = useState(false);
  const [editedFirstname, setEditedFirstname] = useState(props.Firstname);
  const [editedLastname, setEditedLastname] = useState(props.Lastname);
  const [editedEmail, setEditedEmail] = useState(props.Email);
  const [editedBio, setEditedBio] = useState(props.Bio);

  // Save the history so that the editing can be cancelled
  const [FirstnameHistory, setFirstnameHistory] = useState(props.Firstname);
  const [LastnameHistory, setLastnameHistory] = useState(props.Lastname);
  const [EmailHistory, setEmailHistory] = useState(props.Email);
  const [BioHistory, setBioHistory] = useState(props.Bio);

  const editOnClick = () =>
  {
    setEdit(true);
  }

  const saveEditOnClick = async () =>
  {
    // TODO: Send the edited values to the database to actually save the edit
    const confirmed = window.confirm("Are you sure you want to save the changes?");
    if(confirmed){
      try{
        // Send updated data to the server
        const response = await fetch('http://localhost:4000/users/changeProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: `${localStorage.getItem("id")}`,
          user: {
            email: `${editedEmail}`,
            bio:`${editedBio}`
          }
        })
      });
  
      if (response.ok) {
  
        // Update the history
      setFirstnameHistory(editedFirstname);
      setLastnameHistory(editedLastname);
      setEmailHistory(editedEmail);
      setBioHistory(editedBio);
  
      // Update the actual values
      setFirstname(editedFirstname);
      setLastname(editedLastname);
      setEmail(editedEmail);
      setBio(editedBio);
  
      // Close the edit
      setEdit(false);
      }
      else{
        // Handle error response from server
        console.error('Failed to update profile:', response.statusText);
      }
      }
      catch(error){
        // Handle network or other errors
      console.error('Error updating profile:', error.message);
      }
    }
  
  }

  const cancelEditOnClick = () =>
  {
    // Bring back the old event data
    setFirstname(FirstnameHistory);
    setLastname(LastnameHistory);
    setEmail(EmailHistory);
    setBio(BioHistory);

    // Also reset the changes to the edited values
    setEditedFirstname(FirstnameHistory);
    setEditedLastname(LastnameHistory);
    setEditedEmail(EmailHistory);
    setEditedBio(BioHistory);
    // Close the edit
    setEdit(false);
  }

  const handleFirstnameChange = (event) =>
  {
    setEditedFirstname(event.target.value);
  }

  const handleLastnameChange = (event) =>
  {
    setEditedLastname(event.target.value);
  }

  const handleEmailChange = (event) =>
  {
    setEditedEmail(event.target.value);
  }
  const handleBioChange = (event) =>
  {
    setEditedBio(event.target.value);
  }

  useEffect(()=>{
    fetchImage();
  },[]);

  const fetchImage = async () => {
    try {
      const response = await fetch(`http://localhost:4000/images/getData/${localStorage.getItem("id")}`); 
      const imageData = await response.json(); 

      // Convert the data array to a Uint8Array
      const uint8Array = new Uint8Array(imageData.buffer.data);

      // Convert the Uint8Array to a Base64 string
      const base64String = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
      const imageUrl = `data:${imageData.mimetype};base64,${btoa(base64String)}`; 
      setImage(imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  return (
    <div className='MyInfo'>
      {image ? (
        <img className='Image' src={image} alt='Profile' />
      ) : (
        <p>Upload an image and reload the page</p>
      )}
      <div className='profileText'>
        <p>Firstname: {Firstname}</p>
        <p>Lastname: {Lastname}</p>
        <p>Email: {Email}</p>
        <p>Description: {Bio}</p>
      </div>
      <Button variant='outlined' onClick={editOnClick} className='left-aligned-button'>Edit</Button>
      

    <EditDetailsModal 
      edit={edit} 
      editedEmail={editedEmail} 
      handleFirstnameChange={handleFirstnameChange}
      handleLastnameChange={handleLastnameChange}
      handleEmailChange={handleEmailChange}
      handleBioChange={handleBioChange}
      cancelEditOnClick={cancelEditOnClick}
      saveEditOnClick={saveEditOnClick}
    />
    </div>
  )
}



function Home() {
  const [user, setUser ] = useState(null);
  const userId = localStorage.getItem('id');
  const [showUpload, setShowUpload] = useState(false);

  const handleToggleUpload = () => {
    setShowUpload(!showUpload);
  };

  const fetchUserId = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/getID');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      localStorage.setItem("id",await response.json());
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/users/getData/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      setUser (userData);
      localStorage.setItem("currentUser", userData.firstname);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserId();
    fetchUserData();
  }, []);

  return (
    <div className='HomePageBackground'>
    <h1>My Profile</h1>
    <div className='Background'>
        {user ? (
            <EventItem
                Firstname={user.firstname}
                Lastname={user.lastname}
                Email={user.email}
                Description = {user.bio}
            />
        ) : (
            <p>Reload the page if your information doesn't shows</p>
        )}
    </div>
    <button onClick={handleToggleUpload}>Upload Image</button>
      {showUpload && <ImageUpload />}
</div>


  )
}

export default Home