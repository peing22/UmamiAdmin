<?php
/* Av Petra Ingemarsson */

class User
{
    // Properties
    private $url;
    private $apikey;

    // Konstruerare som sätter värden för properties
    public function __construct()
    {
        // URL och API-nyckel
        $this->url = "https://studenter.miun.se/~pein2200/writeable/dt173g/projekt/webservice/admin.php";
        $this->apikey = "QOat53BjU09GgFLx3h11kJBdYQP84Fc4";
    }

    // Metod för att logga in användare
    public function loginUser(string $username, string $password): bool
    {
        // Initierar cURL-session
        $ch = curl_init($this->url);

        // Konfigurerar cURL-förfrågan
        curl_setopt($ch, CURLOPT_HTTPHEADER, array("Apikey: $this->apikey"));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

        // Lagrar respons från cURL-förfrågan i en variabel
        $response = curl_exec($ch);

        // Stänger cURLsession
        curl_close($ch);

        // Avkodar och lagrar array i variabel
        $result = json_decode($response, true);

        // Loopar genom array och lagrar värden i variabler
        foreach ($result as $key => $value) {
            $storedUsername = $value['username'];
            $storedPassword = $value['password'];
        }

        // Kontrollerar om inmatat användarnamn och lösenord stämmer överens med lagrat
        if ($username === $storedUsername and password_verify($password, $storedPassword)) {

            // Skapar sessionsvariabel som lagrar användarnamn
            $_SESSION['username556'] = $username;

            return true;
        } else {
            return false;
        }
    }

    // Metod som kontrollerar om användare är inloggad
    public function loggedIn(): bool
    {
        // Om sessionsvariabel existerar
        if (isset($_SESSION['username556'])) {
            return true;
        } else {
            return false;
        }
    }
}
