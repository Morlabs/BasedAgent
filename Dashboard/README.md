# Dashboard Application

Welcome to the BasedAgent Dashboard application, part of the BasedAgent project. This application provides an interface for onboarding new developers to BasedAgent, featuring a React front-end and a Node.js server backend. Below are detailed instructions to help you set up and run the application.

## Prerequisites

Ensure you have the following installed on your system:
- Node.js (LTS version recommended)
- npm (usually comes with Node.js)
- PostgreSQL
- Optional: pgAdmin 4 (for managing the PostgreSQL database)

## Installation

Follow these steps to set up your environment:

1. **Clone the Repository**
    ```bash
    git clone https://github.com/Morlabs/BasedAgent.git
    cd BasedAgent/Dashboard
    ```

2. **Install Dependencies**
    - This project uses a two-step installation process for its front-end and back-end dependencies.
    ```bash
    npm run setup
    ```

3. **Database Setup**
    - Ensure PostgreSQL is running.
    - Create a new database for the application.
    - Use the provided SQL scripts in the `sql` directory to set up your tables and initial data.
        ```bash
        psql -U username -d your_database_name -a -f setup.sql
        ```
    - Update the `config/database.js` file or relevant configuration files with your database connection details.

4. **Environment Variables**
    - Create a `.env` file in the root of the `Dashboard` directory with the necessary environment variables:
        ```
        DATABASE_URL=postgres://username:password@localhost:5432/your_database_name
        PORT=3000
        ```

## Running the Application

- **Development Mode**:
  - To run both the front-end React application and the Node.js server concurrently during development:
    ```bash
    npm run dev
    ```
  - This will start the React development server and the Node.js backend server concurrently. The React app will be available by default on `http://localhost:3000`, and the backend API will also use this or another specified port.

- **Production Build and Run**:
  - To build the React application for production and run the server:
    ```bash
    npm run prod
    ```
  - This will place the production build in the specified directory and start the server to serve the React app and API from the same port.

## Using pgAdmin 4 (Optional)

If you prefer a graphical interface for database management:
- Open pgAdmin 4.
- Connect to your PostgreSQL server.
- Manage the database, import SQL files, or run queries as needed.

## Additional Information

- **Contributing**: Contributions are welcome! Please fork the repository and submit pull requests.
- **Issues**: For any issues or bugs, please file an issue on the GitHub repository page.

