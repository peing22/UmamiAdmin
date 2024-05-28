<?php
/* Av Petra Ingemarsson */

include("includes/config.php");

// Skapar instans av klass
$user = new User();

// Om metoden som kontrollerar att användaren är inloggad returnerar false
if (!$user->loggedIn()) {

    // Skickar vidare till att logga in
    header('Location: index.php');
}

$page_title = "Bokningar";
include("includes/header.php");
?>

        <!-- Rubrik -->
        <h1>Bokningar</h1>

        <!-- Tabell för bokningar -->
        <table>
            <thead>
                <tr>
                    <th>Datum</th>
                    <th>Tid</th>
                    <th>Antal</th>
                    <th>Namn</th>
                    <th>Telefonnummer</th>
                </tr>
            </thead>
            <tbody id="reservation-table"></tbody>
        </table>
    </main>
    <!-- Länkar in JS-fil -->
    <script src="js/reservation.js"></script>
</body>

</html>