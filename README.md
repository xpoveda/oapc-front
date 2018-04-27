```
  _________  ______   ____           _/ ____\______  ____   _____/  |_ 
 /  _ \__  \ \____ \_/ ___\   ______ \   __\\_  __ \/  _ \ /    \   __\
(  <_> ) __ \|  |_> >  \___  /_____/  |  |   |  | \(  <_> )   |  \  |  
 \____(____  /   __/ \___  >          |__|   |__|   \____/|___|  /__|  
           \/|__|        \/                                    \/      
```

Despues de descargar `npm install`.

Para ejecutar `npm start`.


Añadidos Pol
```
https://github.com/ezendirak/Base-OAPC-Front
https://github.com/ezendirak/Base-OAPC-Server
```

```
ng build --env=prod
```
```
<IfModule mod_rewrite.c>
    RewriteEngine on

    # Don't rewrite files or directories
    RewriteCond %{REQUEST_FILENAME} -f [OR]
    RewriteCond %{REQUEST_FILENAME} -d
    RewriteRule ^ - [L]

    # Rewrite everything else to index.html
    # to allow html5 state links
    RewriteRule ^ index.html [L]
</IfModule>
```
