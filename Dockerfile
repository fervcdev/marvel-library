# Etapa 1: Construir la aplicación Angular
FROM node:16-alpine as build-stage

WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el contenido del directorio actual al directorio de trabajo
COPY . .

# Compila la aplicación Angular para producción
RUN npm run build --prod

# Etapa 2: Configurar Nginx y montar la aplicación
FROM nginx:latest

# Elimina la configuración de Nginx predeterminada
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos generados por Angular (desde la etapa de construcción) al directorio de trabajo de Nginx
COPY --from=build-stage /app/dist/marvel-app /usr/share/nginx/html

# Exponer el puerto 80 para las solicitudes HTTP
EXPOSE 80

# Inicia Nginx cuando se ejecuta el contenedor
CMD ["nginx", "-g", "daemon off;"]
