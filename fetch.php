<?php
/* This should be placed in root of php server */
header('Content-Type: application/json');
/* 
FETCH data from the Oxford API for front end REACT app
Oxford API currently does not support CORS, but requires auth key in the HEADER section, which requires CORS (or same domain)
in JavaScript.  Rather than set up an elaborate proxy, this server bassed script will query the API and submit the result back to REACT

This can be deprecated once Oxford API supports CORS based connections
*/
$url = 'https://od-api.oxforddictionaries.com/api/v1';


$cmd = $_GET['cmd'];

if (!$cmd) $cmd = "/domains/en";

$ch = curl_init($url.$cmd);
curl_setopt($ch, CURLOPT_TIMEOUT, 5);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Accept: application/json',
    'app_id: 43949f5b',
    'app_key: 17b58652e8227dcf5a783a90db777c60'
));
$data = curl_exec($ch);
curl_close($ch);
echo json_encode($data);

?>