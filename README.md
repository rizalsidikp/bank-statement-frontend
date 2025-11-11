# bank-statement-frontend

Frontend application for managing and displaying bank statement data.

## Features

- Upload statements
- Show summary balance
- List issued statements with pagination and sorting
- Responsive 

## Prerequisites

- Node.js (v20 or higher)
- npm (v9 or higher)
- Modern web browser
- Access to required API endpoints

## Configuration

- Make sure to set the required environment variables in the `.env` file.

## Installation

1. Clone this repository:
  ```bash
  git clone https://github.com/rizalsidikp/bank-statement-frontend.git
  ```
2. Enter the project folder:
  ```bash
  cd bank-statement-frontend
  ```
3. Install dependencies:
  ```bash
  npm install
  ```
4. Run the application:
  ```bash
  npm run dev
  ```
## Docker

### Build the Docker image
```bash
docker build -t bank-statement-frontend .
```

### Run the Docker container
```bash
docker run -d -p 5173:80 bank-statement-frontend
```
