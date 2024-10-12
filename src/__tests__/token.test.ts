import request from 'supertest';
import createServer from '../server';
import * as jwt from 'jsonwebtoken';
import { mockDatabase } from '../database/users';

const uuid = require('uuid');

const app = createServer();

const email = mockDatabase[0];

const payload = {
  id: uuid.v4(),
  login: email,
};
const secret = process.env.JWT_SECRET || 'secret'

const token = jwt.sign(payload, secret, {
    expiresIn: '10h'
})

describe('POST /api/token (E2E) to connect user', () => {

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

describe('POST /api/justify (E2E) with wrong header values', () => {  
  it("should block the connexion with Authorization header word length higher than 2", async () => {
    const response = await request(app)
      .post('/api/justify')
      .send({ 'text': 'dummy_text' })
      .set('Authorization', 'Bearer ' + token + ' other_data') // Simulation d'un contenu dans authorization avec nombre de mot > 2
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(401);
  });
  
  it("should block the connexion with Authorization header value that doesn't start with Bearer", async () => {
    const response = await request(app)
      .post('/api/justify')
      .send({ 'text': 'dummy_text' })
      .set('Authorization', 'Bearerr ' + token) // Simulation d'un contenu dans authorization sans mot 'Bearer ' au début
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(401);
  });
  
  it("should block the connexion with expired token", async () => {
    const expiredToken = jwt.sign({ id: 'user1', login: 'user1@mail.com' }, token, { expiresIn: '-1s' });
    const response = await request(app)
      .post('/api/justify')
      .auth(expiredToken, { type: 'bearer' })
      .send({ 'text': 'dummy_text' })
      .set('Content-Type', 'application/json'); // Simulation d'une requête sans authorization header

    expect(response.status).toBe(401);
  });

});