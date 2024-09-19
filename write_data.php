<?php
// get the data from the POST message
	$post_data = json_decode(file_get_contents('php://input'), true);
	$data = $post_data['filedata'];	
	// MG  - start change - adding retrieval of subject_id that is now provided by the saveData function
	$subject_id = $post_data['subject_id'];
	// MG - end change
	// generate a unique ID for the file, e.g., session-6feu833950202 
	$file = date("Y-m-d-h-i-sa");
	// the directory "data" must be writable by the server
	// MG start change - add subject_id as prefix of file
	// MG $name = "data/{$file}.csv"; 
	$folder = $post_data['folder'];
	if (!is_dir("{$folder}")) {
	// create part_1/2 folder if does not exist
	      if (!mkdir("{$folder}",0777, true)) {
		error_log("could not create ","{$folder}");
	      }
	}
	$file_name = "{$folder}/{$subject_id}-{$file}.csv"; 
	error_log($folder);
	// MG end change
	// write the file to disk
	file_put_contents($file_name, $data);
?>
