const request = require('supertest')
const expect = require('expect')
const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')

const app = require('../app')
const User = require('../models/users')

describe('/users', () => {

  // users list
  const users = [{
    _id: new ObjectId(),
    email: 'user0@test.net',
    password: 'asdfASDF1234!@#$',
    isAdmin: true
  }, {
    _id: new ObjectId(),
    email: 'user1@test.net',
    password: 'asdfASDF1234!@#$',
    isAdmin: false
  }]

  // tokens array
  const tokens = []

  beforeEach(async () => {

    // delete all users
    await User.deleteMany()

    // delete all tokens
    tokens.length = 0

    // save users
    const user0 = await new User(users[0]).save()
    const user1 = await new User(users[1]).save()

    // create token
    const token = user0.createAuthToken()

    // add token to tokens array
    tokens.push(token)

    // return users
    return users
  })

  // GET /users/login
  describe('GET /users/login', () => {
    
    it('should respond 200', async () => {

      await request(app)
        .get('/users/login')
        .expect(200)
    })
  })

  // POST /users/login
  describe('POST /users/login', () => {
    
    it('should respond 401, and NOT create token if email is not in the DB', async () => {

      const user = { email: 'bob@aol.com', password: 'asdfASDF1234!@#$' }

      await request(app)
        .post('/users/login')
        .send(user)
        .expect(401)
        .expect(res => {
          expect(res.header['set-cookie']).toBeFalsy()
        })
    })

    it('should respond 401, and NOT create token if password is not correct', async () => {

      const user = { email: users[0].email , password: '1234!@#$asdfASDF' }

      await request(app)
        .post('/users/login')
        .send(user)
        .expect(401)
        .expect(res => {
          expect(res.header['set-cookie']).toBeFalsy()
        })
    })

    it('should respond 302, create token, and redirect to /users/me', async () => {

      const { email, password } = users[0]

      await request(app)
        .post('/users/login')
        .send({ email, password })
        .expect(302)
        .expect(res => {
          expect(res.header.location).toEqual('/users/me')
          expect(res.header['set-cookie']).toBeTruthy()
        })
    })
  })

  // DELETE /users/logout
  describe('DELETE /users/logout', () => {
    
    it('should logout user, delete auth token, and redirect to /', async () => {

      const cookie = `token=${ tokens[0] }`

      await request(app)
        .delete('/users/logout')
        .set('Cookie', cookie)
        .expect(302)
        .expect(res => {
          expect(res.header.location).toEqual('/')
          expect(res.header['set-cookie']).toEqual(["token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"])
        })
    })
  })

  // GET /users/signup
  describe('GET /users/signup', () => {
    
    it('should respond 400, if user is logged in', async () => {})
    it('should respond 200', async () => {})
  })

  // POST /users
  describe('POST /users', () => {
    
    it('should respond 400, and NOT create user, if email is invalid', async () => {

      const user = { email: 'asdf', password: 'asdfASDF1234!@#$' }

      await request(app)
        .post('/users')
        .send(user)
        .expect(400)
        .expect(res => {
          expect(res.header['set-cookie']).toBeFalsy()
        })
    })

    it('should respond 400, and NOT create user, if password is invalid', async () => {

      const user = { email: 'user2@test.net', password: 'pass' }

      await request(app)
        .post('/users')
        .send(user)
        .expect(400)
        .expect(res => {
          expect(res.header['set-cookie']).toBeFalsy()
        })
    })

    it('should respond 400, and NOT create user, if user already exists', async () => {
      
      const user = { email: 'user0@test.net', password: 'asdfASDF1234!@#$' }

      await request(app)
        .post('/users')
        .send(user)
        .expect(400)
        .expect(res => {
          expect(res.header['set-cookie']).toBeFalsy()
        })
    })
    
    it(`should respond 302, hash password, create a new user,
      token and cookie, then redirect to /users/me`, async () => {

      const user = { email: 'user2@test.net', password: 'asdfASDF1234!@#$' }

      await request(app)
        .post('/users')
        .send(user)
        .expect(302)
        .expect(res => {
          expect(res.header.location).toEqual('/users/me')
          expect(res.header['set-cookie']).toBeTruthy()
        })

      const foundUser = await User.findOne({ email: user.email })
      expect(foundUser).toBeTruthy()
      expect(foundUser.email).toEqual(user.email)
      expect(foundUser.password).not.toEqual(user.password)
    })
  })

  // GET /users
  describe('GET /users/me', () => {
    
    it('should respond 401 if user is not logged in', async () => {

      await request(app)
        .get('/users/me')
        .expect(401)
    })

    it('should respond 400 if token is invalid', async () => {

      const cookie = `token=${ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' }`

      await request(app)
        .get('/users/me')
        .set('Cookie', cookie)
        .expect(400)
    })

    it('should respond 200 if user is logged in', async () => {

      const cookie = `token=${ tokens[0] }`

      await request(app)
        .get('/users/me')
        .set('Cookie', cookie)
        .expect(200)
    })
  })

  // GET /users/me/edit
  describe('GET /users/me/edit', () => {
    
    it('should respond 401 if user is NOT logged in', async () => {

      await request(app)
        .get(`/users/me/edit`)
        .expect(401)
    })

    it('should respond 200 if user is logged in', async () => {

      const cookie = `token=${ tokens[0] }`

      await request(app)
        .get(`/users/me/edit`)
        .set('Cookie', cookie)
        .expect(200)
    })
  })

  // PATCH /users/me
  describe('PATCH /users/me', () => {
    
    // get jwt secret from env
    const secret = process.env.JWT_SECRET

    // jwt options
    const options = { maxAge: '1d' }

    it('should respond 401, if user is NOT logged in', async () => {

      await request(app)
        .patch('/users/me')
        .expect(401)
    })

    it('should respond 400, and NOT update user, if email is invalid', async () => {

      const user = { email: 'asdf', password: 'asdfASDF1234!@#$' }
      const cookie = `token=${ tokens[0] }`

      await request(app)
        .patch('/users/me')
        .set('Cookie', cookie)
        .send(user)
        .expect(400)

      // verify token against the secret
      const decoded = await jwt.verify(tokens[0], secret, options)

      // find user by id
      const foundUser = await User.findById(decoded._id)

      // found user id should equal decoded user id
      expect(foundUser._id.toString()).toEqual(decoded._id)

      // found user email should not equal decoded email
      expect(foundUser.email).not.toEqual(decoded.email)
    })

    it('should respond 400, and NOT update user, if password is invalid', async () => {

      const user = { email: 'user2@test.net', password: 'pass' }
      const cookie = `token=${ tokens[0] }`

      await request(app)
        .patch('/users/me')
        .set('Cookie', cookie)
        .send(user)
        .expect(400)

      // verify token against the secret
      const decoded = await jwt.verify(tokens[0], secret, options)

      // find user by id
      const foundUser = await User.findById(decoded._id)

      // found user id should equal decoded user id
      expect(foundUser._id.toString()).toEqual(decoded._id)

      // found user email should not equal decoded email
      expect(foundUser.email).not.toEqual(decoded.email)
    })

    it('should respond 400, and NOT update user, if new email already exists in the DB', async () => {

      // existing email and password
      const { email, password } = users[1]

      // cookie with token
      const cookie = `token=${ tokens[0] }`

      await request(app)
        .patch('/users/me')
        .set('Cookie', cookie)
        .send({ email, password })
        .expect(400)

      // verify token against the secret
      const decoded = await jwt.verify(tokens[0], secret, options)

      // find user by id
      const foundUser = await User.findById(decoded._id)

      // found user id should equal decoded user id
      expect(foundUser._id.toString()).toEqual(decoded._id)

      // found user email should not equal decoded email
      expect(foundUser.email).not.toEqual(decoded.email)
    })

    it('should respond 302, update user, and redirect to /users/me', async () => {

      const user = { email: 'user2@test.net', password: 'asdfASDF1234!@#$' }
      const cookie = `token=${ tokens[0] }`

      await request(app)
        .patch('/users/me')
        .set('Cookie', cookie)
        .send(user)
        .expect(302)
        .expect(res => {
          expect(res.header.location).toEqual('/users/me')
        })

      // verify token against the secret
      const decoded = await jwt.verify(tokens[0], secret, options)

      // find user by email
      const foundUser = await User.findOne({ email: user.email })

      // found user id should equal decoded user id
      expect(foundUser._id.toString()).toEqual(decoded._id)

      // found user email should equal provided email
      expect(foundUser.email).toEqual(user.email)

      // password should be hashed and not equal provided password
      expect(foundUser.password).not.toEqual(user.password)
    })
  })

  // DELETE /users/me
  describe('DELETE /users/me', () => {
    
    it('should respond 401 if user is NOT logged in', async () => {

      await request(app)
        .delete('/users/me')
        .expect(401)
    })

    it('should respond 302, delete the user, cookie, and workouts, then redirect to /', async () => {

      const cookie = `token=${ tokens[0] }`

      await request(app)
        .delete(`/users/me`)
        .set('Cookie', cookie)
        .expect(302)
        .expect(res => {
          expect(res.header.location).toEqual('/')
          expect(res.header['set-cookie'])
            .toEqual(["token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"])
        })

      const user = await User.findById(users[0]._id)
      expect(user).toBeFalsy()

      // const exercises = await Exercises.find({ creator: users[0]._id })
      // expect(exercises.length).toBe(0)

      // const workouts = await Workouts.find({ creator: users[0]._id })
      // expect(workouts.length).toBe(0)
    })
  })
})
