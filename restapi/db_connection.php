<?php

$host = "localhost";
$user = "filipe";
$password = "qwerty";
$dbname = "ptaw";

try {

    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {

    die("Connection failed: " . $e->getMessage());

}