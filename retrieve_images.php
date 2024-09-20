<?php
function retrieveImages($dir) {
    $images = [];
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir));
    foreach ($files as $file) {
        if (in_array(strtolower($file->getExtension()), ['jpg', 'jpeg', 'png', 'gif'])) {
            $images[] = $file->getPathname();
        }
    }
    sort($images);
    return $images;
}

$folder = $_GET['folder'];
$images = retrieveImages($folder);
echo json_encode($images);
?>