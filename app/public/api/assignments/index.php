<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT a.assignment_id, g.game_field, g.game_date, g.start_time, g.end_time, r.referee_name
        FROM assignment a, game g, referee r
        WHERE g.game_id = a.game_id AND r.referee_id = a.referee_id';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;