// backend-interact.js
async function loadThemePreference() {
    try {
        const response = await fetch('backend.php', { method: 'GET' });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('Backend preference loaded:', data);
        return data.theme || 'light'; // Devuelve preferencia o default
    } catch (error) {
        console.error('Could not load theme preference:', error);
        return 'light'; // Fallback to default on error
    }
}

async function saveThemePreference(theme) {
     try {
        console.log(`Attempting to save theme preference: ${theme}`);
        const response = await fetch('backend.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ theme: theme })
        });
         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('Backend save response:', data);
     } catch (error) {
        console.error('Could not save theme preference:', error);
     }
}

// Podríamos llamar a loadThemePreference() al cargar la página
// document.addEventListener('DOMContentLoaded', async () => {
//    const loadedTheme = await loadThemePreference();
//    // Aquí necesitaríamos una forma de comunicarnos con el script UI
//    // para aplicar el tema cargado.
// });

console.log('Backend interaction script loaded.');