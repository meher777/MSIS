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
                      g.game_date > ? and g.game_date < ?  and r.referee_name = ?'

    );

$stmt->execute([
  $_POST['start_date'],
  $_POST['end_date'],
  $_POST['referee_name']
 ]);


 $games = $stmt->fetchAll();
 if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
    echo "Game Field,Game Date,Start Time, End Time, Referee Name\r\n";
  
    foreach($games as $g) {
      echo "\"".$g['game_field']. "\","
                .$g['game_date'] . ","
                .$g['start_time'] . ","
                .$g['end_time'] . ","
                .$g['referee_name']."\r\n";
    }
  
  } 
  else {

  
 // Step 3: Convert to JSON
 $json = json_encode($games, JSON_PRETTY_PRINT);
 
 // Step 4: Output
 header('Content-Type: application/json');
 echo $json;}