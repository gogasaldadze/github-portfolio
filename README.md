# GitHub Portfolio

A modern, responsive portfolio website showcasing my GitHub profile and projects. Built with vanilla HTML, CSS, and JavaScript.

## Features

- 🎨 Modern and clean design with dark/light theme toggle
- 📱 Fully responsive layout
- ⚡ Fast loading with GitHub API integration
- 🎯 Dynamic project showcase with expandable details
- 📊 Real-time statistics
- ✨ Smooth animations and transitions

## Testing Locally

### Option 1: Simple File Opening (Quick Test)
1. Simply double-click `index.html` to open it in your default browser
2. Note: Some features may not work due to CORS restrictions when opening files directly

### Option 2: Using Python (Recommended)
If you have Python installed:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open `http://localhost:8000` in your browser.

### Option 3: Using Node.js
If you have Node.js installed:
```bash
# Install http-server globally (one time)
npm install -g http-server

# Run the server
http-server -p 8000
```
Then open `http://localhost:8000` in your browser.

### Option 4: Using VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Setup for GitHub Pages

1. Push all files to your GitHub repository
2. Go to your repository settings
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select the branch (usually `main`) and folder (`/root`)
5. Click "Save"
6. Your portfolio will be available at `https://yourusername.github.io/github-portfolio`

## Customization

To customize the portfolio for a different GitHub user:

1. Open `script.js`
2. Change the `GITHUB_USERNAME` constant to your GitHub username:
   ```javascript
   const GITHUB_USERNAME = 'your-username';
   ```

To customize the "About Me" section:

1. Open `index.html`
2. Find the `about-description` div (around line 73)
3. Edit the paragraph text to tell your story

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- GitHub API

## License

MIT License - feel free to use this template for your own portfolio!