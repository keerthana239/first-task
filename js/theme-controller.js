// Theme controller to handle dark/light mode
class ThemeController {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.applyTheme();
        this.initializeTheme();
    }

    initializeTheme() {
        // Apply saved theme on page load
        document.addEventListener('DOMContentLoaded', () => {
            this.applyTheme();
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        // Update any theme toggle buttons if they exist
        const toggleBtns = document.querySelectorAll('.theme-toggle');
        toggleBtns.forEach(btn => {
            btn.setAttribute('aria-label', `Switch to ${this.theme === 'light' ? 'dark' : 'light'} mode`);
        });
    }

    getCurrentTheme() {
        return this.theme;
    }
}

// Create a global instance
const themeController = new ThemeController();