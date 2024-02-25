import { React, useState, useEffect } from 'react';
import '../styles/Intro.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Intro() {
  return (
    <div className="intro-container">
      <Typography variant="h4" className="intro-title" gutterBottom>
        Welcome to Mercadona-Tinder
      </Typography>
      <Typography variant="body1" className="intro-description" paragraph>
        Mercadona-Tinder is a platform that helps you find your perfect match. 
        Swipe through incredible people and chat with them with a simple click.
      </Typography>
      <Typography variant="body1" className="intro-description" paragraph>
        Ready to get started? Sign up or log in below.
      </Typography>
      <div className="intro-buttons">
        <Button variant="contained" className="intro-button" component={Link} to="/login">
          Log In
        </Button>
        <Button variant="contained" className="intro-button" component={Link} to="/register">
          Register
        </Button>
      </div>
    </div>
  );
}

export default Intro