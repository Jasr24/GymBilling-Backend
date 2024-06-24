FROM node:14-bullseye

# Establece el directorio de trabajo
WORKDIR /app-serve-gimbilling

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Ejecuta el script de construcción
RUN npm run build

# Exponer el puerto necesario
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]