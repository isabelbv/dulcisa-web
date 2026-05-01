<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

$host = "localhost";
$user = "root";
$pass = "";
$db   = "dulcisa";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die(json_encode(["error" => "Fallo de conexión: " . $conn->connect_error]));
}

$id = isset($_GET['id']) ? $_GET['id'] : null;


$queryBase = "SELECT 
                p.*, 
                GROUP_CONCAT(a.icono) as iconos_alergenos
              FROM productos p
              LEFT JOIN producto_alergenos pa ON p.id = pa.producto_id
              LEFT JOIN alergenos a ON pa.alergeno_id = a.id";

if ($id) {
   
    $sql = $queryBase . " WHERE p.id = ? GROUP BY p.id";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        echo json_encode($resultado->fetch_assoc());
    } else {
        echo json_encode(["error" => "Producto no encontrado"]);
    }
    $stmt->close();
} else {
    $sql = $queryBase . " GROUP BY p.id";
    $resultado = $conn->query($sql);
    
    if (!$resultado) {
        die(json_encode(["error" => "Error en consulta: " . $conn->error]));
    }
    
    $productos = [];
    while($fila = $resultado->fetch_assoc()) {
        $productos[] = $fila;
    }
    echo json_encode($productos);
}

$conn->close();
?>