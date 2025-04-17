// ui-script.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Función para aplicar tema y actualizar botón
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.remove('theme-light');
            body.classList.add('theme-dark');
            toggleButton.textContent = 'Cambiar a Tema Claro';
        } else {
            body.classList.remove('theme-dark');
            body.classList.add('theme-light');
            toggleButton.textContent = 'Cambiar a Tema Oscuro';
        }
         // Aquí podríamos llamar a la función de guardado del backend si existiera
         // saveThemePreference(theme);
    }

    // Event listener para el botón
    toggleButton.addEventListener('click', () => {
        const isDark = body.classList.contains('theme-dark');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        console.log(`Theme switched to ${newTheme} by UI button.`);
    });

    // Opcional: Podríamos intentar cargar una preferencia inicial aquí,
    // pero lo dejaremos para el script del backend por ahora.
    console.log('UI theme switcher script loaded.');
});