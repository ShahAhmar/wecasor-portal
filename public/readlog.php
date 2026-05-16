<?php
$logFile = __DIR__.'/../storage/logs/laravel.log';
if (!file_exists($logFile)) {
    die("Log file does not exist.");
}
$lines = file($logFile);
if ($lines === false) {
    die("Could not read log file.");
}
$found = false;
foreach (array_reverse($lines) as $i => $line) {
    if (strpos($line, '.ERROR') !== false || strpos($line, 'Exception') !== false || strpos($line, 'Stack trace') !== false) {
        echo htmlspecialchars($line) . "<br>";
        $found = true;
        if ($i > 100) break; // Print up to 100 lines of context if needed, but let's just break after a few
    }
}
if (!$found) {
    echo "No errors found in the recent logs.";
}
