# AirBnb-Clone-Capstone

Questa è una Web App Full Stack che consente di eseguire prenotazioni, aggiungere preferiti e gestire le funzionalità dell'host.

## Features 📱

### Sicurezza 🔒

🔑 La sicurezza gestita da back-end contiene la crittografia della password e la distinzione tra Guest e Host.
📲 Accesso con Google: l'autenticazione con Google permette di risparmiare tempo accedendo direttamente col proprio account.

### Funzionalità del Guest 👩 👨  📅

📄 Catalogo strutture: tutte le strutture sono visibili in homepage.  
🔍 Ricerca: la ricerca si basa sul luogo, date di check-in, check-out e ospiti.  
📖 Filtro: possibilità di filtrare per categorie.  
📃 Pagina di dettaglio: consente di visualizzare i dettagli della struttura e dell'host inoltre offre la possibilità di prenotare e lasciare una recensione.  
👜 Sezione dei viaggi: permette al guest di visualizzare le informazioni inerenti alla prenotazione, confermarla pagando oppure eliminarla.  
💖 Sezione dei preferiti: permette al guest di visualizzare le strutture da tener d'occhio.  
👩 👨 Area Personale: visualizzare i dettagli dell'utente, aggiungere dettagli, modificare e cancellare il profilo oppure fare il logout.  

### Funzionalità dell' Host 👩 👨 💼 

🧑‍💻 Gestione delle strutture: la dashboard permette di visualizzare le strutture, filtrarle per nome, controllare le prenotazioni e il relativo stato oppure rimuoverle.  
📝 Aggiunta o modifica: permette di aggiungere o modificare le caratteristiche della struttura.  

## Tecnologie utilizzate

### Frontend:

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" />

### Backend:

<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />


### Database:

<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />


## Setup 🔧

### Backend setup:

Entra nella cartella back-end:
````
cd back-end
````
Esegui l'installazione di tutti i pacchetti:
````
npm install
````
Aggiungi il file di ambiente .env e inserisci i seguenti campi:
````
PORT
DB_URL
C_CLOUD_NAME
C_API_KEY
C_API_SECRET
JWT_SECRET
G_CLIENT_ID
G_CLIENT_SECRET 
G_CB
````
Fai partire il back-end:
````
npm start
````

### Frontend setup:

Entra nella cartella front-end:
````
cd front-end
````
Esegui l'installazione di tutti i pacchetti:
````
npm install
````
Fai partire la web app:
````
npm start
````

## Utilizzo 🌐💻

## Guest 👩 👨
1) Effettua la registrazione e non dichiarare che sei un host oppure effettua il login (puoi anche eseguire sia registrazione che log-in con Google).  
2) Puoi utilizzare la barra di ricerca per scoprire se il luogo e le date per cui vuoi prenotare sono disponibili, puoi anche cercare per categoria.  
3) Apri l'inserzione ed effettua la prenotazione, eventualmente puoi lasciare anche una recensione.  
4) Recati nella sezione delle prenotazioni e scegli se pagare o cancellare la prenotazione, eventualmente puoi aggiungerla ai preferiti.

## Host 🧑‍💻
1) Effettua la registrazione dichiarando che sei un host, oppure effettua il login.
2) Puoi cercare qualsiasi altra inserzione proprio come il guest.
3) Nella sezione Host Dashboard è possibile visualizzare tutte le strutture aggiunte con una barra di ricerca che filtra per nomi, è possibile controllare anche le prenotazioni inerenti a una singola inserzione con i dati dell' utente, le date, il prezzo e lo status.
4) Sempre nella sezione dedicata all'host è possibile modificare cancellare o aggiungere una nuova inserzione.

# Federico Manna