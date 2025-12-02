Guía de cómo realizar la configuración y levantamiento de la aplicación en archivo README.md

1. Crea en mi config el archivo db para crear nuestra configuracion
pool para interactuar con mayor eficienca en la base de datos, importamos Pool de pg.

2. Sigue contruir las funciones para capturar los datos que se guardan
en la base de datos

3. Creamos los get para capturar los funciones..

4. No olvidemos colocar:
app.use(express.json()) que nos permite leer el cuerpo como si fuera un objeto, recordemos que realizamos peticiones como JSON, con esto
NODE no tendra errores y podre leerlo libremen en cualquier ruta, porque estamos usando app.use
app.use(cookieParser()), lo utilizaremos mas tarde, esto permite a Express poder leer las cookie enviadas por el navegador
5. pool