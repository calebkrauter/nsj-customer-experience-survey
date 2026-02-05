import { describe, it, expect, test } from 'vitest';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';




describe('Authenticate User', () => {
  it('Should authenticate a user from a password', async () => {
   const response = await fetch('http://localhost:3000/api/post-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'admin' }),
    });
    const data = await response.json();
    expect(data.authenticated).toBe(true);
  });
});

describe('Authenticate User', () => {
  it('Should authenticate a user from a password', async () => {
   const response = await fetch('http://localhost:3000/api/post-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'Northstarjet' }),
    });
    const data = await response.json();
    expect(data.authenticated).toBe(true);
  });
});
describe('Authenticate User', () => {
  it('Should authenticate a user from a password', async () => {
   const response = await fetch('http://localhost:3000/api/post-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'integration_test' }),
    });
    const data = await response.json();
    expect(data.authenticated).toBe(true);
  });
});
describe('Authenticate User', () => {
  it('Should authenticate a user from a password', async () => {
   const response = await fetch('http://localhost:3000/api/post-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'test_user' }),
    });
    const data = await response.json();
    expect(data.authenticated).toBe(true);
  });
});


describe('Create User', () => {
  it('Should create a user and a password', async () => {
    const randomPassword = nanoid(7);
    const randomUsername = nanoid(10);
   const response = await fetch('http://localhost:3000/api/post-new-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: randomUsername, password: randomPassword }),
    });
    const data = await response.json();
    expect(data.received.password).toBe(randomPassword);
    expect(data.received.username).toBe(randomUsername);
  });
});


describe('Post Submission', () => {
  it('Checks if a submission was POSTed', async () => {
   const response = await fetch('http://localhost:3000/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      responseId: uuidv4(),
      rowVersion: 0,
      surveyKey: 'customer_experience',
      submitterId: uuidv4(),
      submittedAt: new Date(),
      submissionData: {data: 'data'},
    }),
    });
    expect(response.status).toBe(200);
  });
});