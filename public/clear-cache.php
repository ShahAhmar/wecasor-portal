<?php
opcache_reset();
$cachePath = __DIR__.'/../bootstrap/cache/';
$files = ['packages.php', 'services.php', 'config.php', 'routes-v7.php', 'events.php'];
foreach ($files as $file) {
    if (file_exists($cachePath . $file)) {
        unlink($cachePath . $file);
    }
}
echo "Cache and OPcache cleared successfully.";
