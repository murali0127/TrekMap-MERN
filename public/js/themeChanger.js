/**
 * Theme Changer - Dark/Light Mode Toggle
 */

// const { typeOf } = require("@maptiler/sdk");

(function () {
    const storageKey = 'trekmap-theme';
    const defaultTheme = 'dark';

    // Get the saved theme from localStorage or use default
    function getSavedTheme() {
        const saved = localStorage.getItem(storageKey);
        return saved === 'light' || saved === 'dark' ? saved : defaultTheme;
    }

    // Apply theme to body
    function applyTheme(themeName) {
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add(`theme-${themeName}`);

        // Toggle Bootstrap's built-in dark/light mode
        document.body.setAttribute('data-bs-theme', themeName);

        // Update button icon
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = themeName === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
            }
        }
        // if (typeof updateMapStyle === 'function' updateMapStyle(newTheme))
    }

    // Toggle theme
    function toggleTheme() {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(storageKey, newTheme);
        applyTheme(newTheme);


    }

    // Initialize on page load
    function initTheme() {
        applyTheme(getSavedTheme());
    }

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();

        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', toggleTheme);
        }
    });

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initTheme();
    }
})();