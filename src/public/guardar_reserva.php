<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// 1. Configuración de la base de datos
$servidor = "localhost";
$usuario  = "root";
$password = "";
$base_datos = "barlovento_db";

$conn = new mysqli($servidor, $usuario, $password, $base_datos);

if ($conn->connect_error) {
    echo json_encode(["error" => "Conexión fallida: " . $conn->connect_error]);
    exit;
}

// 2. Leer datos enviados desde reserva.js
$json = file_get_contents('php://input');
$datos = json_decode($json, true);

if ($datos) {
    // Extraer datos del JSON
    $nombre    = $datos['nombre'];
    $email     = $datos['email'];
    $telefono  = $datos['telefono'];
    $id_hab    = $datos['habitacion_id']; // NUEVO: Captura el ID de la habitación
    $f_inicio  = $datos['fechaInicio'];
    $f_fin     = $datos['fechaFin'];
    $total     = $datos['total'];

    // 3. Preparar la consulta SQL (Agregando columna habitacion_id)
    // Nota: Asegúrate de que tu tabla 'reservas' tenga la columna 'habitacion_id' (INT)
    $stmt = $conn->prepare("INSERT INTO reservas (nombre, email, telefono, habitacion_id, fecha_inicio, fecha_fin, total) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    // "ssisssd" significa: string, string, string, integer, string, string, double (decimal)
    $stmt->bind_param("sssissd", $nombre, $email, $telefono, $id_hab, $f_inicio, $f_fin, $total);

    if ($stmt->execute()) {
        echo json_encode(["ok" => true]);
    } else {
        echo json_encode(["error" => "Error al ejecutar: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "No se recibieron datos"]);
}

$conn->close();
?>