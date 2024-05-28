<?php
/* Av Petra Ingemarsson */
?>
<!DOCTYPE html>
<html lang="sv">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $site_title . $divider . $page_title; ?></title>
    <!-- Länkar in CSS -->
    <link rel="stylesheet" href="css/main.css">
</head>

<body>
    <!-- Sidhuvud -->
    <header id="header">
        <!-- Navigeringsmeny -->
        <nav>
            <ul>
                <?php
                // Om inloggad användare
                if (isset($_SESSION['username556'])) {

                    // Skriver ut länkar
                    echo "<li><a href='reservation.php'>Bokningar</a></li>";
                    echo "<li><a href='menu.php'>Meny</a></li>";
                    echo "<li><a href='presentation.php'>Presentation</a></li>";
                    echo "<li><a href='logout.php'>Logga ut</a></li>";
                }
                ?>

            </ul>
        </nav>
    </header>
    <!-- Huvudinnehåll -->
    <main>