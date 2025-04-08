<?php
$apiUrl = "http://localhost:8081/PTAW/restapi/api.php?table=";

function validateTableName(string $table): string {
    static $allowedTables = json_decode(file_get_contents('tables_config.json'), true);
    
    if (!isset($allowedTables[$table])) {

        throw new InvalidArgumentException(

            "Invalid table $table."

        );
        
    }
    
    return urlencode($table);
}

function executeCurlRequest($ch) {
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if ($httpCode >= 400) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new Exception("HTTP $httpCode Error: $error | Response: $response");
    }
    
    if (curl_errno($ch)) {
        $error = curl_error($ch);
        curl_close($ch);
        throw new Exception("cURL Error: $error");
    }
    
    curl_close($ch);
    return $response;
}


function fetchData($table) {

    global $apiUrl;

    $validatedTable = validateTableName($table);
    
    /*Add to the URL the rest of the query
        WHERE something
    */

    $url = $apiUrl . $validatedTable;

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    return json_decode(executeCurlRequest($ch), true);

}

function createData($table, $data) {

    global $apiUrl;

    $validatedTable = validateTableName($table);

    $url = $apiUrl . $validatedTable;

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
        CURLOPT_POSTFIELDS => json_encode($data)
    ]);

    return json_decode(executeCurlRequest($ch), true);

}

function editData($table, $data) {

    global $apiUrl;

    $validatedTable = validateTableName($table);

    $url = $apiUrl . $validatedTable;

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => "PUT",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
        CURLOPT_POSTFIELDS => json_encode($data)
    ]);

    return json_decode(executeCurlRequest($ch), true);

}

function deleteData($table, $data) {

    global $apiUrl;

    $validatedTable = validateTableName($table);

    $url = $apiUrl . $validatedTable;

    $ch = curl_init($url);

    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => "DELETE",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ["Content-Type: application/json"],
        CURLOPT_POSTFIELDS => json_encode($data)
    ]);

    return json_decode(executeCurlRequest($ch), true);

}








// Testing the functions

/*try {

    $response = fetchData("clientes");
    print_r($response);

} catch (Exception $e) {

    echo "Error: " . $e->getMessage();
    
}*/

/*$newClient = [
    
    "nome_cliente"      => "Diogo Pinto",
    "email_cliente"     => "diogo@mail.com",
    "pass_cliente"      => "pass",
    "contacto_cliente"  => "123456789",
    "morada_cliente"    => "Rua y",
    "nif_cliente"       => "87654321 5 5GP",
    "id_gift"           => "1",
    "id_favoritos"      => "6",
    "id_boletim"        => "1"

];

try {

    $response = createData("clientes", $newClient);
    print_r($response);

} catch (Exception $e) {

    echo "Error: " . $e->getMessage();

}*/

/*$editClient = [
    
    "id_cliente"        => "4",
    "email_cliente"     => "diogopinto@mail.ua",
    "morada_cliente"    => "Rua nao sei"

];

try {

    $response = editData("clientes", $editClient);
    print_r($response);

} catch (Exception $e) {

    echo "Error: " . $e->getMessage();

}*/

/*$deleteClient = [
    
    "id_cliente"        => "4"

];

try {

    $response = deleteData("clientes", $deleteClient);
    print_r($response);

} catch (Exception $e) {

    echo "Error: " . $e->getMessage();

}*/