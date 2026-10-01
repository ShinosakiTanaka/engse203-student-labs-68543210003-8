import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => {
  await loadSeed();
  app = createApp();
});

const validRequest = {
  requesterName: 'ทดสอบ ระบบ',
  requestType: 'แจ้งซ่อม',
  location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง',
  priority: 'normal',
};

test('case 1: GET requests list', async () => {
  const res = await request(app).get('/api/requests');
  assert.equal(res.status, 200);
});

test('case 2: GET request by id found', async () => {
  const res = await request(app).get('/api/requests/REQ-001');
  assert.equal(res.status, 200);
});

test('case 3: GET request by id not found', async () => {
  const res = await request(app).get('/api/requests/REQ-999');
  assert.equal(res.status, 404);
});

test('case 4: POST request success', async () => {
  const res = await request(app).post('/api/requests').send(validRequest);
  assert.equal(res.status, 201);
});

test('case 5: POST request invalid', async () => {
  const res = await request(app).post('/api/requests').send({});
  assert.equal(res.status, 400);
});

test('case 6: CORS header check', async () => {
  const res = await request(app).get('/api/requests').set('Origin', 'http://localhost:5173');
  assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
});
