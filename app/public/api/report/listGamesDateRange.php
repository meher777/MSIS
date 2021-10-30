<?php

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    exit;
}

require("class/DbConnection.php");

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
        'SELECT g.game_field, 
                g.game_date, 
                g.start_time,
                g.end_time,
                r.referee_name 
                FROM game g, referee r, assignment a 
                WHERE r.referee_id = a.referee_id AND 
                      g.game_id = a.game_id AND 
                      g.game_date > ? and g.game_date < ?  and r.referee_id = ?'

    );

$stmt->execute([
  $_POST['game_date'],
  $_POST['game_date'],
  $_POST['referee_id']
 ]);


// Get auto-generated PK from DB
// https://www.php.net/manual/en/pdo.lastinsertid.php
// $pk = $db->lastInsertId();  

// Step 4: Output
// Here, instead of giving output, I'm redirecting to the SELECT API,
// just in case the data changed by entering it
header('HTTP/1.1 303 See Other');
header('Location: ../books/');