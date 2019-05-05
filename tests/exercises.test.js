const request = require('supertest')
const expect = require('expect')
const { ObjectId } = require('mongodb')

const app = require('../app')
const Exercise = require('../models/exercises')
const { User } = require('../models/users')

describe('/exercises', () => {

  beforeEach(async () => {

    // delete all exercises and users
    await Exercise.deleteMany()
    await User.deleteMany()

    // Create user object
    const userObj = {
      _id: new ObjectId(),
      email: 'user@test.com',
      password: 'asdfASDF1234!@#$'
    }

    const user = await new User(userObj).save()

    // Create exercises
    const exercises = [{
      _id: new ObjectId(),
      name: 'Incline Bench Press',
      description: 'Take the heavy thing, lift it, put it down, lift it, put it down, a certain number of times.',
      creator: user._id
    }, {
      _id: new ObjectId(),
      name: 'Dead Lifts',
      description: 'Great for getting good at lifting heavy things off the floor.',
      creator: user._id
    }]

    // save users
    await new Exercise(exercises[0]).save()
    await new Exercise(exercises[1]).save()
  })

  // POST /exercises
  describe('POST /exercises', () => {
    
    it('should respond 401, if user is NOT logged in', async () => {
      const exercise = { name: 'sc', description: 'My favorite' }

      await request(app)
        .post('/exercises')
        .send(exercise)
        .expect(401)
    })

    it('should respond 400, and NOT create exercise, if name is invalid', async () => {
      const exercise = { name: 'sc', description: 'My favorite' }

      await request(app)
        .post('/exercises')
        .send(exercise)
        .expect(400)
        .expect(res => {
          expect(res.header['set-cookie']).toBeFalsy()
        })
    })

    it('should respond 400, and NOT create exercise, if description is invalid', async () => {
      const exercise = { name: 'Decline Bench', description: 'f' }

      await request(app)
        .post('/exercises')
        .send(exercise)
        .expect(400)
        .expect(res => {
          expect(res.header['set-cookie']).toBeFalsy()
        })
    })

    it('should respond 400, and NOT create exercise, if exercise already exists', async () => {
      const exercise = { name: 'Incline Bench Press', description: 'favorite' }

      await request(app)
        .post('/exercises')
        .send(exercise)
        .expect(400)
        .expect(res => {
          expect(res.header['set-cookie']).toBeFalsy()
      })
    })

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
