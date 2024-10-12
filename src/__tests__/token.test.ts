import request from 'supertest';
import createServer from '../server';

const app = createServer();

describe('POST /api/justify (E2E) with multiple payloads that surpasses the limit required at the end', () => {

  it("should return the token to the connected user", async () => {
    const response = await request(app)
      .post('/api/token')
      .send({ 'email': 'user1@mail.com' })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should block the not-found user's connexion", async () => {
    const response = await request(app)
      .post('/api/token')
      .send({ 'email': 'UNEXISTENT_USER@mail.com' })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(401);
  });

});