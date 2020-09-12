<?php

if (!isset($_POST['data'])) { die('Invalid url.'); }

// Retrieve data from $_POST variable.
$post_data = json_decode($_POST['data'], true);


// Configure mail.
$to      = "iconfidence@gmail.com";
// $to      = "hola@wiskipix.com";
$subject = "Mensaje de wiskipix.mx";
$message = "";

$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
$headers .= 'From: Contacto WiskiPix <no-reply@wiskipix.mx>' . "\r\n";
// $headers .= 'Cc: birthdayarchive@example.com' . "\r\n";
$headers .= 'Bcc: iconfidence@gmail.com' . "\r\n";


// Extract each data from form to create the mail message.
foreach ($post_data['data'] as $key => $value) {
    $message .= "$key: $value<br />";
}


// Send mail and return if the sending was successfully.
echo mail($to, $subject, $message, $headers);
