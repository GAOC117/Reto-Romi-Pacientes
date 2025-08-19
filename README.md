# Proyecto ROMI Patients - React + Laravel

**Proyecto de ejemplo que combina Laravel como backend y React como frontend para manejo de pacientes.**

---

## Estructura de Carpetas

- `laravel-X01-romi-patients` → Backend Laravel
- `react-X01-romi-patients` → Frontend React

---

## Requisitos

- PHP >= 8.1
- Composer
- Node.js >= 18
- npm o yarn
- SQLite (ya configurado en el proyecto)

---

## Backend - Laravel

### Configuración

1. Entra a la carpeta del backend:
-> cd laravel-X01-romi-patients

2. Instala las dependencias:
-> composer install

3. Copia el archivo de ejemplo .env.example y crea tu .env:
-> cp .env.example .env

4. Configura la base de datos SQLite:
* En la carpeta database en el proyecto de laravel crea: 
-> database.sqlite y en la variable de entorno DB_DATABASE asignarle database/database.sqlite

Genera la clave de la aplicación:
-> php artisan key:generate

5. Ejecuta las migraciones:
-> php artisan migrate

6. Levanta el servidor:
-> php artisan serve

Por defecto Laravel correrá en http://127.0.0.1:8000.

7. Puedes correr el seeder PatientSeeder para llenar la base de datos con 10 registros aleatoreos
-> php artisan db:seed

______________________________________________________

## Frontend - React

### Configuración

1. Entra a la carpeta del frontend:
-> cd react-X01-romi-patients


2. Instala las dependencias:
-> npm install


Nota: Se usan dependencias como React Toastify para notificaciones, React Router Dom, etc.

3. Crea el archivo .env.local basado en tu entorno local:
-> VITE_API_URL=http://127.0.0.1:8000

Ajusta la URL según donde esté corriendo tu backend Laravel.

4. Levanta el servidor de desarrollo:
-> npm run dev

## Uso

Accede al frontend (http://localhost:5173 por defecto si usas Vite) para manejar pacientes.
El backend ofrece los endpoints en http://127.0.0.1:8000/api/patients.

## Scripts útiles
### Laravel

* php artisan serve → Levanta el servidor local.
* php artisan migrate → Ejecuta migraciones.
* php artisan db:seed → Si hubiera seeders, ejecuta datos de prueba.

### React

* npm run dev → Levanta el servidor de desarrollo.
* npm run build → Genera build para producción.



Hecho con ❤️ por GAOC