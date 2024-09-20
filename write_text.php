<?php
// get the data from the POST message
	$post_data = json_decode(file_get_contents('php://input'), true);
	$data = $post_data['filedata'];	
	$file_name = $post_data['fname'];
	file_put_contents($file_name, $data);
?>
