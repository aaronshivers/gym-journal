const request = require('supertest')
const expect = require('expect')

const app = require('../app')

describe('/users', () => {

  // POST /users
  describe('POST /users', () => {
    
    it('should respond 400, and NOT create user, if email is invalid', async () => {})
    it('should respond 400, and NOT create user, if password is invalid', async () => {})
    it('should respond 400, and NOT create user, if user already exists', async () => {})
    it('should respond 302, create a new user, and redirect to /users/me', async () => {})
  })

  // GET /users
  describe('GET /users/me', () => {
    
    it('should respond 401 if user is not logged in', async () => {})
    it('should respond 400 if token is invalid', async () => {})
    it('should respond 200 if user is logged in', async () => {})
  })

  // GET /users/me/edit
  describe('GET /users/me/edit', () => {
    
    it('should respond 401 if user is NOT logged in', async () => {})
    it('should respond 200 if user is logged in', async () => {})
  })

  // PATCH /users/me
  describe('PATCH /users/me', () => {
    
    it('should respond 401, and NOT update user, if user is NOT logged in', async () => {})
    it('should respond 400, and NOT update user, if email is invalid', async () => {})
    it('should respond 400, and NOT update user, if password is invalid', async () => {})
    it('should respond 400, and NOT update user, if new email already exists in the DB', async () => {})
    it('should respond 302, update user, and redirect to /users/me', async () => {})
  })

  // DELETE /users/me
  describe('DELTE /users/me', () => {
    
    it('should respond 401 if user is NOT logged in', async () => {})
    it('should respond 302, delete the user, cookie, and workouts, then redirect to /', async () => {})
  })

  // GET /users/login
  describe('GET /users/login', () => {

    it('should respond 401 if email is NOT in the DB', async () => {})
    it('should respond 401 if password is NOT correct', async () => {})
    it('should respond 302, create token and cookie, and redirect to /users/me', async () => {})
  })

  // GET /users/logout
  describe('GET /users/logout', () => {

    it('should respond 302, delete cookie, and redirect to /', async () => {})
  })
})
