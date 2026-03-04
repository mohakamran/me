// Import components
import { loadComponent } from './utils/helpers.js';
import { initNavigation } from './components/navigation.js';
import { initLanguageSwitcher } from './components/language-switcher.js';
import { initParticles } from './components/particles.js';
import { initTypewriter } from './components/typewriter.js';

import "./index.js";

// Load all components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load components in order
        await loadComponent('header', 'components/header.html');
        await loadComponent('hero', 'components/hero.html');
        // We'll add more components as we create them
        
        // Initialize functionality
        initNavigation();
        initLanguageSwitcher();
        initParticles();
        initTypewriter();
        
        console.log('Portfolio loaded successfully!');
    } catch (error) {
        console.error('Error loading portfolio:', error);
    }
});

// Export for use in other modules
export { loadComponent };