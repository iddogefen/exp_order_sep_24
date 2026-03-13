<?php
// הגדרת כותרות למניעת שגיאות ב-JS
header('Content-Type: application/json');

// קבלת הנתונים הגולמיים מה-fetch
$post_data = json_decode(file_get_contents('php://input'), true);

if (isset($post_data['filedata'])) {
    $data = $post_data['filedata'];
    
    // יצירת שם קובץ פשוט עם תאריך, שעה וקוד אקראי
    // זה ימנע את כל השגיאות של "Undefined array key" שראינו ב-Log
    $filename = "exp_data_" . date("Y-m-d_H-i-s") . "_" . uniqid() . ".csv";
    
    // נתיב מלא כדי להיות בטוחים (Absolute Path)
    $path = "/var/www/html/exp_order_sep_24/data/" . $filename;
    
    // שמירת הקובץ
    if (file_put_contents($path, $data)) {
        echo json_encode([
            "status" => "success", 
            "file" => $filename
        ]);
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode([
            "status" => "error", 
            "message" => "Failed to write to data folder. Check permissions."
        ]);
    }
} else {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode([
        "status" => "error", 
        "message" => "No filedata received in JSON payload"
    ]);
}
?>