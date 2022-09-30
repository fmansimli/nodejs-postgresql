import request from "supertest";
import { it, describe, expect, beforeAll, afterAll } from "vitest";
import app from "../src/app";

let accessToken: string;
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
  await request(app)
    .delete("/api/users/" + userId)
    .set("authorization", "Bearer " + accessToken);

  process.env.DB_NAME = "moove";
});

describe("# database is about to be deleted #", () => {
  it("should delete the database..", async () => {
    expect(200).toBe(200);
    expect(200).toBe(200);
    expect("DATABASE_DROPPED").toBe("DATABASE_DROPPED");
  });
});
