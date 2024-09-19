<?php
function get_sequences($head) {
    $sequences = [];
    $dirs = glob($head . '/*', GLOB_ONLYDIR);
    foreach ($dirs as $dir) {
	$sequences[] = glob($dir . '/*', GLOB_ONLYDIR);
    }
    return $sequences;
}


$seqs = get_sequences("images");
    error_log(print_r($seqs,true));
echo json_encode($seqs);
?>