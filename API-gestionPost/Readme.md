RESTful API para Gestión de Posts

-Prerequisitos
.Node.js 18+
.PostgreSQL database
.npm or yarn

-Instalaciones

npm install
//este comando instalara todas las dependencias utilizadas

-Editar .env con la configuracion de tu base de datos
DB_USER
DB_PASSWORD
DB_NAME=gestion_post
DB_PORT=5432
JWT_SECRET=ultra-secreto

DATA SETUP
1. En la carpeta scripts, esta la base de datos backup.sql
2. Si tienes window Ubuntu, lleva el archivo entre a home y dentro
de tu usuario colocar el archivo sql donde lo desea
3. Para abrir lo ingrese el codigo; psql -U postgres -h localhost -p 5432 luego \c gestion_post

Insomnia Demostracion
1. Dentro de la carpeta scripts hay un archivo insomnia para levantarlo tienes que hacer estos simples pasos:
2. Colocalo en el escritorio de tu computadora o en el lugar que desees.
3. Entras a insomnia, haces click en el boton import que esta al lado del boton create
4. Subes el archivo que deseas importar, lo escaneas y lo importas

Para correr nuestro proyecto entramos en la consola y colocamos
npm run dev

La estructura del proyecto backend es:

src/
├── data/ 
├── lib/             
├── middlewares/        
├── types/
├── scripts/            
├── index.ts      
