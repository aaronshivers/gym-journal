const request = require('supertest')
const expect = require('expect')

const app = require('../app')

describe('/workouts', () => {

  // POST /workouts
  describe('POST /workouts', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 400, and NOT create exercise, if name is invalid', async () => {})
    it('should respond 400, and NOT create exercise, if description is invalid', async () => {})
    it('should respond 400, and NOT create exercise, if exercise already exists', async () => {})
    it('should respond 302, create a new exercise, and redirect to /workouts', async () => {})
  })

  // GET /workouts
  describe('GET /workouts', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 200, and return all workouts', async () => {})
  })

  // GET /workouts/:id
  describe('GET /workouts/:id', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 200, and get specified exercise', async () => {})
  })

  // PATCH /workouts
  describe('PATCH /workouts/:id', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 401, if user is NOT the creator or an admin', async () => {})
    it('should respond 400, and NOT update the exercise, if name is invalid', async () => {})
    it('should respond 400, and NOT update the exercise, if description is invalid', async () => {})
    it('should respond 400, and NOT update the exercise, if exercise already exists', async () => {})
    it('should respond 302, update the exercise, and redirect to /workouts', async () => {})
  })

  // DELETE /workouts
  describe('DELETE /workouts', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {})
    it('should respond 401, if user is NOT the creator or an admin', async () => {})
    it('should respond 302, delete the exercise, then redirect to /workouts', async () => {})
  })
})
