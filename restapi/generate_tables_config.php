<?php

include 'db_connection.php';

function getTableConfig(PDO $pdo, string $table): array {
    // Get columns with nullability information
    $stmt = $pdo->query("
        SELECT COLUMN_NAME, IS_NULLABLE 
        FROM information_schema.columns 
        WHERE TABLE_NAME = '$table' AND TABLE_SCHEMA = DATABASE()
    ");

    $columns = [];
    foreach ($stmt->fetchAll(PDO::FETCH_ASSOC) as $column) {
        $columns[$column['COLUMN_NAME']] = $column['IS_NULLABLE'] === 'YES' ? 'nullable' : 'not nullable';
    }

    // Get primary key
    $stmt = $pdo->query("SHOW KEYS FROM $table WHERE Key_name = 'PRIMARY'");
    $primaryKey = $stmt->fetch(PDO::FETCH_ASSOC)['Column_name'] ?? null;

    return [
        'columns' => $columns,
        'id_column' => $primaryKey
    ];
}

$tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
$config = [];

foreach ($tables as $table) {
    $config[$table] = getTableConfig($pdo, $table);
}

// Save to JSON file (optional)
file_put_contents('restapi/tables_config.json', json_encode($config, JSON_PRETTY_PRINT));
