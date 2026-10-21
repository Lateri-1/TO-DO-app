<?php
    header("Access-Control-Allow-Origin: http://localhost:5173");
    header("Content-Type: application/json");
function connectDB(): PDO
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "todo_api";

    $dsn = "mysql:host=$servername;dbname=$database;charset=utf8mb4";

    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    return $pdo;
}

$pdo = connectDB();

$cmd = $_GET['cmd'] ?? '';

switch ($cmd) {

    case "all":

        $sql = "SELECT * FROM todos";
        $stmt = $pdo->query($sql);

        $todos = $stmt->fetchAll();

        echo json_encode($todos);

        break;


    case "done":

        $id = $_GET['id'] ?? 0;

        $sql = "UPDATE todos SET status = 'DONE' WHERE id = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        echo json_encode([
            "message" => "To Do item is now DONE"
        ]);

        break;


    case "remove":

        $id = $_GET['id'] ?? 0;

        $sql = "DELETE FROM todos WHERE id = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        echo json_encode([
            "message" => "To Do item successfully removed"
        ]);

        break;


    case "add":

        $item = $_GET['item'] ?? '';

        $sql = "INSERT INTO todos (item, status)
                VALUES (:item, 'NOT DONE')";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(['item' => $item]);

        $newId = $pdo->lastInsertId();

        echo json_encode([
            "id" => $newId,
            "item" => $item,
            "status" => "NOT DONE"
        ]);

        break;


    default:

        echo json_encode([
            "error" => "Unknown command"
        ]);

        break;
}