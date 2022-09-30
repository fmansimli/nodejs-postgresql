import request from "supertest";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import app from "../src/app";

const CITY = {
  name: "San Francisco",
  description: "San Francisco city description",
  code: 1234,
};

const UPDATED_CITY = {
  name: "San Francisco0",
};

let accessToken: string;
let cityId: string;
let userId: string;

beforeAll(async () => {
  process.env.DB_NAME = "mooveTest";

  const resp = await request(app).post("/api/auth/register").send({
    email: "fm_test@test.com",
    password: "12345",
    username: "fm_test",
  });

  accessToken = resp.body.body.tokens.accessToken;
  userId = resp.body.body.user._id;
});

afterAll(async () => {
  try {
    await request(app)
      .delete("/api/users/" + userId)
      .set("authorization", "Bearer " + accessToken);

    await request(app)
      .post("/api/admiin/drop-collection")
      .send({ name: "cities" })
      .set("authorization", "Bearer " + accessToken);
  } catch (error) {
    console.error(error);
  } finally {
    process.env.DB_NAME = "moove";
  }
});

describe(" *POST* enpoint tests ...", () => {
  it("should create a city through posted data..", async () => {
    const resp = await request(app)
      .post("/api/cities")
      .send(CITY)
      .set("authorization", "Bearer " + accessToken);

    cityId = resp.body.body.city._id;

    expect(resp.statusCode).toBe(201);
    expect(resp.body.meta).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.body.city).toBeDefined();
    expect(resp.body.body.city).toHaveProperty("_id");
    expect(resp.body.body.city.name).toBe(CITY.name);
    expect(resp.body.body.city.code).toBe(CITY.code);
    expect(resp.body.body.city.description).toBe(CITY.description);
  });
});

describe(" *GET* enpoint tests ...", () => {
  it("should return all cities by pagination...", async () => {
    const resp = await request(app)
      .get("/api/cities")
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.pagination).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.body.cities.length).toBeDefined();
    expect(resp.body.pagination.currentPage).toBe(1);
  });

  it("should return a city by given id", async () => {
    const resp = await request(app)
      .get("/api/cities/" + cityId)
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.body.city).toBeDefined();
    expect(resp.body.body.city).toHaveProperty("_id");
    expect(resp.body.body.city._id).toBe(cityId);
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
  });
});

describe(" *PUT && PATCH* enpoint tests ...", () => {
  it("should update (PUT) a city by given id..", async () => {
    const resp = await request(app)
      .put("/api/cities/" + cityId)
      .send(UPDATED_CITY)
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.meta).toBeDefined();
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.meta.effected).toBeGreaterThan(0);
    expect(resp.body.body).toBeDefined();
    expect(resp.body.body.city).toBeDefined();
    expect(resp.body.body.city).toHaveProperty("_id");
    expect(resp.body.body.city.name).toBe(UPDATED_CITY.name);
  });
});

describe(" *DELETE* enpoint tests ...", () => {
  it("should delete a city by given id", async () => {
    const resp = await request(app)
      .delete("/api/cities/" + cityId)
      .set("authorization", "Bearer " + accessToken);

    expect(resp.statusCode).toBe(200);
    expect(resp.body.meta).toHaveProperty("ok");
    expect(resp.body.meta.ok).toBe(true);
    expect(resp.body.meta.effected).toBeGreaterThan(0);
  });
});
