<?php
require_once 'connect_db.php';

$count = $_GET['count'];
$result = [];

$query = "SELECT * FROM reviews WHERE id > $count";
$review = $pdo->query($query);

try {
    while ($row = $review->fetch(PDO::FETCH_ASSOC)) {
        $row['photos'] = unserialize($row['photos']);
        $row['text'] = $row['text'];
        $result[] = $row;
    }
} catch (PDOException $e) {
    echo "Ошибка выполнения запроса: " . $e->getMessage();
}

echo json_encode($result);