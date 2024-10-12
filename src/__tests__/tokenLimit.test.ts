import request from 'supertest';
import { connectedUsers, mockDatabase } from '../database/users';
import * as jwt from 'jsonwebtoken';
import createServer from '../server';
const uuid = require('uuid');

const app = createServer();

const generateLargeText = (charCount: number): string => {
  const word = 'word ';
  let largeText = '';

  // On met le minimum du texte à 10 charactères
  if(charCount < 10)
    charCount = 10;

  // Génération d'un texte long
  while (largeText.length + word.length <= charCount) {
    largeText += word;
  }

  // Ajout des charactères restants pour arriver à charCount
  if (largeText.length < charCount) {
    largeText += 'word'.substring(0, charCount - largeText.length);
  }

  return largeText;
};

const largeText = generateLargeText(40001);
const veryLargeText = generateLargeText(80001);

describe('POST /api/justify (E2E) with verified token after expiring the limit', () => {
  const email = mockDatabase[0];

  const payload = {
    id: uuid.v4(),
    login: email,
  };
  const secret = process.env.JWT_SECRET || 'secret'

  const token = jwt.sign(payload, secret, {
      expiresIn: '10h'
  })

  connectedUsers[email] = {token: token, wordCount: 80001, lastReset: new Date((new Date()).valueOf() - 5000*60*60*24) }; // Date d'un autre jour
  
  it("should return justified text since token passed 24h of expiration", async () => {
    const response = await request(app)
      .post('/api/justify')
      .send({ 'text': 'dummy_text' })
      .auth(token, { type: "bearer" })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
  });

});

describe('POST /api/justify (E2E) with multiple payloads that surpasses the limit required at the end', () => {
  // Génération d'un token pour ce context
  const email = mockDatabase[1];

  const payload = {
    id: uuid.v4(),
    login: email,
  };
  const secret = process.env.JWT_SECRET || 'secret'

  const token = jwt.sign(payload, secret, {
      expiresIn: '10h'
  })

  it("should return the justified text", async () => {
    const response = await request(app)
      .post('/api/justify')
      .send({ 'text': largeText })
      .auth(token, { type: "bearer" })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
  });

  it("should block user's access due to max limit reached", async () => {
    const response = await request(app)
      .post('/api/justify')
      .send({ 'text': largeText })
      .auth(token, { type: "bearer" })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(402);
  });
  
});

describe('POST /api/justify (E2E) with large payload that surpasses the limit required', () => {
  // Génération d'un token pour un autre utilisateur ( avec un wordCount 0 )
  const email = mockDatabase[2];

  const payload = {
    id: uuid.v4(),
    login: email,
  };
  const secret = process.env.JWT_SECRET || 'secret'

  const token = jwt.sign(payload, secret, {
      expiresIn: '10h'
  })
  
  it("should block user's access due to max limit reached", async () => {
    const response = await request(app)
      .post('/api/justify')
      .send({ 'text': veryLargeText })
      .auth(token, { type: "bearer" })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(402);
  });

});