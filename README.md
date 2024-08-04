# Blog App

This project is a full-featured blog application developed using the MERN stack (MongoDB, Express, React, Node.js). The application supports user authentication, creating and managing posts, commenting, and filtering posts by category. It also includes an admin dashboard for managing users, posts, comments, and categories.

## Features

- **User Authentication**: Secure login and registration using JWT and bcrypt.
- **User Profiles**: Users can update their profiles, including profile pictures and bios.
- **Create, Read, Update, Delete (CRUD)**: Full CRUD functionality for posts and comments.
- **Categories**: Filter posts by categories.
- **Admin Dashboard**: Manage users, posts, comments, and categories with statistical overview.
- **Responsive Design**: The application is responsive and works on various devices.
- **Dark/Light Mode**: Toggle between dark and light modes.

## Technologies Used

- **Frontend**: React, MUI (Material-UI), React Router, Axios, Moment.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT), bcrypt
- **Image Hosting**: Cloudinary
- **Deployment**: Vercel

## Installation

### Prerequisites

- Node.js
- MongoDB
- Cloudinary Account (for image hosting)

### Steps

1. **Clone the repositories**

   ```bash
   git clone https://github.com/Ghilmi/Blog-App-Client.git
   git clone https://github.com/Ghilmi/Blog-App-Server.git
   ```

2. **Navigate to the client directory and install dependencies**

   ```bash
   cd Blog-App-Client
   npm install
   ```

3. **Navigate to the server directory and install dependencies**

   ```bash
   cd ../Blog-App-Server
   npm install
   ```

4. **Create a `.env` file in the server directory and add the following environment variables**

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Start the backend server**

   ```bash
   npm start
   ```

6. **Start the frontend development server**

   ```bash
   cd ../Blog-App-Client
   npm start
   ```

## Usage

- Register and login to access all features.
- Create and manage posts.
- Comment on posts.
- Filter posts by category.
- Admin users can access the admin dashboard to manage the entire application.

## Deployment

The application is deployed on Vercel. You can access it [here](https://blog-app-client-gray.vercel.app/).

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)

