const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("./app");
const User = require("./user");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("GET /api/hello", () => {
  it("responds with Hello World", async () => {
    const response = await request(app).get("/api/hello");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Hello World");
  });
});

describe("POST /api/echo", () => {
  it("responds with the same message", async () => {
    const message = "Test Message";
    const response = await request(app).post("/api/echo").send({ message });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(message);
  });
});

describe("POST /api/users", () => {
  it("creates a new user", async () => {
    const newUser = { name: "John Doe", email: "john@example.com" };
    const response = await request(app).post("/api/users").send(newUser);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newUser.name);
  });
});

describe("GET /api/users", () => {
  it("fetches all users", async () => {
    await User.create({ name: "Alice", email: "alice@example.com" });
    const response = await request(app).get("/api/users");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
});

describe("User API Functional Test", () => {
  it("should create and fetch a user", async () => {
    const userData = { name: "Juan", email: "juan@example.com" };
    const createResponse = await request(app).post("/api/users").send(userData);
    expect(createResponse.statusCode).toBe(201);
    const fetchResponse = await request(app).get("/api/users");
    expect(fetchResponse.statusCode).toBe(200);
    expect(fetchResponse.body[0].email).toBe(userData.email);
  });
});

describe("TDD for Greeting Endpoint", () => {
  it("should return a greeting message", async () => {
    const response = await request(app).get("/api/greeting");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Greeting");
  });
});
