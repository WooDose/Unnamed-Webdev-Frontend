# Unnamed-Webdev-Frontend
Frontend para proyecto de desarrollo web, nombre: unnamed

Para cargar el proyecto, clonarlo, correr Yarn install sobre el directorio, y correr yarn start; debe estar corriendo el backend para que funcione la conexion al API.

# Cosas que se pueden hacer en el frontend:

en `/`:
* Iniciar sesion; se puede usar el usuario "diego" con password "diego1", o "user#" "pass#", sustituyendo # por cualquier numero entre 0 y 23, siempre que sea el mismo para user y pass
* Una vez que la pantalla se pone en blanco, ir a /mainscreen, no funciona el redireccionamiento automatico de la vista login hacia la vista main

en `/mainscreen`:
Esto aplica para todos los tipos de elemento (Images, videos, notes, links):
* Agregar un nuevo objeto, todos los campos deben llenarse para que funcione el boton submit de cada tipo;
* Darle like a un objeto, se debe hacer refresh para ver el cambio
* Darle disable a un objeto, solo se puede hacer si el objeto lo creo el mismo usuario, de lo contrario dara una alerta.

* Cerrar sesion, este si enviara de regreso al login screen. (`/`)

# Breakdown de requisitos que se implemntaron

* React
* Redux
* Saga
* Form
* Router 
* JWT

## Vistas
* Login
* Mainscreen

(Login no cuenta, entonces solo 1/3)

## Sagas:
(no se cuenta login ni refresh token)
*  watchImagesFetch
*  watchAddImage
*  watchRemoveImage
*  watchLikeImage
*  watchVideosFetch
*  watchAddVideo
*  watchRemoveVideo
*  watchLikeVideo
*  watchLinksFetch
*  watchAddLink
*  watchRemoveLink
*  watchLikeLink
*  watchNotesFetch
*  watchAddNote
*  watchRemoveNote
*  watchLikeNote
(16/20, en teoria se implemento tambien la de Edit para cada objeto, pero no sirvio entonces no los cuento)

## Reductores:
(No se cuentan los de Login)
Para cada uno de los 4 objetos implementados:
* getOne
* getAll
* isFetching
* isFetchingErrors

(16/10)

## Practicas vistas en clase:
Todas, excepto buen look and feel y empezar a trabajar con tiempo.

# Cosas que no se pueden hacer en el frontend, pero si en el backend

* Todas las mismas acciones de Add, Disable y like pero para las tablas que faltan (soundbytes y stories)
* Accion de "Edit Caption" para todas las tablas excepto Notes
* Ver todos los objetos que ha colocado un Poster(usuario)
* Ver notificaciones (estas llegan cuando alguien da un like a una imagen)
* Ver y recibir mensajes


