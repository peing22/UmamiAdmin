<?php
/* Av Petra Ingemarsson */

include("includes/config.php");
$page_title = "Logga in";
include("includes/header.php");

// Sätter standardvärde för att variabel för utskrift av meddelande inte ska ge felmeddelande
$loginAdminMessage = "";

// Kontroll att formulärdata är angivet
if (isset($_POST['username'])) {

    // Lagrar formulärdata i variabler
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Skapar instans av klass
    $user = new User();

    // Kontroll om loginUser-metod returnerar true
    if ($user->loginUser($username, $password)) {

        // Skickar vidare till bokningssidan
        header('Location: reservation.php');
    } else {
        // Lagrar meddelande i variabel för utskrift under formulär
        $loginAdminMessage = "<p class='login-message'>Felaktigt användarnamn eller lösenord!</p>";
    }
}
?>

        <h1>Logga in</h1>
        <form action="index.php" method="post">
            <label for="username">Användarnamn:</label><br>
            <input type="text" id="username" name="username" required><br><br>
            <label for="password">Lösenord:</label><br>
            <input type="password" id="password" name="password" required><br><br>
            <?= $loginAdminMessage ?>

            <input type="submit" value="Logga in">
        </form>
    </main>
</body>

</html>