<?php
try {
    $pdo = new PDO('mysql:host=localhost;dbname=nastiprazdnik',
        'root',
        'admin',
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"]);
} catch (PDOException $e) {
    echo "Невозможно установить соединение с базой данных";
}