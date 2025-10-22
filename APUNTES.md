**PROYECTO**
Este proyecto se basa en: app.js que define una aplicación Express con endpoints para manejar usuarios, el archivo user.js que define el modelo de datos de usuario con Mongoose, y el archivo app.test.js que contiene tests para los endpoints definidos en app.js.
**usamos Vitest**
npm install --save-dev vitest @vitest/ui c8 o npm install --save-dev vitest
**mongodb-memory-server**
Usamos mongodb-memory-server para tener una base de datos MongoDB en memoria RAM durante los tests.
**Qué es uri**
uri significa Uniform Resource Identifier — básicamente es la dirección de conexión a una base de datos.
Por ejemplo, una base real de MongoDB puede tener un URI así:
mongodb://usuario:contraseña@localhost:27017/miBaseDeDatos
**beforeAll, afterAll, beforeEach, afterEach**
Estas son funciones que no son exclusivas de Vitest ni de mongoose, ni de test de integración, sino que son funciones comunes en muchos frameworks de testing y nos permiten ejecutar código en momentos específicos del ciclo de vida de los tests.

- beforeAll: Se ejecuta una vez antes de que se ejecuten todos los tests. Útil para configuraciones iniciales.
- afterAll: Se ejecuta una vez después de que todos los tests hayan finalizado. Útil para limpiar recursos.
- beforeEach: Se ejecuta una vez antes de cada test. Útil para configuraciones que se repiten en cada test.
- afterEach: Se ejecuta una vez después de cada test. Útil para limpiar recursos que se crean en cada test.
  **Métodos mongoose para tests**
  User.find() Buscar documentos en la colección User
  User.findOne() Buscar un solo documento que cumpla condición
  User.create() Crear un nuevo documento
  User.deleteMany() Borrar varios documentos de la colección
  User.updateOne() Actualizar un documento
  mongoose.connect(uri) Conectar a una base de datos
  mongoose.disconnect() Desconectar de la base de datos
  **Métodos supertest para tests**
  request(app).get('/ruta') Hacer una petición GET
  request(app).post('/ruta').send(data) Hacer una petición POST con datos
  request(app).put('/ruta').send(data) Hacer una petición PUT con datos
  request(app).delete('/ruta') Hacer una petición DELETE
  request(app).patch('/ruta').send(data) Hacer una petición PATCH con datos
  request(app).set('Header', 'value') Establecer un header personalizado
  request(app).expect(statusCode) Esperar un código de estado específico
  **Métodos de mongoose-memory-server**
  MongoMemoryServer.create() Crear una instancia de MongoDB en memoria
  MongoMemoryServer.getUri() Obtener el URI de conexión a la base de datos en memoria
  MongoMemoryServer.stop() Detener la instancia de MongoDB en memoria
  **Métodos de Vitest y Jest**
  describe() Definir un grupo de tests
  it() Definir un test individual
  expect() Realizar una aserción
  beforeAll() Función que se ejecuta una vez antes de todos los tests
  afterAll() Función que se ejecuta una vez después de todos los tests
  beforeEach() Función que se ejecuta antes de cada test
  afterEach() Función que se ejecuta después de cada test
