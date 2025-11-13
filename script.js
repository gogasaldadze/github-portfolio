// GitHub username
const GITHUB_USERNAME = 'gogasaldadze';

// Theme management
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fetch GitHub profile data
async function fetchGitHubProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching GitHub profile:', error);
        return null;
    }
}

// Fetch GitHub repositories
async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching repositories:', error);
        return [];
    }
}

// Update profile information
async function updateProfile() {
    const profile = await fetchGitHubProfile();
    if (profile) {
        // Update name
        const nameElement = document.getElementById('name');
        if (nameElement && profile.name) {
            nameElement.textContent = profile.name;
        }

        // Update bio
        const bioElement = document.getElementById('bio');
        if (bioElement) {
            bioElement.textContent = profile.bio || profile.login;
        }

        // Update about text
        const aboutText = document.getElementById('aboutText');
        if (aboutText && profile.bio) {
            aboutText.textContent = profile.bio;
        }

        // Update stats
        const repoCount = document.getElementById('repoCount');
        if (repoCount) {
            repoCount.textContent = profile.public_repos || 0;
        }

        const followersCount = document.getElementById('followersCount');
        if (followersCount) {
            followersCount.textContent = profile.followers || 0;
        }
    }
}

// Language colors mapping
const languageColors = {
    'Python': '#3776ab',
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'Java': '#ed8b00',
    'C++': '#00599c',
    'C': '#a8b9cc',
    'Go': '#00add8',
    'Rust': '#000000',
    'Ruby': '#cc342d',
    'PHP': '#777bb4',
    'Swift': '#fa7343',
    'Kotlin': '#7f52ff',
    'Dart': '#0175c2',
    'Shell': '#89e051',
    'Vue': '#4fc08d',
    'React': '#61dafb',
    'Angular': '#dd0031',
    'Django': '#092e20',
    'Flask': '#000000',
    'Node': '#339933',
    'Default': '#6c757d'
};

// Get language color
function getLanguageColor(language) {
    return languageColors[language] || languageColors['Default'];
}

// Create project card
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const language = repo.language || 'Unknown';
    const languageColor = getLanguageColor(language);
    
    card.innerHTML = `
        <div class="project-header">
            <div>
                <div class="project-name">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                        ${repo.name}
                    </a>
                    ${repo.fork ? '<span style="font-size: 0.8rem; color: var(--text-secondary);">(Fork)</span>' : ''}
                </div>
            </div>
        </div>
        <p class="project-description">${repo.description || 'No description available.'}</p>
        <div class="project-footer">
            <div class="project-language">
                <span class="language-dot" style="background-color: ${languageColor};"></span>
                <span>${language}</span>
            </div>
            <div class="project-stats">
                <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                    </svg>
                    ${repo.stargazers_count || 0}
                </span>
                <span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                    </svg>
                    ${repo.forks_count || 0}
                </span>
            </div>
        </div>
    `;
    
    return card;
}

// Update projects section
async function updateProjects() {
    const repos = await fetchGitHubRepos();
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) return;
    
    // Clear skeleton loaders
    projectsGrid.innerHTML = '';
    
    if (repos.length === 0) {
        projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No repositories found.</p>';
        return;
    }
    
    // Filter out forked repos if you want, or show them
    // For now, we'll show all repos
    repos.forEach(repo => {
        const card = createProjectCard(repo);
        projectsGrid.appendChild(card);
    });
}

// Update star count
async function updateStarCount() {
    try {
        const repos = await fetchGitHubRepos();
        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        const starCountElement = document.getElementById('starCount');
        if (starCountElement) {
            starCountElement.textContent = totalStars;
        }
    } catch (error) {
        console.error('Error updating star count:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProfile();
    updateProjects();
    updateStarCount();
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

