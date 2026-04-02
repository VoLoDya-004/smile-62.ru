<?php
    $isDocker = getenv('DOCKER_ENV') === 'true';

    if ($isDocker) {
        $hostname = 'mysql'; 
    } else {
        $hostname = 'localhost';
    }

    $username = 'root';
    $password = 'Silaev2004VladimirD!3003';
    $dbName   = 'shop';
?>