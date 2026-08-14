if (!window.redirectToHome) {
  (function () {
    // Navigate to the site's index.html located in the same base folder.
    // Works for pages served from a repo subpath (GitHub Pages) or site root.
    window.redirectToHome = function () {
      try {
        const path = window.location.pathname.replace(/\/\/+$/, "");
        const idx = path.lastIndexOf('/');
        const base = idx > 0 ? path.substring(0, idx + 1) : '/';
        const target = window.location.origin + base + 'index.html';
        window.location.href = target;
      } catch (e) {
        // Fallback — go to site root index
        window.location.href = './index.html';
      }
    };
  })();
}
