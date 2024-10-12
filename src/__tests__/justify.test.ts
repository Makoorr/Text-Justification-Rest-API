import request from 'supertest';
import { justifyLine } from '../utils/justify';
import { mockDatabase } from '../database/users';
import * as jwt from 'jsonwebtoken';
import createServer from '../server';
const uuid = require('uuid');

const app = createServer();

describe('Justification', () => {
    it('should justify a line to 80 characters', () => {
        const inputLine = "This is a test line that needs to be justified";
        const result = justifyLine(inputLine);

        expect(result.length).toBe(80); // Vérification si la longueur de la ligne est égal à 80
    });
});

describe('POST /api/justify (E2E)', () => {

  it("should block user's access due to unauthorized", async () => {
    const text = `Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n'avais pas le temps de me dire: «Je m'endors.»`;

    const response = await request(app)
      .post('/api/justify')
      .send({ 'text': text })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(401);
  });
  
  it("should return the justified text", async () => {
    const text = `Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n'avais pas le temps de me dire: «Je m'endors.»`;

    const email = mockDatabase[0];

    const payload = {
      id: uuid.v4(),
      login: email,
    };
    const secret = process.env.JWT_SECRET || 'secret'

    const token = jwt.sign(payload, secret, {
        expiresIn: '10h'
    })

    const response = await request(app)
      .post('/api/justify')
      .send({ 'text': text })
      .auth(token, { type: "bearer" })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
  });

});
