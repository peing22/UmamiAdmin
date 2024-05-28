/* Av Petra Ingemarsson */

"use strict";

// Lagrar URL till webbtjänst
const url = "https://studenter.miun.se/~pein2200/writeable/dt173g/projekt/webservice/reservation.php"

// Hämtar element från DOM
const reservationTableEl = document.getElementById("reservation-table");

// När webbläsaren har laddat klart körs funktionen init
window.onload = init;
function init() {

    // Anropar funktion
    getReservations();
}

// Funktion för att hämta bokningar från webbtjänst
function getReservations() {

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
                .then(data => printReservations(data))

                // Fångar upp eventuellt felmeddelande
                .catch(err => console.log(err))
        })
}

// Funktion för att skriva ut bokningar till DOM
function printReservations(reservations) {

    // Tömmer tabell på innehåll
    reservationTableEl.innerHTML = "";

    // Loopar igenom array
    reservations.forEach(reservation => {

        // Avkodar eventuella HTML-taggar
        let decodedName = decode(reservation.resname);
        let decodedPhone = decode(reservation.resphone);

        // Skriver ut till tabell
        reservationTableEl.innerHTML += `<tr>
        <td id="resdate${reservation.id}" contenteditable>${reservation.resdate}</td>
        <td id="restime${reservation.id}" contenteditable>${reservation.restime}</td>
        <td id="resquantity${reservation.id}" contenteditable>${reservation.resquantity}</td>
        <td id="resname${reservation.id}" contenteditable>${decodedName}</td>
        <td id="resphone${reservation.id}" contenteditable>${decodedPhone}</td>
        <td><button data-id="${reservation.id}" class="reservation-update-btn">Uppdatera</button></td>
        <td><button data-id="${reservation.id}" class="reservation-delete-btn">Radera</button></td></tr>`;
    });

    // Hämtar element
    let reservationUpdateBtn = document.getElementsByClassName("reservation-update-btn");
    let reservationDeleteBtn = document.getElementsByClassName("reservation-delete-btn");

    // Loopar igenom array
    for (let i = 0; i < reservationUpdateBtn.length; i++) {

        // Adderar händelselyssnare för att anropa funktion vid klick
        reservationUpdateBtn[i].addEventListener("click", updateReservation);
    }

    // Loopar igenom array
    for (let i = 0; i < reservationDeleteBtn.length; i++) {

        // Adderar händelselyssnare för att anropa funktion vid klick
        reservationDeleteBtn[i].addEventListener("click", deleteReservation);
    }
}

// Funktion för att ta bort eventuella HTML-taggar
function decode(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");
    return txt.documentElement.textContent;
}

// Funktion för att uppdatera bokning
function updateReservation(event) {

    // Läser in värden för den aktuella bokningen
    let id = event.target.dataset.id;
    let resdate = document.getElementById("resdate" + id).innerHTML;
    let restime = document.getElementById("restime" + id).innerHTML;
    let resquantity = document.getElementById("resquantity" + id).innerHTML;
    let resname = document.getElementById("resname" + id).innerHTML;
    let resphone = document.getElementById("resphone" + id).innerHTML;

    // Avkodar eventuella HTML-taggar
    let decodedResname = decode(resname);
    let decodedResphone = decode(resphone);
    let decodedResdate = decode(resdate);
    let decodedTime = decode(restime);

    // Konverterar till heltal
    resquantity = parseInt(resquantity);

    // Kontrollerar värden
    if (isNaN(resquantity) || resquantity < 1) {

        // Om ej siffra över noll skickas meddelande
        alert("Endast siffror större än noll accepteras!");

    } else if (decodedResname === "" || decodedResphone === "" || decodedResdate === "" || decodedTime === "") {

        // Om något fält är tomt skickas meddelande
        alert("Inget fält får lämnas tomt!");

    } else {
        // Skapar objekt, omvandlar till JSON och lagrar i variabel
        let jsonString = JSON.stringify({
            resname: decodedResname,
            resphone: decodedResphone,
            resdate: decodedResdate,
            restime: decodedTime,
            resquantity: resquantity
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

// Funktion för att radera bokning
function deleteReservation(event) {

    if (window.confirm("Bokningen kommer raderas!")) {

        // Lagrar bokningens id i variabel
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
            .then(data => getReservations())

            // Fångar upp eventuellt felmeddelande
            .catch(err => console.log(err))
    }
}