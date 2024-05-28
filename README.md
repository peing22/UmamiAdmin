# DT173G Projekt - Admingränssnitt
Detta repo innehåller ett admingränssnitt som konsumerar en webbtjänst för att hämta data om användaruppgifter som finns lagrade för en administratör som måste logga in för att kunna använda admingränssnittet. Applikationen konsumerar även webbtjänsten för att hämta data om bordsbokningar, meny och företagspresentation för en restaurang.

Väl inloggad är det även möjligt att
* lägga till olika menyalternativ samt olika textstycken för företagspresentationen via formulär
* ändra/uppdatera och radera bordsbokningar, menyalternativ och textstycken för företagspresentationen.

Lösningen är skapad med PHP, JavaScript och CSS. 

För att hämta (GET) data om användaruppgifterna används en cURL-session i PHP. För att hämta (GET), skicka (POST), ändra (PUT) och radera (DELETE) all annan data från webbtjänsten används Fetch API i JavaScript.

Länk till admingränssnitt: https://studenter.miun.se/~pein2200/writeable/dt173g/projekt/admin/
