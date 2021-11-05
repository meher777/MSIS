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
        'SELECT a.referee_status, 
                g.game_field,
                g.game_date, 
                g.start_time, 
                g.end_time, 
                r.referee_name 
                FROM game g, referee r, assignment a 
                WHERE r.referee_id = a.referee_id AND 
                      g.game_id = a.game_id AND 
                      g.game_date > ? and a.referee_status = "unassigned"'       

    );

$stmt->execute([
  $_POST['game_date'],
  
 ]);

 $games = $stmt->fetchAll();
 if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
    echo "Referee Status,Game Field,Game Date,Start Time, End Time\r\n";
  
    foreach($games as $g) {
      echo "\"".$g['referee_status'] . "\","
          .$g['game_field'] . ","
          .$g['game_date'] . ","
          .$g['start_time'] . ","
          .$g['end_time']."\r\n";
    }
  
  } 

 // Step 3: Convert to JSON
 else {
     $json = json_encode($games, JSON_PRETTY_PRINT);
 
 // Step 4: Output
 header('Content-Type: application/json');
 echo $json;
 }
// Get auto-generated PK from DB
// https://www.php.net/manual/en/pdo.lastinsertid.php
// $pk = $db->lastInsertId();  

// Step 4: Output
// Here, instead of giving output, I'm redirecting to the SELECT API,
// just in case the data changed by entering it
