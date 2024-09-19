<?php
//header("Access-Control-Allow-Origin: *"); // Allow all origins
//header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Allow specific methods
//header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Allow specific headers

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Get the JSON data from the request body
    $json_data = file_get_contents("php://input");

    // Decode the JSON data
    $data = json_decode($json_data);

    // Check if the 'audio_base64' key exists in the decoded data
    if (isset($data->audio_base64)) {

        // Decode the base64-encoded audio data
        $audio_data = base64_decode($data->audio_base64);

        // Get the subject ID from the JSON data (replace 'your_subject_key' with the actual key)
        $subject_id = $data->subject_id;
        // Generate a unique ID for the audio file using the subject ID and current date
        $audio_id = generateUniqueID($subject_id);

        // Define the path to store the audio file
	// MG start change - retrieve sequence name from js and add to file name
	$folder=$data->folder;
	$seq_name = $data->seq_name;
	error_log("{$folder}/{$subject_id}/{$audio_id}_{$seq_name}.wav");	    
	if (!is_dir("{$folder}")) {
	// create part_1/2 folder if does not exist
	      if (!mkdir("{$folder}",0777, true)) {
		error_log("could not create ","{$folder}");
	      }
	}
	if (!is_dir("{$folder}/{$subject_id}")) {
	// create subject_id subfolder if does not exist
	      if (!mkdir("{$folder}/{$subject_id}",0777, true)) {
		error_log("could not create ","{$folder}/{$subject_id}");
	      }
	}
	// MG
	// MG  $audio_path = "audio_files/{$audio_id}.wav"; // Adjust the file extension as needed

        $audio_path = "{$folder}/{$subject_id}/{$audio_id}_{$seq_name}.wav"; // Adjust the file extension as needed
	// MG end change


        // Save the audio data to the file
        file_put_contents($audio_path, $audio_data);

        // Respond with a JSON object containing the generated audio ID
        echo json_encode(array('audio_id' => $audio_id));
    } else {
        // If 'audio_base64' key is not present in the data
        http_response_code(400); // Bad Request
        echo json_encode(array('error' => 'Invalid data format'));

    }
} else {
    // If the request is not a POST request
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('error' => 'Method not allowed'));
}

// Function to generate a unique ID using the current date and subject ID
function generateUniqueID($subject_id) {
    return $subject_id . '-' . date('Y-m-d-H-i-s'); // Concatenate subject ID with date
}