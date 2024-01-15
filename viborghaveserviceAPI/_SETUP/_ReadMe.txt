

TIL DATASERVICE - AFSLUTTENDE OPGAVE
(reduceret opgave ift. oprindelig eksamensopgave)

----------------------------------------------------------------------------------------------------------------
------ OPSTART: ------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

1. Opret (restore/genskab) først databasen 
    - læs hvordan i txt-filen her: _OPSÆTNING\collections og data til mongodb\_Guide - installation af collections MongoDB.txt

2. Import alle Postman-request til API'et ind i dit Postman-Program eller Insomnia
    - du finder dem i mappen _OPSÆTNING\Postman til import
    - i Insomnia i øverste højre hjørne (Insomnia / Insomnia) - klik på den lille pil og vælg Import/Export og herefter import ...

3. Start API'et op (se afsnittet herunder) - tjek at der ikke er fejl i terminalen

4. Test Postman-/Insomnia-request - at GET-metoder virker og returnerer data

----------------------------------------------------------------------------------------------------------------
------ START API/BACKEND: --------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

Produktion (rettelser i backend/her kræver genstart af serveren!): 
    npm run START

Developer (rettelser i backend/her genstarter automatisk serveren - benytter nodemon): 
    npm run devStart

Projektet kører på PORT 5023 - dvs. http://localhost:5023

Projektet benytter MongoDB - tjek .env-filen for at tilrette evt. path/sti til din MongoDB


----------------------------------------------------------------------------------------------------------------
------ BILLEDER --------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------

UPLOAD: Alle uploadede (post og put) image-filer sendes til en af mapperne (afhæng af route) 

    /public/images/...

REQUEST: Billederne hentes fra frontend fx med følgende adresse (hvis du ikke har ændret på PORT'en):

    http://localhost:5023/images/xxxxxxx.jpg

 