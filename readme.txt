Za pokretanje instalirajte Node.

Ukoliko ga već imate možete update npm-a uraditi
npm install -g npm

zatim instalirajte globalno gulp i bower:
npm install -g bower
npm install -g gulp

Zatim iz terminalom se pozicionirajte na u ovaj folder gdje su package.json i bower.json i instalirajte pakete. Ukoliko zapne ponovite. Npm install može dugo trajati jer ima dosta da se instalira
npm install
bower install

Ako želite pokrenuti stranicu ukucajte:
gulp serve

i buildat će se stranica, neke sitne stvari i pokrenuti na localhost:3000 čini mi se, ali samo će se otvoriti u defaultnom browseru i pisat će u konzoli koja stranica.

Što se tiče template-a samog, kodira se u folderu
src/app

Nove komponente tipa: Songs, Playlists, SongsPlayer, Authors, ... stavljate u src/app/components (logicno), možete vidjeti kako izgleda recimo za account modul otprilike fileovi.

account.less - CSS(Less)
account.module.js - samo definiranje modula i dependecija
account.route.js - definiranje rutiranja (ovdje je onaj AngularUI state router, sad sam mu ime zaboravio)
account.service.js / account.factory.js - samo ime kaze
account.ctrl.js - samo kontroler 
mogu biti i recimo

user.directive.js - direktiva usera
user.tmpl.html - template za usera

ili account.tmpl.js gdje je ovo template za routiranje koji je naveden u rutiranju u account.route.js
