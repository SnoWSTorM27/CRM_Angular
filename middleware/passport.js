const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const db = require('../db')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}


module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async(payload, done) => {
      try {
        const user = (await db.query(`SELECT * FROM Users WHERE id = $1`, [payload.userId])).rows[0]
        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e)
      }
    })
  )
}