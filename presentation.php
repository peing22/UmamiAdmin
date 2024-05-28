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

$page_title = "Presentation";
include("includes/header.php");
?>

        <!-- Rubrik -->
        <h1>Presentation</h1>

        <!-- Tabell för stycken -->
        <table>
            <thead>
                <tr>
                    <th>Stycke</th>
                    <th>Textinnehåll</th>
                </tr>
            </thead>
            <tbody id="presentation-table"></tbody>
        </table>

        <!-- Underrubrik -->
        <h2>Lägg till stycke</h2>

        <!-- Formulär -->
        <form>
            <label for="paragraph">Stycke:</label><br>
            <input type="number" name="paragraph" id="paragraph"><br><br>
            <label for="content">Textinnehåll:</label><br>
            <textarea name="content" id="content" rows="6"></textarea><br><br>
            <div id="presentation-message"></div>
            <input type="submit" class="btn" value="Lägg till" id="presentation-add-btn">
        </form>
    </main>
    <!-- Länkar in JS-fil -->
    <script src="js/presentation.js"></script>
</body>

</html>