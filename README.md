# Blog App Client

This repository contains the client-side code for the **Blog App**, a full-featured blogging platform where users can create, view, and manage blog posts, comments, and categories. This project is built using the MERN stack.

## Features

- **User Authentication:** Users can sign up, log in, and manage their profiles.
- **Post Management:** Users can create, edit, delete, and view posts with rich text content.
- **Category Filter:** Posts can be filtered by category.
- **Search Functionality:** Search for posts by title or description.
- **Sorting:** Sort posts by title, popularity, or creation date.
- **Skeleton UI:** A skeleton interface is displayed while data is being fetched for better user experience.
- **Responsive Design:** The app is fully responsive, working seamlessly on various screen sizes.
- **Moment.js Integration:** Dates are handled using Moment.js for consistent formatting.

## Environment Variables

The project requires the following environment variables:

- `VITE_ENVIREMENT`: Specifies the environment mode (development or production).
- `VITE_ROTE`: Base route for the application.
- `VITE_SERVER_HOST`: Host URL of the server.

## Technologies Used

- **React:** Frontend framework used to build the user interface.
- **Vite:** Build tool for fast and optimized development.
- **MUI:** Material-UI components for consistent styling.
- **Moment.js:** Library used for date formatting and manipulation.
- **CSS Modules:** Scoped and modular CSS for styling components.

## Getting Started

To get a local copy up and running, follow these simple steps:

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ghilmi/Blog-App-Client.git
   ```

2. Install dependencies:

   ```bash
   cd Blog-App-Client
   npm install
   ```

3. Create a `.env` file in the root directory and add the environment variables:

   ```env
   VITE_ENVIREMENT=development
   VITE_ROTE=/blog
   VITE_SERVER_HOST=http://localhost:5000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

### Deployment

The app is deployed on Vercel at [this link](https://blog-app-client-1au3pkpa3-users-projects-c3831f03.vercel.app/).

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

---
