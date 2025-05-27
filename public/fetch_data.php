<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "123";
$dbname = "charge_level_portal";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json');

$sql = "SELECT data, voltage, current, windIntensity, windDirection FROM dataset ORDER BY data DESC LIMIT 20";
$result = $conn->query($sql);

$data = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = [
            'data' => $row['data'],
            'voltage' => $row['voltage'],
            'current' => $row['current'],
            'windIntensity' => $row['windIntensity'],
            'windDirection' => $row['windDirection']
        ];
    }

}

echo json_encode($data); // Stampa i dati come JSON

$conn->close();
