/* Av Petra Ingemarsson */

"use strict";

// Lagrar URL till webbtjänst
const url = "https://studenter.miun.se/~pein2200/writeable/dt173g/projekt/webservice/menu.php"

// Hämtar element från DOM
const headerEl = document.getElementById("header");
const menuStarterTableEl = document.getElementById("menu-starter-table");
const menuMaincourseTableEl = document.getElementById("menu-maincourse-table");
const menuDessertTableEl = document.getElementById("menu-dessert-table");
const menuDrinksTableEl = document.getElementById("menu-drinks-table");
const titleInput = document.getElementById("title");
const descriptInput = document.getElementById("descript");
const priceInput = document.getElementById("price");
const categoryInput = document.getElementById("category");
const menuMessageEl = document.getElementById("menu-message");
const menuAddBtn = document.getElementById("menu-add-btn");
const menuUpdatBtn = document.getElementById("menu-update-btn");
const menuChangeHeading = document.getElementById("menu-change-heading");

// Adderar händelselyssnare för att anropa funktion vid klick
menuAddBtn.addEventListener("click", addDish);

// Döljer ändraknapp
menuUpdatBtn.style.display = "none";

// När webbläsaren har laddat klart körs funktionen init
window.onload = init;
function init() {

    // Anropar funktion
    getMenu();
}

// Funktion för att hämta meny från webbtjänst
function getMenu() {

    // Fetch-anrop med metoden GET
    fetch(url, {
        headers: {
            "Apikey": "QOat53BjU09GgFLx3h11kJBdYQP84Fc4"
        }
    })
        .then(response => {

            // Stoppar om statuskod inte är OK
            if (response.status != 200) {
                return
            }

            // Omvandlar respons till JSON
            return response.json()

                // Anropar funktion och skickar med data
                .then(data => printMenu(data))

                // Fångar upp eventuellt felmeddelande
                .catch(err => console.log(err))
        })
}

// Funktion för att skriva ut meny till DOM
function printMenu(menu) {

    // Tömmer tabell på innehåll
    menuStarterTableEl.innerHTML = "";
    menuMaincourseTableEl.innerHTML = "";
    menuDessertTableEl.innerHTML = "";
    menuDrinksTableEl.innerHTML = "";

    // Loopar igenom meny
    menu.forEach(dish => {

        // Avkodar eventuella HTML-taggar
        let decodedTitle = decode(dish.title);
        let decodedDescript = decode(dish.descript);

        // Beroende på kategori
        switch (dish.category) {

            case "Förrätt":

                // Skriver ut till tabell
                menuStarterTableEl.innerHTML += `<tr>
                <td>${decodedTitle}</td>
                <td>${decodedDescript}</td>
                <td>${dish.price} kr</td>
                <td>${dish.category}</td>
                <td><button data-id="${dish.id}" class="menu-change-btn">Ändra</button></td>
                <td><button data-id="${dish.id}" class="menu-delete-btn">Radera</button></td></tr>`;
                break;

            case "Varmrätt":

                // Skriver ut till tabell
                menuMaincourseTableEl.innerHTML += `<tr>
                <td>${decodedTitle}</td>
                <td>${decodedDescript}</td>
                <td>${dish.price} kr</td>
                <td>${dish.category}</td>
                <td><button data-id="${dish.id}" class="menu-change-btn">Ändra</button></td>
                <td><button data-id="${dish.id}" class="menu-delete-btn">Radera</button></td></tr>`;
                break;

            case "Dessert":

                // Skriver ut till tabell
                menuDessertTableEl.innerHTML += `<tr>
                <td>${decodedTitle}</td>
                <td>${decodedDescript}</td>
                <td>${dish.price} kr</td>
                <td>${dish.category}</td>
                <td><button data-id="${dish.id}" class="menu-change-btn">Ändra</button></td>
                <td><button data-id="${dish.id}" class="menu-delete-btn">Radera</button></td></tr>`;
                break;

            case "Dryck":

                // Skriver ut till tabell
                menuDrinksTableEl.innerHTML += `<tr>
                <td>${decodedTitle}</td>
                <td>${decodedDescript}</td>
                <td>${dish.price} kr</td>
                <td>${dish.category}</td>
                <td><button data-id="${dish.id}" class="menu-change-btn">Ändra</button></td>
                <td><button data-id="${dish.id}" class="menu-delete-btn">Radera</button></td></tr>`;
                break;
        }
    });

    // Hämtar element
    let menuChangeBtn = document.getElementsByClassName("menu-change-btn");
    let menuDeleteBtn = document.getElementsByClassName("menu-delete-btn");

    // Loopar igenom array
    for (let i = 0; i < menuChangeBtn.length; i++) {

        // Adderar händelselyssnare för att anropa funktion vid klick
        menuChangeBtn[i].addEventListener("click", getDish);
    }

    // Loopar igenom array
    for (let i = 0; i < menuDeleteBtn.length; i++) {

        // Adderar händelselyssnare för att anropa funktion vid klick
        menuDeleteBtn[i].addEventListener("click", deleteDish);
    }
}

// Funktion för att ta bort eventuella HTML-taggar
function decode(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");
    return txt.documentElement.textContent;
}

// Funktion för att lägga till maträtt eller dryck
function addDish(event) {

    // Förhindrar att sidan laddas om vid klick på knapp
    event.preventDefault();

    // Läser in värden från formulär
    let title = titleInput.value;
    let descript = descriptInput.value;
    let price = priceInput.value;
    let category = categoryInput.value;

    // Kontrollerar om något input-fält är tomt
    if (title === "" || descript === "" || price < 1) {

        // Skriver ut meddelande
        menuMessageEl.innerHTML = `<p>Fyll i korrekta värden i alla fält!</p>`;

        // Kontrollerar om det första input-fältet innehåller för många antal tecken
    } else if (title.length > 125) {

        // Skriver ut meddelande
        menuMessageEl.innerHTML = `<p>Du har angett för många tecken i ett eller flera fält!</p>`;

    } else {
        // Raderar eventuellt meddelande
        menuMessageEl.innerHTML = "";

        // Skapar objekt, omvandlar till JSON och lagrar i variabel
        let jsonString = JSON.stringify({
            title: title,
            descript: descript,
            price: price,
            category: category
        })

        // Fetch-anrop med metoden POST
        fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Apikey": "QOat53BjU09GgFLx3h11kJBdYQP84Fc4"
            },
            body: jsonString
        })
            // Omvandlar respons till JSON
            .then(response => response.json())

            // Anropar funktion
            .then(data => clearForm())

            // Fångar upp eventuellt felmeddelande
            .catch(err => console.log(err))
    }
}

// Funktion för att rensa formulär
function clearForm() {
    titleInput.value = "";
    descriptInput.value = "";
    priceInput.value = "";
    categoryInput.value = "Förrätt";

    // Skrollar upp på sidan
    headerEl.scrollIntoView();

    // Anropar funktion
    getMenu();
}

// Funktion för att hämta specifik maträtt eller dryck från webbtjänst
function getDish(event) {

    // Ändrar rubrik och skrollar till formulär
    menuChangeHeading.innerHTML = "Ändra";
    menuChangeHeading.scrollIntoView();

    // Lagrar maträttens eller dryckens id i variabel
    let id = event.target.dataset.id;

    // Fetch-anrop med metoden GET
    fetch(url + "?id=" + id, {
        headers: {
            "Apikey": "QOat53BjU09GgFLx3h11kJBdYQP84Fc4"
        }
    })
        .then(response => {

            // Stoppar om statuskod inte är OK
            if (response.status != 200) {
                return
            }

            // Omvandlar respons till JSON
            return response.json()

                // Anropar funktion och skickar med data
                .then(data => printDishToForm(data))

                // Fångar upp eventuellt felmeddelande
                .catch(err => console.log(err))
        })
}

// Funktion för att skriva ut specifik maträtt eller dryck till formuläret
function printDishToForm(dish) {

    // Loopar igenom array och tillskriver respektive element ett värde
    dish.forEach(d => {
        titleInput.value = d.title;
        descriptInput.value = d.descript;
        priceInput.value = d.price;
        categoryInput.value = d.category;
        menuUpdatBtn.dataset.id = d.id;
    });

    // Döljer lägg-till-knapp och visar ändra-knapp
    menuAddBtn.style.display = "none";
    menuUpdatBtn.style.display = "inline";

    // Adderar händelselyssnare för att anropa funktion vid klick
    menuUpdatBtn.addEventListener("click", updateDish);
}

// Funktion för att uppdatera maträtt eller dryck
function updateDish(event) {

    // Förhindrar att sidan laddas om vid klick på knapp
    event.preventDefault();

    // Lagrar maträttens eller dryckens id i variabel
    let id = event.target.dataset.id;

    // Läser in värden från formulär
    let title = titleInput.value;
    let descript = descriptInput.value;
    let price = priceInput.value;
    let category = categoryInput.value;

    // Kontrollerar om något input-fält är tomt
    if (title === "" || descript === "" || price < 1) {

        // Skriver ut meddelande
        menuMessageEl.innerHTML = `<p>Vänligen fyll i korrekt värde i alla fält!</p>`;

        // Kontrollerar om det första input-fältet innehåller för många antal tecken
    } else if (title.length > 125) {

        // Skriver ut meddelande
        menuMessageEl.innerHTML = `<p>Du har angett för många tecken i ett eller flera fält!</p>`;

    } else {
        // Raderar eventuellt meddelande
        menuMessageEl.innerHTML = "";

        // Skapar objekt, omvandlar till JSON och lagrar i variabel
        let jsonString = JSON.stringify({
            title: title,
            descript: descript,
            price: price,
            category: category
        })

        // Fetch-anrop med metoden PUT
        fetch(url + "?id=" + id, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                "Apikey": "QOat53BjU09GgFLx3h11kJBdYQP84Fc4"
            },
            body: jsonString
        })
            // Omvandlar respons till JSON
            .then(response => response.json())

            // Anropar funktion
            .then(data => switchBackToAdd())

            // Fångar upp eventuellt felmeddelande
            .catch(err => console.log(err))
    }
}

// Funktion för att ändra tillbaka till "Lägg till"
function switchBackToAdd() {
    menuChangeHeading.innerHTML = "Lägg till";
    menuUpdatBtn.style.display = "none";
    menuAddBtn.style.display = "inline";

    // Anropar funktion
    clearForm();
}

// Funktion för att radera maträtt eller dryck
function deleteDish(event) {

    if (window.confirm("Alternativet kommer raderas!")) {

        // Lagrar maträttens eller dryckens id i variabel
        let id = event.target.dataset.id;

        // Fetch-anrop med metoden DELETE
        fetch(url + "?id=" + id, {
            method: "DELETE",
            headers: {
                "Apikey": "QOat53BjU09GgFLx3h11kJBdYQP84Fc4"
            }
        })
            // Omvandlar respons till JSON
            .then(response => response.json())

            // Anropar funktion
            .then(data => getMenu())

            // Fångar upp eventuellt felmeddelande
            .catch(err => console.log(err))
    }
}