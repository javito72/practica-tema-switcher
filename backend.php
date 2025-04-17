<?php
// backend.php
header('Content-Type: application/json'); // Indicar que la respuesta es JSON

// 1. Simular obtención del ID de usuario (en una app real, vendría de sesión/token)
$userId = session_id() ?: 'user_' . rand(1000, 9999); // Identificador simple para la demo

// 2. Determinar la acción (GET para leer, POST para guardar)
$method = $_SERVER['REQUEST_METHOD'];

// --- Simulación de almacenamiento (usando un archivo simple por usuario) ---
$storageDir = __DIR__ . '/user_prefs';
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0777, true); // Crear directorio si no existe
}
$preferenceFile = $storageDir . '/' . basename($userId) . '.json';
// -----------------------------------------------------------------------

$response = ['status' => 'error', 'message' => 'Invalid request.'];
http_response_code(400); // Default a Bad Request

if ($method === 'POST') {
    // --- GUARDAR PREFERENCIA ---
    $input = json_decode(file_get_contents('php://input'), true);
    $themePreference = $input['theme'] ?? null;

    if ($themePreference === 'dark' || $themePreference === 'light') {
        // Guardar en el archivo simulado
        file_put_contents($preferenceFile, json_encode(['theme' => $themePreference]));
        $response = ['status' => 'success', 'message' => "Preference '$themePreference' saved for user $userId."];
        http_response_code(200); // OK
    } else {
        $response['message'] = 'Invalid theme value provided.';
    }

} elseif ($method === 'GET') {
    // --- LEER PREFERENCIA ---
    if (file_exists($preferenceFile)) {
        $savedData = json_decode(file_get_contents($preferenceFile), true);
        $savedTheme = $savedData['theme'] ?? 'light'; // Default si no hay nada
        $response = ['status' => 'success', 'theme' => $savedTheme];
        http_response_code(200); // OK
    } else {
        // No hay preferencia guardada, devolver default
        $response = ['status' => 'success', 'theme' => 'light']; // Default
        http_response_code(200); // OK (no es un error no tener pref guardada)
    }
} else {
     $response['message'] = 'Unsupported HTTP method.';
     http_response_code(405); // Method Not Allowed
}

// Devolver la respuesta como JSON
echo json_encode($response);
exit; // Terminar script
?>