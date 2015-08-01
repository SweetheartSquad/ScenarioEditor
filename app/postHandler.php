<?php
$json = file_get_contents("php://input");

$fp = fopen('savedFile.json', 'w');
fwrite($fp, $json);
fclose($fp);

?>