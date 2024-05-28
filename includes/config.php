<?php
/* Av Petra Ingemarsson */

$site_title = "Admin";
$divider = " | ";

// Inkluderar klassfil(er) i övriga PHP-filer
spl_autoload_register(function ($class_name) {
    include 'classes/' . $class_name . '.class.php';
});

// Aktiverar session
session_start();
