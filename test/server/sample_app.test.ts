import request from 'supertest';
import app from '../../src/server/sample_app';

describe('Test /explain endpoint', () => {
    it('should respond with an error if no message is provided', async () => {
        const res = await request(app).get('/explain');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('No message provided');
    });

    it('should respond with a result if a message is provided', async () => {
        const message = {
            input: "what's my name?",
            // Notice that chat_history is a string, since this prompt is aimed at LLMs, not chat models
            chat_history: "Human: Hi! My name is Cob\nAI: Hello Cob! Nice to meet you",
        }
        const res = await request(app).get('/explain').query(message);
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toHaveProperty('error');
    });
});

describe('Test /chain endpoint', () => {
    it('should respond with an error if no question or answer is provided', async () => {
        const res = await request(app).get('/chain');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('No message provided');
    });

    it('should respond with a result if a question and answer are provided', async () => {
        const res = await request(app).get('/chain').query({ question: 'test question', answer: 'test answer' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).not.toHaveProperty('error');
    });
});