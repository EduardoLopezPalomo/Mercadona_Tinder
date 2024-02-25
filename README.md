# Mercadona Tinder

## Course project for Advance Web Aplication

### Manual

In this website, you can register and log in. Once logged in, you will be redirected to your profile page where you can upload images and update your email and description. If the information does not appear, please reload the page as it may vary depending on the computer.

On the homepage, you can like or dislike examples of users. Clicking on their image will display their information.

To test the match and messaging features, create another user. If you both click 'like' on each other's profiles, a match will occur. Once matched, you can navigate to the message page to see a table of chats with the users you've matched with. Clicking on a user's name will take you to the chat itself, where you can send and receive messages. Depending on which user you send the message to, it will appear either on the right or left side of the screen, similar to other messaging applications.

Postscript: For the images, I used the ugliest pictures of my friends. I hope you have a good time looking at them :)

### Installation:

_(You should have Node.js installed.)_

Go to the directory where you want the project.

### How to run:

```bash
npm install
npm run dev:server
(on another terminal window) npm run dev:client
```

If you haven't received any error messages on the consoles, everything is working correctly. :D

### technology choices

#### Backend Technologies:

bcryptjs
-Description: Library for hashing passwords securely.
-Usage: Used to securely hash user passwords before storing them in the database.

cookie-parser
-Description: Middleware for parsing cookies in Express.
-Usage: Utilized to parse incoming request cookies in the Express.js application.

express
-Description: Web application framework for Node.js.
-Usage: Chosen as the backend framework to build the RESTful API endpoints and handle HTTP requests.

express-validator
-Description: Library for input validation in Express.
-Usage: Utilized for validating and sanitizing user input data in the Express.js routes.

jsonwebtoken
-Description: Library for generating and verifying JSON Web Tokens (JWT) in Node.js.
-Usage: Employed for implementing token-based authentication and generating JWTs for user authentication.

mongodb
-Description: Official MongoDB driver for Node.js.
-Usage: Used for interacting with MongoDB databases and performing CRUD operations.

mongoose
-Description: Library for MongoDB object modeling in Node.js.
-Usage: Used to define schemas and models for MongoDB documents and facilitate interactions with the MongoDB database.

passport
-Description: Authentication middleware for Node.js.
-Usage: Used for implementing authentication strategies and managing user authentication in the application.

passport-jwt
-Description: Passport strategy for authenticating with JSON Web Tokens (JWT) in Node.js.
-Usage: Integrated with Passport.js for authenticating users using JWTs in the application.

#### Frontend Technologies:

react
-Description: JavaScript library for building user interfaces.
-Usage: Core library for building UI components and managing application state in React.js.

react-icons
-Description: Library for including popular icon sets in React components.
-Usage: Integrated for incorporating various icon sets into React components for visual enhancement.

react-router-dom
-Description: Library for routing in React applications.
-Usage: Employed for handling client-side routing and navigation in the React.js application.

react-scripts
-Description: Package for scripts and configurations used with Create React App.
-Usage: Utilized for running development server, building production bundle, and other scripts in React.js projects.

react-toastify
-Description: Library for displaying toast notifications in React applications.
-Usage: Integrated for showing user-friendly toast messages for various actions and events in the frontend.

styled-components
-Description: Library for styling React components with CSS-in-JS.
-Usage: Used for styling React components with dynamic styles and theming support.

#### Middleware technologies:

http-proxy-middleware
-Description: Middleware for proxying requests in Node.js.
-Usage: Utilized in development environment for proxying API requests from the frontend to the backend during development.

### List of features and points

Basic features 25 points
Utilization of a frontside framework 5 points
User profiles can have images 3 points
User can click image and see user profile 2 points
Chat shows who send the message 3 points
Last message is shown in the chat list 2 points

The last two features are my own additions, and I believe they should be accepted. In every messaging application, on the home page where the list of chats is displayed, it typically shows the last message sent. Similarly, in the chat interface, it also displays the sender of each message. Additionally, if you change your user and enter the chat, the messages will appear on the appropriate side (left or right) depending on whether you sent the message or not. Therefore, I believe these two features should be taken into account.
