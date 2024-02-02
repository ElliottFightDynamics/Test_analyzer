# Installation Guide

Welcome to the installation guide for our full-stack code analysis and documentation application. This guide will walk you through the steps required to get the application up and running on your system.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Git
- Node.js (including npm)
- Python 3.x
- Docker (optional, for containerized deployment)

## Cloning the Repository

Start by cloning the repository to your local machine using Git:

```
git clone https://github.com/your-repository/code-analysis-app.git
cd code-analysis-app
```

## Setting Up the Backend

Navigate to the server directory and install the necessary Node.js dependencies:

```
cd server
npm install
```

Copy the `.env.example` file to `.env` and fill in your database credentials and other environment-specific variables:

```
cp .env.example .env
```

Start the backend server:

```
npm start
```

## Setting Up the Frontend

Open a new terminal window, navigate to the client directory, and install the dependencies:

```
cd client
npm install
```

Start the frontend development server:

```
npm start
```

The frontend should now be running and accessible via `http://localhost:3000`.

## Setting Up the AI Service

Navigate to the ai directory and set up a Python virtual environment:

```
cd ai
python3 -m venv venv
source venv/bin/activate
```

Install the required Python libraries:

```
pip install -r requirements.txt
```

Run the AI service (ensure the backend server is running as it may communicate with it):

```
python train_model.py
```

## Docker (Optional)

If you prefer to use Docker, you can use the `docker-compose.yml` file to build and run the entire stack:

```
docker-compose up --build
```

This will set up the frontend, backend, and AI service in their respective containers.

## Verifying the Installation

Once all services are running, open your web browser and navigate to `http://localhost:3000`. You should see the application's homepage where you can start uploading and analyzing your codebase.

## Troubleshooting

If you encounter any issues during the installation, please refer to the `docs/user_manual.md` and `docs/api_documentation.md` for further guidance or contact support.

Thank you for using our code analysis and documentation application!