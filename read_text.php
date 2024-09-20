<?php
function retrieveSeqs($fname) {
// get the data from the POST message
	$file = fopen($fname, 'r') or die('Unable to open file!');
	// Read the file content
	$content = fread($file, filesize($fname));
        // Close the file
	fclose($file);
    	return $content;
}

$fname = $_GET['fname'];
$seqs = retrieveSeqs($fname);
echo json_encode($seqs);
?>