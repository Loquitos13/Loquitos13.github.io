<?php

//Use Postman to test the API
//http://localhost:8081/PTAW/restapi/api.php?table=clientes

header("Content-Type: application/json");
include 'db_connection.php';

$allowedTables = json_decode(file_get_contents('tables_config.json'), true);
$table = $_GET['table'] ?? '';

if (!isset($allowedTables[$table])) {

    http_response_code(403);
    die(json_encode(['error' => 'Invalid table']));
    
}

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true) ?? [];

switch ($method) {

    case 'GET':
        handleGet($pdo, $table);
        break;
    case 'POST':
        handlePost($pdo, $table, $input);
        break;
    case 'PUT':
        handlePut($pdo, $table, $input);
        break;
    case 'DELETE':
        handleDelete($pdo, $table, $input);
        break;
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);

}

//Use GET
function handleGet($pdo, $table) {

    try {

        /*instead of $table, place $input
            $input is going to have:
                $table WHERE something
        */

        $stmt = $pdo->query("SELECT * FROM $table");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

    } catch (PDOException $e) {

        logError($e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error']);

    }
    
}


/*
Use POST
Select Body -> raw -> JSON
Paste this in:

{
"nome_cliente": "Filipe Rocha",
"email_cliente": "filipe@mail.com",
"pass_cliente": "pass",
"contacto_cliente": "999999999",
"morada_cliente": "Rua x",
"nif_cliente": "12345678 1 LI8",
"ip_cliente": "192.168.0.1",
"data_criacao_cliente": "2025-04-04 11:53:25",
"id_gift": "5",
"id_favoritos": "1",
"id_boletim": "10"
}
*/
function handlePost($pdo, $table, $input) {

    if (requiredFields($table, $input)) {

        $columns = implode(', ', array_keys($input));
        $values = ':' . implode(', :', array_keys($input));
        
        $sql = "INSERT INTO $table ($columns) VALUES ($values)";

        try {

            $stmt = $pdo->prepare($sql);
            $stmt->execute($input);

            if($stmt->rowCount() > 0) {

                echo json_encode(['message' => 'Create action was successfull']);

            } else {

                http_response_code(400);
                echo json_encode(['error' => 'Something went wrong']);

            }
        } catch (PDOException $e) {

            logError($e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Internal server error']);

        }
    } else {

        http_response_code(400);
        echo json_encode(['error' => 'Missing fields']);

    }

}

/*
Use PUT
Select Body -> raw -> JSON
Paste this in:

{
"id_cliente": "1",
"email_cliente": "filiperocha@mail.com"
}
*/
function handlePut($pdo, $table, $input) {

    $key_first_element = array_key_first($input);
    $value_first_element = $input[$key_first_element];
    unset($input[$key_first_element]);

    $set = implode(', ', array_map(
        fn($key) => "$key = :$key",
        array_keys($input),
    ));

    $sql = "UPDATE $table SET $set WHERE $key_first_element = :$key_first_element";

    $input[$key_first_element] = $value_first_element;

    try {

        $stmt = $pdo->prepare($sql);
        $stmt->execute($input);

        if($stmt->rowCount() > 0) {

            echo json_encode(['message' => 'Updated action was successfull']);

        } else {

            http_response_code(400);
            echo json_encode(['error' => 'Column or value not found']);

        }
    } catch (PDOException $e) {

        logError($e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error']);

    }

}

/*
Use DELETE
Select Body -> raw -> JSON
Paste this in:

{
"id_cliente": "1"
}
*/
function handleDelete($pdo, $table, $input) {

    $column = array_keys($input)[0];
    $value = $input[$column];

    $sql = "DELETE FROM $table WHERE $column = :value";
    
    try {

        $stmt = $pdo->prepare($sql);
        $stmt->execute(['value' => $value]);
        
        if ($stmt->rowCount() > 0) {

            echo json_encode(['message' => 'Delete action was successfull']);

        } else {

            http_response_code(400);
            echo json_encode(['error' => 'Column or value not found']);

        }

    } catch (PDOException $e) {

        logError($e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error']);

    }
}

function requiredFields($table, $data) {

    $validData = false;

    global $allowedTables;

    $notNullableColumns = [];

    foreach ($allowedTables[$table]['columns'] as $key => $value) {

        if (str_contains($value, 'not nullable')) {

            $columnName = preg_replace('/\s*=\s*[^=]+$/', "", "$key = $value");

            array_push($notNullableColumns, $columnName);

        } 

    }

    $missingColumns = array_diff($notNullableColumns, array_keys($data));

    if (in_array($allowedTables[$table]['id_column'], $missingColumns)) {

        $index = array_search($allowedTables[$table]['id_column'], $missingColumns);

        if ($index !== false) {

            unset($missingColumns[$index]);
            
        }

    } 

    if (empty($missingColumns)) {

        $validData = true;

    } 

    return $validData;

}

function logError(string $message) {

    file_put_contents('../logs/errors.log', date('Y-m-d H:i:s') . " - " . $message . PHP_EOL, FILE_APPEND);
    
}