<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$method = $_SERVER['REQUEST_METHOD'];
if (!in_array($method, ['GET', 'POST'], true)) {
    header('Allow: GET, POST');
    http_response_code(405);
    echo json_encode(['error' => 'Desteklenmeyen istek.']);
    exit;
}

// This file is created only once, so deploying new builds preserves the count.
$handle = fopen(__DIR__ . '/sayac.json', 'c+');
if ($handle === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Sayaç dosyası açılamadı.']);
    exit;
}

try {
    if (!flock($handle, LOCK_EX)) {
        throw new RuntimeException('Sayaç kilitlenemedi.');
    }
    $contents = stream_get_contents($handle);
    $data = $contents === '' ? ['toplamHesaplama' => 700] : json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($data) || !isset($data['toplamHesaplama']) || !is_int($data['toplamHesaplama']) || $data['toplamHesaplama'] < 0) {
        throw new RuntimeException('Geçersiz sayaç verisi.');
    }
    if ($method === 'POST') {
        $data['toplamHesaplama']++;
    }
    if ($contents === '' || $method === 'POST') {
        $encoded = json_encode($data, JSON_THROW_ON_ERROR);
        rewind($handle);
        if (fwrite($handle, $encoded) !== strlen($encoded) || !ftruncate($handle, strlen($encoded)) || !fflush($handle)) {
            throw new RuntimeException('Sayaç kaydedilemedi.');
        }
    }
    echo json_encode($data, JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode(['error' => 'Sayaç şu anda kullanılamıyor.']);
} finally {
    flock($handle, LOCK_UN);
    fclose($handle);
}
