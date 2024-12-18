# Descargando la imagen alpine de Node.js
# FROM node:12-alpine3.12
FROM node:21-alpine3.18

# Declarando variables de entorno
ENV TZ=America/La_Paz

# Instalar shadow para permitir useradd 
RUN apk add --no-cache shadow

# Create a non-root user
RUN useradd -ms /bin/bash nodeuser

# Ir a la carpeta temporal
WORKDIR /tmp

# Install tzdata to set env I get the correct timestamp
RUN apk add tzdata

# Ir a la carpeta de trabajo
# WORKDIR /usr/src/app
WORKDIR /home/nodeuser/app

# copiando archivos del package.json desde la maquina local a la imagen
COPY package*.json ./

# Change the ownership of the application directory to the non-root user
RUN chown -R nodeuser:nodeuser /home/nodeuser/app

# Switch to the non-root user
USER nodeuser

# Instalación de dependencias
RUN npm install

# Copiando todo de la maquina local a la imagen
# COPY . .
COPY *.js *.json *.yml *.md ./
COPY dataAccess/ ./dataAccess
COPY services/ ./services
COPY util/ ./util

# El comando con el cual se inicializara el contenedor
CMD ["node", "server.js"]