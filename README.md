# Around the US - Proyecto Full Stack 🌎

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-18.x-blue)](https://reactjs.org/)

## 📋 Descripción del Proyecto

**Around the US** es una aplicación web interactiva que permite a los usuarios compartir fotografías de lugares interesantes alrededor de Estados Unidos. Los usuarios pueden crear un perfil, subir imágenes, dar "me gusta" a publicaciones y gestionar su propia galería de tarjetas.

Este proyecto representa la culminación del bootcamp de Desarrollo Web, integrando tecnologías de frontend y backend para crear una aplicación web completa y funcional.

---

![Login](./frontend/images/singin.png)
![Signin](./frontend/images/home.png))

## 🌐 Enlaces del Proyecto

- **Frontend**: [https://lucerofront.baselinux.net](https://lucerofront.baselinux.net)
- **API Backend**: [https://luceroapi.baselinux.net](https://luceroapi.baselinux.net)
- **Repositorio**: [GitHub](hhttps://github.com/luuzuriaga/web_project_api_full)

---

## ✨ Características Principales

### Funcionalidades de Usuario
- ✅ **Registro y Autenticación**: Sistema completo de registro e inicio de sesión con JWT
- ✅ **Gestión de Perfil**: Editar nombre, descripción y foto de avatar
- ✅ **Gestión de Tarjetas**: Crear, eliminar y visualizar tarjetas con imágenes
- ✅ **Sistema de Likes**: Dar y quitar "me gusta" a las tarjetas
- ✅ **Validación de Formularios**: Validación en tiempo real de todos los campos
- ✅ **Diseño Responsivo**: Interfaz adaptable a dispositivos móviles, tablets y desktop

### Características Técnicas
- 🔒 **Seguridad**: Autenticación JWT, encriptación de contraseñas con bcrypt
- 🚀 **Performance**: Compresión Gzip, caché de assets estáticos
- 📱 **SPA**: Single Page Application con React Router
- 🔄 **API RESTful**: Endpoints bien estructurados y documentados
- ✅ **Validación**: Validación tanto en frontend como backend
- 📝 **Logs**: Sistema de registro de solicitudes y errores

---

## 🛠️ Tecnologías Utilizadas

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router_DOM-CA4245?style=flat&logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=FFD62E)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

- **React** 18.x - Biblioteca de JavaScript para interfaces de usuario
- **React Router DOM** - Enrutamiento para Single Page Application
- **Vite** - Build tool y dev server de última generación
- **CSS3** - Estilos personalizados con metodología BEM
- **JavaScript ES6+** - Características modernas de JavaScript

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-003366?style=flat&logo=lock&logoColor=white)
![validator](https://img.shields.io/badge/validator-2C3E50?style=flat&logo=data&logoColor=white)
![Celebrate/Joi](https://img.shields.io/badge/Celebrate%2FJoi-6E40C9?style=flat&logo=joi&logoColor=white)
![Winston](https://img.shields.io/badge/Winston-4A4A4A?style=flat&logo=winston&logoColor=white)
![express-winston](https://img.shields.io/badge/express--winston-4A4A4A?style=flat&logo=express&logoColor=white)
![helmet](https://img.shields.io/badge/helmet-00897B?style=flat&logo=helmet&logoColor=white)
![CORS](https://img.shields.io/badge/CORS-FF6F00?style=flat&logo=internetexplorer&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=flat&logo=.env&logoColor=black)

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web minimalista y flexible
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** (jsonwebtoken) - Autenticación basada en tokens
- **bcryptjs** - Encriptación de contraseñas
- **validator** - Validación de datos
- **celebrate/Joi** - Validación de esquemas
- **winston** - Sistema de logging
- **express-winston** - Middleware de logging
- **helmet** - Seguridad HTTP
- **cors** - Manejo de Cross-Origin Resource Sharing
- **dotenv** - Gestión de variables de entorno

### Infraestructura y DevOps
![Google Cloud](https://img.shields.io/badge/Google_Cloud_Platform-4285F4?style=flat&logo=googlecloud&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white)
![PM2](https://img.shields.io/badge/PM2-2B037A?style=flat&logo=pm2&logoColor=white)
![Let's Encrypt](https://img.shields.io/badge/Let's_Encrypt-003A70?style=flat&logo=letsencrypt&logoColor=white)
![FreeDNS](https://img.shields.io/badge/FreeDNS-0052CC?style=flat&logo=dns&logoColor=white)
- **Google Cloud Platform** - Hosting del servidor
- **Nginx** - Servidor web y proxy inverso
- **PM2** - Process manager para Node.js
- **Let's Encrypt** - Certificados SSL/TLS gratuitos
- **FreeDNS** - Servicio de DNS

---

## 📁 Estructura del Proyecto
```
around-project/
├── backend/
│   ├── controllers/
│   │   ├── cards.js          # Controladores de tarjetas
│   │   └── users.js          # Controladores de usuarios
│   ├── middlewares/
│   │   ├── auth.js           # Middleware de autenticación JWT
│   │   ├── errorHandler.js  # Manejo centralizado de errores
│   │   ├── requestLogger.js # Logger de solicitudes
│   │   └── validation.js    # Validaciones con Celebrate
│   ├── models/
│   │   ├── Card.js           # Modelo de tarjetas
│   │   └── User.js           # Modelo de usuarios
│   ├── routes/
│   │   ├── cards.js          # Rutas de tarjetas
│   │   └── users.js          # Rutas de usuarios
│   ├── app.js                # Punto de entrada de la aplicación
│   ├── .env                  # Variables de entorno (no en repo)
│   ├── .eslintrc             # Configuración de ESLint
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── images/           # Imágenes estáticas
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.jsx
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Main/
│   │   │   ├── Cards/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   ├── ProtectedRoute/
│   │   │   └── InfoTooltip/
│   │   ├── contexts/
│   │   │   └── CurrentUserContext.jsx
│   │   ├── utils/
│   │   │   ├── Api.js
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env                  # Variables de entorno
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Instalación y Configuración Local

### Prerrequisitos
- Node.js v18 o superior
- MongoDB (local o Atlas)
- npm o yarn

### Backend

1. **Navegar a la carpeta backend**
```bash
   cd backend
```

2. **Instalar dependencias**
```bash
   npm install
```

3. **Crear archivo `.env`**
```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/aroundb
   JWT_SECRET=tu-secreto-super-seguro-de-desarrollo
```

4. **Iniciar servidor de desarrollo**
```bash
   npm run dev
```

   El servidor estará disponible en `http://localhost:3000`

### Frontend

1. **Navegar a la carpeta frontend**
```bash
   cd frontend
```

2. **Instalar dependencias**
```bash
   npm install
```

3. **Crear archivo `.env`**
```env
   VITE_API_URL=http://localhost:3000
   VITE_APP_NAME=Around the US
```

4. **Iniciar servidor de desarrollo**
```bash
   npm run dev
```

   La aplicación estará disponible en `http://localhost:5173`

---

## 📡 API Endpoints

### Autenticación (Públicas)
```
POST /signup          - Registrar nuevo usuario
POST /signin          - Iniciar sesión
```

### Usuarios (Protegidas - Requieren JWT)
```
GET    /users/me      - Obtener información del usuario actual
PATCH  /users/me      - Actualizar perfil del usuario
PATCH  /users/me/avatar - Actualizar avatar del usuario
```

### Tarjetas (Protegidas - Requieren JWT)
```
GET    /cards         - Obtener todas las tarjetas
POST   /cards         - Crear nueva tarjeta
DELETE /cards/:cardId - Eliminar tarjeta (solo el propietario)
PUT    /cards/:cardId/likes    - Dar like a una tarjeta
DELETE /cards/:cardId/likes    - Quitar like de una tarjeta
```

### Utilidad
```
GET /health           - Health check del servidor
```

---

## 🔐 Autenticación

El proyecto utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. El usuario se registra con email y contraseña
2. La contraseña se encripta con bcrypt (12 salts)
3. Al iniciar sesión, se genera un JWT con duración de 7 días
4. El token se almacena en `localStorage` del cliente
5. Cada solicitud protegida incluye el token en el header `Authorization: Bearer <token>`
6. El middleware de autenticación valida el token en cada solicitud

---

## 🌐 Despliegue en Producción

### Infraestructura
- **Servidor**: Google Cloud Compute Engine (VM)
- **OS**: Ubuntu 20.04 LTS
- **Web Server**: Nginx (proxy inverso)
- **Process Manager**: PM2
- **Database**: MongoDB Atlas
- **SSL/TLS**: Let's Encrypt (Certbot)

### Dominios Configurados
- Frontend: `lucerofront.baselinux.net`
- Backend API: `luceroapi.baselinux.net`

### Variables de Entorno en Producción

**Backend (.env)**
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://[usuario]:[password]@cluster.mongodb.net/aroundb
JWT_SECRET=[secreto-seguro-aleatorio-64-caracteres]
ALLOWED_ORIGINS=https://lucerofront.baselinux.net,https://www.lucerofront.baselinux.net
FRONTEND_URL=https://lucerofront.baselinux.net
```

**Frontend (.env)**
```env
VITE_API_URL=https://luceroapi.baselinux.net
VITE_APP_NAME=Around the US
```

### Proceso de Despliegue

1. **Subir código al servidor**
```bash
   git pull origin main
```

2. **Actualizar backend**
```bash
   cd backend
   npm install --production
   pm2 restart backend-api
```

3. **Actualizar frontend**
```bash
   cd frontend
   npm install
   npm run build
   sudo systemctl reload nginx
```

---

## 🔧 Scripts Disponibles

### Backend
```bash
npm start          # Iniciar servidor en producción
npm run dev        # Iniciar con nodemon (desarrollo)
npm run lint       # Ejecutar ESLint
```

### Frontend
```bash
npm run dev        # Servidor de desarrollo (Vite)
npm run build      # Construir para producción
npm run preview    # Preview del build
npm run lint       # Ejecutar ESLint
```

---

## 🧪 Validación y Seguridad

### Validaciones Implementadas
- ✅ Validación de emails con formato correcto
- ✅ Contraseñas mínimo 8 caracteres
- ✅ URLs válidas para imágenes y avatares
- ✅ Nombres y descripciones con longitud apropiada
- ✅ ObjectIds válidos de MongoDB
- ✅ Validación de tokens JWT

### Medidas de Seguridad
- 🔒 Contraseñas hasheadas con bcrypt
- 🔒 Tokens JWT con expiración
- 🔒 CORS configurado para orígenes específicos
- 🔒 Helmet.js para headers HTTP seguros
- 🔒 Rate limiting para prevenir ataques
- 🔒 Validación de entrada en todos los endpoints
- 🔒 HTTPS obligatorio en producción
- 🔒 Hash de contraseñas no expuesto en respuestas

---

## 📊 Sistema de Logging

El backend implementa un sistema completo de logging:

### Request Logger
- Registra todas las solicitudes HTTP
- Formato JSON con timestamp
- Archivo: `request.log`

### Error Logger
- Registra todos los errores
- Incluye stack trace completo
- Archivo: `error.log`

### Ubicación de logs
```bash
backend/request.log
backend/error.log
```

---

## 🐛 Manejo de Errores

### Códigos de Estado HTTP
- `200` - Éxito
- `201` - Recurso creado
- `400` - Datos inválidos
- `401` - No autenticado
- `403` - No autorizado
- `404` - Recurso no encontrado
- `409` - Conflicto (email duplicado)
- `500` - Error del servidor

### Errores Centralizados
Todos los errores pasan por un middleware centralizado que:
- Formatea la respuesta de error
- Registra el error en logs
- Evita exponer información sensible
- Proporciona mensajes claros al cliente

---

## 🎨 Metodología BEM

El proyecto utiliza la metodología BEM (Block Element Modifier) para CSS:
```css
/* Bloque */
.button { }

/* Elemento */
.button__icon { }

/* Modificador */
.button_type_submit { }
.button_disabled { }
```

---

## 📱 Diseño Responsivo

La aplicación es completamente responsiva con breakpoints:

- **Desktop**: > 1280px
- **Tablet**: 768px - 1279px
- **Mobile**: < 767px

---

## 🚧 Mejoras Futuras

- [ ] Implementar recuperación de contraseña
- [ ] Agregar comentarios en las tarjetas
- [ ] Sistema de notificaciones en tiempo real
- [ ] Filtrado y búsqueda de tarjetas
- [ ] Perfil público de usuarios
- [ ] Compartir tarjetas en redes sociales
- [ ] Modo oscuro/claro
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios y de integración
- [ ] PWA (Progressive Web App)

---

## 👨‍💻 Autor

**Lucero Uzuriaga**
- GitHub: [luuzuriaga](https://github.com/luuzuriaga)

---

## 🙏 Agradecimientosadd

- **TripleTen** - Por la formación y el apoyo durante el bootcamp
- **Google Cloud Platform** - Por proporcionar créditos gratuitos para hosting
- **MongoDB Atlas** - Por el servicio de base de datos en la nube
- **Let's Encrypt** - Por los certificados SSL gratuitos

---


## 🔄 Changelog

### v1.0.0 (2025-01-20)
- ✨ Lanzamiento inicial
- ✅ Sistema completo de autenticación
- ✅ CRUD de tarjetas y usuarios
- ✅ Sistema de likes
- ✅ Despliegue en Google Cloud
- ✅ SSL/TLS configurado

---

**Hecho con ❤️ y mucho ☕ por [Lucero Uzuriaga]**