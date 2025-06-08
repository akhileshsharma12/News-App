# News App

A simple web application to browse and search for the latest news articles using the [NewsAPI](https://newsapi.org/).

## Features

- Browse top headlines from the US.
- Search for news articles by keyword.
- Responsive design for desktop and mobile.
- Loading indicator and error handling for network/API issues.

## Technologies Used

- **HTML5** & **CSS3** – Structure and styling
- **JavaScript (ES6+)** – Frontend logic
- **Node.js** – Backend runtime
- **Express.js** – Backend server and API proxy
- **Fetch API** – HTTP requests
- **NewsAPI** – News data provider

## Project Structure

- `index.html`: Main HTML file.
- `style.css`: Styles for the app.
- `script.js`: Frontend JavaScript logic.
- `server.js`: Node.js backend server (Express) to proxy NewsAPI requests.
- `package.json`: Project dependencies and scripts.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed.

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/akhileshsharma12/News-App.git
   cd News-App
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the backend server:**
   ```sh
   node server.js
   ```
   The server will run at [http://localhost:3000](http://localhost:3000).

4. **Open `index.html` in your browser.**

## Notes

- The backend server proxies requests to NewsAPI to avoid exposing your API key in the frontend.
- Make sure your NewsAPI key in `server.js` is valid.
- For development, you can use [nodemon](https://www.npmjs.com/package/nodemon) for automatic server restarts.

## License

Made by Akhilesh Sharma.  
For personal and educational use only.
