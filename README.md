# 🎬 CineHue - Movie Discovery Application

A modern, responsive movie discovery application built with React and React Router, featuring real-time search suggestions and detailed movie information powered by the OMDB API.

**🚀 Live Demo: [https://cinehue.vercel.app](https://cinehue.vercel.app)**

<img src="./public/CineHue_LOGO.png" alt="CineHue Logo" width="100" />

## ✨ Features

### 🔍 Smart Search

- **Real-time Suggestions**: Live movie suggestions from OMDB API as you type
- **Keyboard Navigation**: Navigate suggestions using arrow keys and select with Enter
- **Focus-based Dropdown**: Suggestions appear only when search input is focused
- **Clear Functionality**: One-click clear button to reset search

### 🎭 Movie Discovery

- **Movie Grid Display**: Responsive grid layout showcasing movie posters and details
- **Detailed Movie Pages**: Complete movie information including plot, cast, ratings, and IMDB links
- **Poster Placeholders**: Clean fallback design for movies without available posters
- **Star Rating System**: Visual star ratings based on IMDB scores

### 🎨 Modern UI/UX

- **Dark Theme**: Eye-friendly dark theme with amber and red gradient accents
- **Smooth Animations**: Hover effects, transitions, and loading animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Custom Loading Screens**: Branded loading spinners matching the app's theme

## 🛠️ Tech Stack

- **Frontend**: React 18+ with Hooks
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **API**: OMDB API for movie data
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- OMDB API Key (free from [omdbapi.com](http://www.omdbapi.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SnehaSharma245/cinehue.git
   cd cinehue
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file in the root directory
   VITE_OMDB_API_KEY=your_omdb_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Made with ❤️ by [Your Name](https://cinehue.vercel.app)
