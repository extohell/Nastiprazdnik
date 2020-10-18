<?php
$names = glob($_SERVER['DOCUMENT_ROOT'] . $_GET['folder'] . "*");
foreach ($names as &$st) {
    $st = basename($st);
}
echo json_encode($names, JSON_UNESCAPED_UNICODE);