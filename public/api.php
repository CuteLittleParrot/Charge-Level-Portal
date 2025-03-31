<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$servername = "192.168.1.141";  // Host del database
$username = "root";              // Nome utente del database
$password = "123";               // Password del database
$dbname = "charge_level_portal"; // Nome del database

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Verifica se i parametri sono stati passati via POST
if (isset($_POST['voltage']) && isset($_POST['current']) && isset($_POST['windIntensity']) && isset($_POST['windDirection'])) {
    $voltage = $conn->real_escape_string($_POST['voltage']);
    $current = $conn->real_escape_string($_POST['current']);
    $windIntensity = $conn->real_escape_string($_POST['windIntensity']);
    $windDirection = $conn->real_escape_string($_POST['windDirection']);


    $sql = "INSERT INTO dataset (data, voltage, current, windIntensity, windDirection)
            VALUES (NOW(), '$voltage', '$current', '$windIntensity', '$windDirection')";

    if ($conn->query($sql) === TRUE) {
        echo "Dati salvati nel database con successo.";
    } else {
        echo "Errore durante l'inserimento dei dati: " . $conn->error;
    }
} else {
    echo "Errore: Parametri mancanti!";
}


$conn->close();
?>
