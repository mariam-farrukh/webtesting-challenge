const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
    describe('get /', () => {
        it('returns 200 ok', () => {
            return request(server).get('/').then(res => {
                expect(res.status).toBe(200);
            })
        });
        it("should return {api: 'connected'}", async () => {
            const res = await request(server).get('/');
            expect(res.body.api).toBe('connected');
            expect(res.body).toEqual({api:'connected'});
        });
        it('should return JSON', done => {
            request(server).get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                    done()
                })
        });
    });
});