<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Directories needed for the Backend
$autoload_dir = __DIR__ . '/../vendor/autoload.php';
$dir = dirname(__DIR__);

require $autoload_dir;

$dotenv = Dotenv\Dotenv::createImmutable($dir);
$dotenv->load();

// Database connection parameters from .env
$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

// Create a connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    exit();
} 

// Corrected SQL query to fetch all data from the "Locations" table
$sql = "SELECT 
            a.address AS Address,
            c.name AS City,
            c.state AS State,
            p.number AS Phone
        FROM Locations l
        JOIN Address a ON l.Address = a.id
        JOIN City c ON l.City = c.id
        JOIN Phone p ON l.Phone = p.id;";
        
$result = $conn->query($sql);

// Check if there are results
if ($result->num_rows > 0) {
    // Create an array to store the result
    $locations = [];

    // Fetch data row by row
    while($row = $result->fetch_assoc()) {
        $locations[] = $row;
    }

    // Output the data in JSON format
    echo json_encode(["status" => 200, "data" => $locations], JSON_PRETTY_PRINT); // Set status to numeric
} else {
    // If no results were found
    echo json_encode(["status" => 404, "message" => "No locations found"]); // Changed status to 404
}

$conn->close();
?>
