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

$page_title = "Meny";
include("includes/header.php");
?>

        <!-- Rubrik -->
        <h1>Meny</h1>

        <!-- Underrubrik -->
        <h2>Förrätt</h2>

        <!-- Tabell för förrätter -->
        <table>
            <thead>
                <tr>
                    <th>Namn</th>
                    <th>Beskrivning</th>
                    <th>Pris</th>
                    <th>Kategori</th>
                </tr>
            </thead>
            <tbody id="menu-starter-table"></tbody>
        </table>

        <!-- Underrubrik -->
        <h2>Varmrätt</h2>

        <!-- Tabell för förrätter -->
        <table>
            <thead>
                <tr>
                    <th>Namn</th>
                    <th>Beskrivning</th>
                    <th>Pris</th>
                    <th>Kategori</th>
                </tr>
            </thead>
            <tbody id="menu-maincourse-table"></tbody>
        </table>

        <!-- Underrubrik -->
        <h2>Dessert</h2>

        <!-- Tabell för förrätter -->
        <table>
            <thead>
                <tr>
                    <th>Namn</th>
                    <th>Beskrivning</th>
                    <th>Pris</th>
                    <th>Kategori</th>
                </tr>
            </thead>
            <tbody id="menu-dessert-table"></tbody>
        </table>

        <!-- Underrubrik -->
        <h2>Dryck</h2>

        <!-- Tabell för drycker -->
        <table>
            <thead>
                <tr>
                    <th>Namn</th>
                    <th>Beskrivning</th>
                    <th>Pris</th>
                    <th>Kategori</th>
                </tr>
            </thead>
            <tbody id="menu-drinks-table"></tbody>
        </table>

        <!-- Underrubrik -->
        <h2 id="menu-change-heading">Lägg till alternativ</h2>

        <!-- Formulär -->
        <form>
            <label for="title">Namn:</label><br>
            <input type="text" name="title" id="title"><br><br>
            <label for="descript">Beskrivning:</label><br>
            <input type="text" name="descript" id="descript"><br><br>
            <label for="price">Pris:</label><br>
            <input type="number" name="price" id="price"><br><br>
            <label for="category">Kategori:</label><br>
            <select name="category" id="category">
                <option value="Förrätt">Förrätt</option>
                <option value="Varmrätt">Varmrätt</option>
                <option value="Dessert">Dessert</option>
                <option value="Dryck">Dryck</option>
            </select><br><br>
            <div id="menu-message"></div>
            <input type="submit" class="btn" value="Lägg till" id="menu-add-btn">
            <input type="submit" class="btn" value="Ändra" id="menu-update-btn" data-id="">
        </form>
    </main>
<!-- Länkar in JS-fil -->
<script src="js/menu.js"></script>
</body>

</html>