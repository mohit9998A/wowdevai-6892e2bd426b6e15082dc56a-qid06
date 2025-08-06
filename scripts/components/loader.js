export async function loadComponent(selector) {
  const element = document.querySelector(selector);
  if (!element) return;
  
  const source = element.getAttribute('data-source');
  if (!source) return;
  
  try {
    const basePath = window.location.origin + '/api/preview-6892e2bd426b6e15082dc56a/';
    const response = await fetch(basePath + source);
    if (response.ok) {
      element.innerHTML = await response.text();
      
      // Initialize mobile menu toggle after navbar is loaded
      if (source.includes('navbar')) {
        initializeMobileMenu();
      }
    }
  } catch (error) {
    console.error(`Failed to load component: ${source}`, error);
  }
}

function initializeMobileMenu() {
  const mobileToggle = document.querySelector('[data-id="mobile-menu-toggle"]');
  const mobileMenu = document.querySelector('[data-id="mobile-menu"]');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}