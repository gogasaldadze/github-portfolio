// GitHub username
const GITHUB_USERNAME = 'gogasaldadze';

// Pinned/Featured repositories to display
const PINNED_REPOS = [
    'Online-course-management-system',
    'BoxSpot',
    'BP',
    'JSON-reader-using-python-SQL-',
    'UnilabInternalSystem',
    'Semver-REGEX'
];

// Custom descriptions for repositories
const REPO_DESCRIPTIONS = {
    'Online-course-management-system': 'A comprehensive Django REST Framework-based online course management system. Built with Python, DRF, PostgreSQL, Docker, and JWT authentication. Features custom user models with student/teacher role management, centralized database models in content directory to avoid migration complexity, modular API architecture with sub-APIs, secure environment variable configuration, and a makefile for efficient development workflow. The system provides RESTful APIs for course content management, user registration, authentication, and role-based access control.',
    'BoxSpot': 'A full-stack web application built with HTML, CSS, JavaScript, Python, and Flask. Features email confirmation on user registration, order confirmation emails, different order status updates throughout the order lifecycle, admin panel with restricted access (only admins can add new products), and JWT token authentication for secure user sessions. The project combines frontend technologies with Flask backend, creating an interactive e-commerce experience with proper authentication and authorization.',
    'JSON-reader-using-python-SQL-': 'A Python application for reading and processing JSON data with SQL database integration. Features database creation, data reading and inserting, query execution for analysis, CLI commands, and SOLID principles implementation. Handles data processing, database management, and follows clean code architecture.',
    'UnilabInternalSystem': 'Group project developed during my internship - An internal system for Ilia State University (Unilab). Built with Python and Flask, featuring database initialization, authentication, and internal management features. This collaborative project involved teamwork, Flask development, and working with SQLite databases.',
    'Semver-REGEX': 'A Python utility for semantic versioning validation using regular expressions. Checks if version strings follow the Semantic Versioning specification (MAJOR.MINOR.PATCH format). Uses regex patterns for version validation and Python string processing.',
    'BP': 'A Django REST Framework project where I rebuilt the BoxSpot e-commerce application using DRF and best practice approaches. This project demonstrates advanced Django REST Framework patterns, proper API architecture, and modern development practices for supplier company management. Features RESTful API endpoints for business operations, data management, and follows industry-standard coding practices.'
};

// Custom tech stacks for repositories
const REPO_TECH_STACKS = {
    'Online-course-management-system': [
        { name: 'Python', color: '#3776ab' },
        { name: 'Django', color: '#092e20' },
        { name: 'Django REST Framework', color: '#092e20' },
        { name: 'PostgreSQL', color: '#336791' },
        { name: 'Docker', color: '#2496ed' },
        { name: 'Make', color: '#6e5494' }
    ],
    'BoxSpot': [
        { name: 'HTML', color: '#e34c26' },
        { name: 'CSS', color: '#1572b6' },
        { name: 'JavaScript', color: '#f7df1e' },
        { name: 'Python', color: '#3776ab' },
        { name: 'Flask', color: '#000000' }
    ],
    'JSON-reader-using-python-SQL-': [
        { name: 'Python', color: '#3776ab' },
        { name: 'SQL', color: '#336791' },
        { name: 'CLI', color: '#4a5568' }
    ],
    'UnilabInternalSystem': [
        { name: 'Python', color: '#3776ab' },
        { name: 'Flask', color: '#000000' },
        { name: 'SQLite', color: '#003b57' },
        { name: 'HTML', color: '#e34c26' }
    ],
    'Semver-REGEX': [
        { name: 'Python', color: '#3776ab' },
        { name: 'Regex', color: '#4a5568' }
    ],
    'BP': [
        { name: 'Python', color: '#3776ab' },
        { name: 'Django', color: '#092e20' },
        { name: 'Django REST Framework', color: '#092e20' },
        { name: 'Docker', color: '#2496ed' },
        { name: 'Make', color: '#6e5494' }
    ]
};

// Theme management
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
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

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
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

// Fetch specific repository directly
async function fetchSpecificRepo(repoName) {
    try {
        const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`;
        console.log('Fetching repository from:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Failed to fetch ${repoName}:`, response.status, response.statusText, errorText);
            
            // If 404, repository might not exist or name is wrong
            if (response.status === 404) {
                console.error(`Repository ${repoName} not found. Check if the name is correct.`);
            }
            return null;
        }
        
        const data = await response.json();
        console.log('Successfully fetched repository:', data.name);
        return data;
    } catch (error) {
        console.error(`Error fetching ${repoName}:`, error);
        console.error('This might be a CORS issue. Make sure you are using a local server (not opening the file directly).');
        return null;
    }
}

// Fetch GitHub repositories (user's own repos)
async function fetchGitHubRepos() {
    // If we only have one pinned repo, fetch it directly for better reliability
    if (PINNED_REPOS.length === 1) {
        const repo = await fetchSpecificRepo(PINNED_REPOS[0]);
        return repo ? [repo] : [];
    }
    
    // Otherwise, fetch all repos and filter
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!response.ok) {
            console.error('GitHub API error:', response.status, response.statusText);
            throw new Error(`Failed to fetch repositories: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched repositories:', data.length);
        console.log('Repository names:', data.map(r => r.name));
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

        // Update stats
        const repoCount = document.getElementById('repoCount');
        if (repoCount) {
            repoCount.textContent = profile.public_repos || 0;
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

// Fetch repository languages
async function fetchRepoLanguages(repo) {
    try {
        const response = await fetch(repo.languages_url);
        if (!response.ok) throw new Error('Failed to fetch languages');
        const data = await response.json();
        return Object.keys(data);
    } catch (error) {
        console.error('Error fetching languages:', error);
        return repo.language ? [repo.language] : [];
    }
}

// Create project card with enhanced descriptive style
async function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const language = repo.language || 'Unknown';
    const languageColor = getLanguageColor(language);
    const languages = await fetchRepoLanguages(repo);
    
    // Format dates
    const createdDate = new Date(repo.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short'
    });
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    // Get owner info
    const ownerName = repo.owner?.login || 'Unknown';
    const ownerUrl = repo.owner?.html_url || '#';
    
    // Get custom description if available, otherwise use repo description or default
    const customDescription = REPO_DESCRIPTIONS[repo.name] || repo.description || 'A well-crafted project that demonstrates modern development practices and innovative solutions.';
    
    // Create a more descriptive card
    card.innerHTML = `
        <div class="project-card-header">
            <div class="project-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </div>
            <div class="project-meta">
                <div class="project-owner">
                    <a href="${ownerUrl}" target="_blank" rel="noopener noreferrer">${ownerName}</a>
                    <span class="separator">/</span>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-name-link">${repo.name}</a>
                </div>
                <div class="project-date">Updated ${updatedDate}</div>
            </div>
        </div>
        
        <div class="project-description-wrapper">
            <p class="project-description">${customDescription}</p>
        </div>
        
        <div class="project-features">
            <div class="project-language-badges">
                ${(() => {
                    const techStack = REPO_TECH_STACKS[repo.name];
                    if (techStack && techStack.length > 0) {
                        // Show all tech stack items for projects with custom tech stack
                        return techStack.map(tech => {
                            const techColor = tech.color || getLanguageColor(tech.name);
                            return `
                                <div class="project-language-badge">
                                    <span class="language-dot-large" style="background-color: ${techColor};"></span>
                                    <span class="language-name">${tech.name}</span>
                                </div>
                            `;
                        }).join('');
                    } else {
                        // Show only primary language for other projects
                        return `
                            <div class="project-language-badge">
                                <span class="language-dot-large" style="background-color: ${languageColor};"></span>
                                <span class="language-name">${language}</span>
                            </div>
                        `;
                    }
                })()}
            </div>
            <div class="project-stats-minimal">
                <div class="stat-item-minimal">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                    </svg>
                    <span>${(repo.stargazers_count || 0).toLocaleString()}</span>
                </div>
                <div class="stat-item-minimal">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                    </svg>
                    <span>${(repo.forks_count || 0).toLocaleString()}</span>
                </div>
            </div>
        </div>
        
        <button class="project-details-toggle" onclick="toggleProjectDetails(this)">
            <span>Explore Project Details</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6"/>
            </svg>
        </button>
        
        <div class="project-details">
            <div class="project-details-content">
                <div class="detail-section">
                    <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                        </svg>
                        Repository
                    </h4>
                    <p class="project-link"><strong>GitHub:</strong> <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">${repo.html_url}</a></p>
                    ${repo.homepage ? `<p class="project-link"><strong>Live Demo:</strong> <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer">${repo.homepage}</a></p>` : ''}
                </div>
                
                <div class="detail-section">
                    <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="16 18 22 12 16 6"/>
                            <polyline points="8 6 2 12 8 18"/>
                        </svg>
                        Technology Stack
                    </h4>
                    <div class="project-tech-stack">
                        ${REPO_TECH_STACKS[repo.name] ? 
                            REPO_TECH_STACKS[repo.name].map(tech => 
                                `<span class="tech-tag" style="border-color: ${tech.color}; color: ${tech.color}; background: ${tech.color}15;">${tech.name}</span>`
                            ).join('') :
                            (languages.length > 0 ? languages.map(lang => {
                                const langColor = getLanguageColor(lang);
                                return `<span class="tech-tag" style="border-color: ${langColor}; color: ${langColor}; background: ${langColor}15;">${lang}</span>`;
                            }).join('') : `<span class="tech-tag">${language}</span>`)
                        }
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                        Project Timeline
                    </h4>
                    <ul class="project-timeline">
                        <li><strong>Created:</strong> ${new Date(repo.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
                        <li><strong>Last Updated:</strong> ${updatedDate}</li>
                        <li><strong>Status:</strong> <span class="status-badge ${repo.archived ? 'archived' : 'active'}">${repo.archived ? 'Archived' : 'Active'}</span></li>
                    </ul>
                </div>
                
                ${repo.topics && repo.topics.length > 0 ? `
                <div class="detail-section">
                    <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                            <line x1="7" y1="7" x2="7.01" y2="7"/>
                        </svg>
                        Topics & Tags
                    </h4>
                    <div class="project-tech-stack">
                        ${repo.topics.map(topic => `<span class="tech-tag topic-tag">${topic}</span>`).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Toggle project details
function toggleProjectDetails(button) {
    const card = button.closest('.project-card');
    const details = card.querySelector('.project-details');
    const isExpanded = details.classList.contains('expanded');
    
    if (isExpanded) {
        details.classList.remove('expanded');
        button.classList.remove('expanded');
        button.querySelector('span').textContent = 'View Details';
    } else {
        details.classList.add('expanded');
        button.classList.add('expanded');
        button.querySelector('span').textContent = 'Hide Details';
    }
}

// Make toggleProjectDetails available globally
window.toggleProjectDetails = toggleProjectDetails;

// Create a fallback project card from repository name and description
function createFallbackCard(repoName) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const description = REPO_DESCRIPTIONS[repoName] || 'A well-crafted project that demonstrates modern development practices.';
    const repoUrl = `https://github.com/${GITHUB_USERNAME}/${repoName}`;
    const techStack = REPO_TECH_STACKS[repoName] || [{ name: 'Python', color: '#3776ab' }];
    const primaryLanguage = techStack[0]?.name || 'Python';
    const primaryColor = techStack[0]?.color || '#3776ab';
    
    card.innerHTML = `
        <div class="project-card-header">
            <div class="project-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            </div>
            <div class="project-meta">
                <div class="project-owner">
                    <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener noreferrer">${GITHUB_USERNAME}</a>
                    <span class="separator">/</span>
                    <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="project-name-link">${repoName}</a>
                </div>
                <div class="project-date">View on GitHub</div>
            </div>
        </div>
        
        <div class="project-description-wrapper">
            <p class="project-description">${description}</p>
        </div>
        
        <div class="project-features">
            <div class="project-language-badges">
                ${techStack.map(tech => {
                    const techColor = tech.color || getLanguageColor(tech.name);
                    return `
                        <div class="project-language-badge">
                            <span class="language-dot-large" style="background-color: ${techColor};"></span>
                            <span class="language-name">${tech.name}</span>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="project-stats-minimal">
                <div class="stat-item-minimal">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                    </svg>
                    <span>0</span>
                </div>
                <div class="stat-item-minimal">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                    </svg>
                    <span>0</span>
                </div>
            </div>
        </div>
        
        <button class="project-details-toggle" onclick="toggleProjectDetails(this)">
            <span>Explore Project Details</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6"/>
            </svg>
        </button>
        
        <div class="project-details">
            <div class="project-details-content">
                <div class="detail-section">
                    <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                        </svg>
                        Repository
                    </h4>
                    <p class="project-link"><strong>GitHub:</strong> <a href="${repoUrl}" target="_blank" rel="noopener noreferrer">${repoUrl}</a></p>
                </div>
                
                <div class="detail-section">
                    <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="16 18 22 12 16 6"/>
                            <polyline points="8 6 2 12 8 18"/>
                        </svg>
                        Technology Stack
                    </h4>
                    <div class="project-tech-stack">
                        ${techStack.map(tech => 
                            `<span class="tech-tag" style="border-color: ${tech.color}; color: ${tech.color}; background: ${tech.color}15;">${tech.name}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// Update projects section
async function updateProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }
    
    // Clear skeleton loaders
    projectsGrid.innerHTML = '';
    
    // Fetch repositories
    const repos = await fetchGitHubRepos();
    
    // If API fails, use fallback to show the repository anyway
    if (!repos || repos.length === 0) {
        console.warn('API fetch failed, using fallback display');
        if (PINNED_REPOS.length > 0) {
            for (const repoName of PINNED_REPOS) {
                const card = createFallbackCard(repoName);
                projectsGrid.appendChild(card);
            }
            return;
        }
        projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 3rem;">Unable to load repository. Please check your internet connection and try refreshing the page.</p>';
        return;
    }
    
    // Filter to show only pinned repositories (if we fetched all repos)
    let filteredRepos = repos;
    if (PINNED_REPOS.length > 0 && repos.length > 1) {
        filteredRepos = repos.filter(repo => PINNED_REPOS.includes(repo.name));
        // Sort to match the order in PINNED_REPOS array
        filteredRepos.sort((a, b) => {
            const indexA = PINNED_REPOS.indexOf(a.name);
            const indexB = PINNED_REPOS.indexOf(b.name);
            return indexA - indexB;
        });
    }
    
    console.log('Repos to display:', filteredRepos.length);
    console.log('Repository names:', filteredRepos.map(r => r.name));
    
    if (filteredRepos.length === 0) {
        projectsGrid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 3rem;">No pinned repositories found. Make sure the repository names in PINNED_REPOS match your GitHub repositories exactly.</p>';
        return;
    }
    
    // Display pinned repositories
    for (const repo of filteredRepos) {
        try {
            const card = await createProjectCard(repo);
            projectsGrid.appendChild(card);
        } catch (error) {
            console.error('Error creating card for', repo.name, error);
        }
    }
}


// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateProfile();
    updateProjects();
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

