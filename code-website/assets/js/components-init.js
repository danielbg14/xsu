/**
 * Initialize Components (Navbar and Footer)
 * Loads navbar and footer components into their respective containers
 */

async function loadComponents() {
  try {
    // Load Navbar
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      const navbarResponse = await fetch('assets/components/navbar.html');
      const navbarHTML = await navbarResponse.text();
      navbarContainer.innerHTML = navbarHTML;
    }

    // Load Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
      const footerResponse = await fetch('assets/components/footer.html');
      const footerHTML = await footerResponse.text();
      footerContainer.innerHTML = footerHTML;
    }

    // Initialize component scripts after loading
    initializeNavbarScripts();
  } catch (error) {
    console.error('Error loading components:', error);
  }
}

/**
 * Initialize Navbar Scripts
 * Attaches event listeners to navbar elements
 */
function initializeNavbarScripts() {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('nav') && !event.target.closest('.mobile-menu')) {
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
      }
    });
  }
}

// Load components when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadComponents);
} else {
  loadComponents();
}
