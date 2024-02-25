import { React, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  const handleUpload = async () => {
    try {
        const userId = localStorage.getItem("id");
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await fetch(`http://localhost:4000/images/${userId}`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        showToastMessageSucces("image Upload");
        return data._id; 
      } catch (error) {
        console.error('Error uploading image:', error);
        showToastMessageError(error);
        throw error;
      }
  };

  const showToastMessageError = (message) =>
  {
    toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark"
        });
  }
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

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <ToastContainer />
    </div>
  );
};

export default ImageUpload;
