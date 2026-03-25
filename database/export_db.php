<?php
// Simple SQLite to MySQL SQL Dump Script

$sqliteFile = __DIR__ . '/database.sqlite';
$outputFile = __DIR__ . '/wecasor_dump.sql';

if (!file_exists($sqliteFile)) {
    die("Error: SQLite file not found at $sqliteFile\n");
}

try {
    $db = new PDO("sqlite:$sqliteFile");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sqlDump = "";

    // Disable foreign key checks for import
    $sqlDump .= "SET FOREIGN_KEY_CHECKS = 0;\n\n";

    // Get all tables
    $tables = $db->query("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")->fetchAll(PDO::FETCH_COLUMN);

    foreach ($tables as $table) {
        $sqlDump .= "-- Data for table: $table\n";
        // Pehle purana data clear karein (agar migration se table ban chuki hai)
        $sqlDump .= "TRUNCATE TABLE `$table`;\n";

        // Get data
        $rows = $db->query("SELECT * FROM `$table`")->fetchAll(PDO::FETCH_ASSOC);
        foreach ($rows as $row) {
            $keys = array_keys($row);
            $values = array_map(function($val) use ($db) {
                if ($val === null) return 'NULL';
                return $db->quote($val);
            }, array_values($row));

            $sqlDump .= "INSERT INTO `$table` (`" . implode("`, `", $keys) . "`) VALUES (" . implode(", ", $values) . ");\n";
        }
        $sqlDump .= "\n";
    }

    $sqlDump .= "SET FOREIGN_KEY_CHECKS = 1;\n";

    file_put_contents($outputFile, $sqlDump);
    echo "Successfully exported database to: $outputFile\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
