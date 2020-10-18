<?php
require_once 'connect_db.php';

extract($_POST);
$photos = [];

if (!empty($_FILES)) {
    for ($i = 0; $i < count($_FILES['photos']['tmp_name']); $i++) {
        $ext = explode('.', $_FILES['photos']['name'][$i]);
        $name = "/img/reviews/" . time() . $i . "." . $ext[1];
        move_uploaded_file($_FILES['photos']['tmp_name'][$i], $_SERVER['DOCUMENT_ROOT'] . $name);
        $photos[] = $name;
    }
}

try {
    $query = "INSERT INTO reviews VALUES
    (NULL, :author, :avatarImage, :avatarColor, :text, :photos)";
    $review = $pdo->prepare($query);
    $review->execute(['author' => $author,
        'avatarImage' => $avatar['image'],
        'avatarColor' => $avatar['color'],
        'text' => strip_tags($text),
        'photos' => serialize($photos)]);
} catch (PDOException $e) {
    echo "Ошибка выполнения запроса: " . $e->getMessage();
}