const request = require('supertest')
const expect = require('expect')

const app = require('../app')

describe('/exercises', () => {

  // POST /exercises
  describe('POST /exercises', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 400, and NOT create exercise, if name is invalid', async () => {})
    it('should respond 400, and NOT create exercise, if description is invalid', async () => {})
    it('should respond 400, and NOT create exercise, if exercise already exists', async () => {})
    it('should respond 302, create a new exercise, and redirect to /exercises', async () => {})
  })

  // GET /exercises
  describe('GET /exercises', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 200, and return all exercises', async () => {})
  })

  // GET /exercises/:id
  describe('GET /exercises/:id', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 200, and get specified exercise', async () => {})
  })

  // PATCH /exercises
  describe('PATCH /exercises/:id', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 401, if user is NOT the creator or an admin', async () => {})
    it('should respond 400, and NOT update the exercise, if name is invalid', async () => {})
    it('should respond 400, and NOT update the exercise, if description is invalid', async () => {})
    it('should respond 400, and NOT update the exercise, if exercise already exists', async () => {})
    it('should respond 302, update the exercise, and redirect to /exercises', async () => {})
  })

  // DELETE /exercises
  describe('DELETE /exercises', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 401, if user is NOT the creator or an admin', async () => {})
    it('should respond 302, delete the exercise, then redirect to /exercises', async () => {})
  })
})
