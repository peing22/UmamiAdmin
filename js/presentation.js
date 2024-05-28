/* Av Petra Ingemarsson */

"use strict";

// Lagrar URL till webbtjänst
const url = "https://studenter.miun.se/~pein2200/writeable/dt173g/projekt/webservice/presentation.php"

// Hämtar element från DOM
const headerEl = document.getElementById("header");
const presentationTableEl = document.getElementById("presentation-table");
const paragraphInput = document.getElementById("paragraph");
const contentInput = document.getElementById("content");
const presentationMessageEl = document.getElementById("presentation-message");
const presentationAddBtn = document.getElementById("presentation-add-btn");

// Adderar händelselyssnare för att anropa funktion vid klick
presentationAddBtn.addEventListener("click", addParagraph);

// När webbläsaren har laddat klart körs funktionen init
window.onload = init;
function init() {

    // Anropar funktion
    getParagraphs();
}

// Funktion för att hämta stycke från webbtjänst
function getParagraphs() {

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
                .then(data => printParagraphs(data))

                // Fångar upp eventuellt felmeddelande
                .catch(err => console.log(err))
        })
}

// Funktion för att skriva ut stycken till DOM
function printParagraphs(paragraphs) {

    // Tömmer tabell på innehåll
    presentationTableEl.innerHTML = "";

    // Loopar igenom array
    paragraphs.forEach(paragraph => {

        // Avkodar eventuella HTML-taggar
        let decodedContent = decode(paragraph.content);

        // Skriver ut till tabell
        presentationTableEl.innerHTML += `<tr>
        <td id="paragraph${paragraph.id}" contenteditable>${paragraph.paragraph}</td>
        <td id="content${paragraph.id}" contenteditable>${decodedContent}</td>
        <td><button data-id="${paragraph.id}" class="paragraph-update-btn">Uppdatera</button></td>
        <td><button data-id="${paragraph.id}" class="paragraph-delete-btn">Radera</button></td></tr>`;
    });

    // Hämtar element
    let paragraphUpdateBtn = document.getElementsByClassName("paragraph-update-btn");
    let paragraphDeleteBtn = document.getElementsByClassName("paragraph-delete-btn");

    // Loopar igenom array
    for (let i = 0; i < paragraphUpdateBtn.length; i++) {

        // Adderar händelselyssnare för att anropa funktion vid klick
        paragraphUpdateBtn[i].addEventListener("click", updateParagraph);
    }

    // Loopar igenom array
    for (let i = 0; i < paragraphDeleteBtn.length; i++) {

        // Adderar händelselyssnare för att anropa funktion vid klick
        paragraphDeleteBtn[i].addEventListener("click", deleteParagraph);
    }
}

// Funktion för att ta bort eventuella HTML-taggar
function decode(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");
    return txt.documentElement.textContent;
}

// Funktion för att lägga till stycke
function addParagraph(event) {

    // Förhindrar att sidan laddas om vid klick på knapp
    event.preventDefault();

    // Läser in värden från formulär
    let paragraph = paragraphInput.value;
    let content = contentInput.value;

    // Kontrollerar input-fält
    if (paragraph < 1) {

        // Skriver ut meddelande
        presentationMessageEl.innerHTML = `<p>Fyll i en siffra större än noll för stycke!</p>`;

    } else if (content === "") {

        // Skriver ut meddelande
        presentationMessageEl.innerHTML = `<p>Fyll i textinnehåll!</p>`;

    } else {
        // Raderar eventuellt meddelande
        presentationMessageEl.innerHTML = "";

        // Skapar objekt, omvandlar till JSON och lagrar i variabel
        let jsonString = JSON.stringify({
            paragraph: paragraph,
            content: content
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
    paragraphInput.value = "";
    contentInput.value = "";

    // Skrollar upp på sidan
    headerEl.scrollIntoView();

    // Anropar funktion
    getParagraphs();
}

// Funktion för att uppdatera stycke
function updateParagraph(event) {

    // Läser in värden för det aktuella stycket
    let id = event.target.dataset.id;
    let paragraph = document.getElementById("paragraph" + id).innerHTML;
    let content = document.getElementById("content" + id).innerHTML;

    // Konverterar till heltal
    paragraph = parseInt(paragraph);

    // Avkodar eventuella HTML-taggar
    let decodedContent = decode(content);

    // Kontrollerar värden
    if (isNaN(paragraph) || paragraph < 1) {

        // Om ej siffra över noll skickas meddelande
        alert("Endast siffror större än noll accepteras!");

    } else if (decodedContent === "") {

        // Om textinnehåll är tomt skickas meddelande
        alert("Textinnehåll får inte vara tomt!");

    } else {
        // Skapar objekt, omvandlar till JSON och lagrar i variabel
        let jsonString = JSON.stringify({
            paragraph: paragraph,
            content: decodedContent
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

            // Anropar funktion för att ladda om sida
            .then(data => location.reload())

            // Fångar upp eventuellt felmeddelande
            .catch(err => console.log(err))
    }
}

// Funktion för att radera stycke
function deleteParagraph(event) {

    if (window.confirm("Stycket kommer raderas!")) {

        // Lagrar styckets id i variabel
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
            .then(data => getParagraphs())

            // Fångar upp eventuellt felmeddelande
            .catch(err => console.log(err))
    }
}