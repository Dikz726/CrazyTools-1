<?php
// Mengizinkan halaman HTML mengakses file ini (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Ambil data kiriman dari HTML
$inputData = json_decode(file_get_contents("php://input"), true);

if (isset($inputData['message']) && !empty($inputData['message'])) {
    $userMessage = $inputData['message'];

    // Kita pakai API publik gratisan untuk pemrosesan teks chat
    // Menggunakan teknik URL Encode agar teks aman dikirim lewat URL
    $apiUrl = "https://api.simsimi.vn/v1/simtalk";
    
    // Siapkan data untuk dikirim ke API
    $postData = http_build_query([
        'text' => $userMessage,
        'lc' => 'id' // Bahasa Indonesia
    ]);

    // Setup Request ke API menggunakan cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $apiUrl);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response) {
        $result = json_decode($response, true);
        // Ambil teks balasan dari API, jika gagal kasih teks fallback
        $aiReply = isset($result['message']) ? $result['message'] : "Aduh Flutter, otaknya lagi loading nih.. Coba chat lagi ya!";
    } else {
        $aiReply = "Maaf Flutter, koneksi ke otak AI luar lagi terputus nih.. 😢";
    }

    // Kirim balik jawaban ke HTML dalam format JSON
    echo json_encode(["reply" => $aiReply]);
} else {
    echo json_encode(["reply" => "Kirim pesan yang jelas dong, Flutter!"]);
}
?>