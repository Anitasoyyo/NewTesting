# Testing API con Express & Vitest

Este es un proyecto de prueba para aprender **testing de APIs** usando **Express.js**, **Vitest**, **MongoDB** y **Supertest**.

## Características

- **API REST** con Express.js
- **Tests de integración** con Vitest y Supertest
- **Base de datos** MongoDB con Mongoose
- **MongoDB en memoria** para tests (mongodb-memory-server)
- **TDD** (Test-Driven Development) implementado
- **Tests funcionales** para flujos completos

## Endpoints Disponibles

### Endpoints Básicos

- `GET /api/hello` - Mensaje de saludo
- `POST /api/echo` - Devuelve el mensaje enviado
- `GET /api/greeting` - Endpoint creado con TDD

### Endpoints de Usuarios

- `POST /api/users` - Crear nuevo usuario
- `GET /api/users` - Obtener todos los usuarios

## Tecnologías usadas:

- **Node.js** - Runtime de JavaScript
- **Express.js**
- **Mongoose**
- **Vitest**
- **Supertest**
- **MongoDB Memory Server**

## Instalación

1. **Clonar el repositorio:**

```bash
git clone https://github.com/Anitasoyyo/NewTesting.git
cd NewTesting
```

2. **Instalar dependencias:**

```bash
npm install
```

## Ejecutar Tests

````bash
# Ejecutar tests en modo watch. El modo watch vuelve a ejecutar los tests cada vez que detecta un cambio en el código.
npm test

# Ejecutar tests una sola vez
npm run test:run

## Ejecutar la Aplicación

```bash
# Iniciar servidor
npm start

# Iniciar en modo desarrollo (con --watch)
npm run dev
````

## 📁 Estructura del Proyecto

```
TestExpress/
├── app.js              # Aplicación Express con endpoints
├── app.test.js         # Tests de integración y funcionales
├── user.js             # Modelo de usuario (Mongoose)
├── APUNTES.md          # Notas y apuntes del curso de testing
├── ARQUITECTURA.md     # Análisis técnico de arquitectura y patrones con diagramas
├── package.json        # Dependencias y scripts
├── vitest.config.mjs   # Configuración de Vitest
├── .gitignore          # Archivos ignorados por Git
└── README.md           # Documentación del proyecto
```

## Tipos de Tests Implementados

### 1. **Tests de Integración**

Prueban endpoints individuales con base de datos real:

```javascript
describe("POST /api/users", () => {
  it("creates a new user", async () => {
    const newUser = { name: "John Doe", email: "john@example.com" };
    const response = await request(app).post("/api/users").send(newUser);
    expect(response.statusCode).toBe(201);
  });
});
```

### 2. **Tests Funcionales**

Simulan flujos completos de usuario:

```javascript
describe("User API Functional Test", () => {
  it("should create and fetch a user", async () => {
    // Crear usuario
    const userData = { name: "Juan", email: "juan@example.com" };
    const createResponse = await request(app).post("/api/users").send(userData);

    // Verificar que aparece en la lista
    const fetchResponse = await request(app).get("/api/users");
    expect(fetchResponse.body[0].email).toBe(userData.email);
  });
});
```

### 3. **TDD (Test-Driven Development)**

Desarrollo guiado por tests - primero el test, luego el código:

```javascript
// 1. Escribir test que falla
describe("TDD for Greeting Endpoint", () => {
  it("should return a greeting message", async () => {
    const response = await request(app).get("/api/greeting");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Greeting");
  });
});

// 2. Escribir código mínimo para pasar el test
app.get("/api/greeting", (req, res) => {
  res.status(200).send("Greeting");
});
```

## Configuración de Base de Datos

Los tests usan **MongoDB Memory Server** para crear una base de datos temporal en memoria:

```javascript
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create(); // Crear instancia en memoria
  const uri = mongoServer.getUri(); // Obtener URI de conexión
  await mongoose.connect(uri); //conectar mongoose
});

afterEach(async () => {
  await User.deleteMany(); // Limpiar datos entre tests
});
```
