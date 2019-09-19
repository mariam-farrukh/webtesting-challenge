const request = require('supertest')
const db = require('../data/dbConfig.js');
const server = require('./server')

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

    it('should set the environment for testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    describe('GET /', () => {
        it('returns 200 OK', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200);
                })
        });

        it('return JSON', () => {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toMatch(/json/);
                })
        });
    })

    describe('GET /users', () => {
        it('should return an array', () => {
            return request(server)
                .get('/users')
                .then(res => {
                    expect(Array.isArray(res.body)).toBe(true);
                })
        });
    });

    describe('POST /users', () => {
        beforeEach(async() => {
            await db('users').truncate(); 
        })
        it('should insert a user into a db', () => {
            //insert one
            return request(server)
            .post('/users')
            .send({
                name:'potato'
            })
            .then(res => {
                expect(res.body.length).toBe(1)
            })
        });

        it('returns 201 OK', () => {
            return request(server)
                .post('/users')
                .send({
                    name:'singer'
                })
                .then(res => {
                    expect(res.status).toBe(201);
                })
        });

        it('should insert more than one user' ,async() => {
            await request(server).post('/users')
            .send([
                {name:'test'},
                {name: 'potato'},
                {name: 'heimer'}
            ])
            const users = await db('users');
            expect(users).toHaveLength(3);
        });
    });

    describe('PUT request', () => {
        it('should update a name', () => {            
            return request(server)
            .put("/users/1")
            .send(
                {name: 'testing'}
            )
            .then(res => {
                expect(res.status).toBe(200);
            })
        });
    });

    describe("DELETE request", ()=>{
        it("successful delete user by ID", ()=>{
            return request(server)
            .delete("/users/1")
            .then(res=>{
                expect(res.status).toBe(200)
            })
        });
        it('should return JSON', done => {
            request(server).delete('/users/1')
                .then(res => {
                    expect(res.type).toMatch(/json/i);
                    done()
                })
        });
    });
});