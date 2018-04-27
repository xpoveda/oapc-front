```
  _________  ______   ____           _/ ____\______  ____   _____/  |_ 
 /  _ \__  \ \____ \_/ ___\   ______ \   __\\_  __ \/  _ \ /    \   __\
(  <_> ) __ \|  |_> >  \___  /_____/  |  |   |  | \(  <_> )   |  \  |  
 \____(____  /   __/ \___  >          |__|   |__|   \____/|___|  /__|  
           \/|__|        \/                                    \/      
```

Pruebas
-------
Despues de descargar `npm install`.

Para ejecutar `npm start`.


Producción
-----------
Generación mediante `ng build --env=prod` y copia de `dist` a DocumentRoot

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
