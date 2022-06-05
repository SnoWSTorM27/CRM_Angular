const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const db = require('../db')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
  const { email, password } = req.body
  const candidate = (await db.query(`SELECT (email) FROM Users WHERE email = $1`, [email])).rows[0]?.email;
  if (candidate) {
    const candidatePassowrd = (await db.query(`SELECT (password) FROM Users WHERE email = $1`, [email])).rows[0]?.password;
    const user_id = (await db.query(`SELECT (id) FROM Users WHERE email = $1`, [email])).rows[0]?.id;
    console.log('user_id:' , user_id);
    const passwordResult = bcrypt.compareSync(password, candidatePassowrd)
    if (passwordResult) {
      
      const token = jwt.sign({
        email: candidate,
        userId: user_id
      }, keys.jwt, {expiresIn: 3600})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: `Пароли не совпадают. Попробуйте снова `
      })
    }
  } else {
    res.status(404).json({
      message: `Такой email: ${email} не зарегестрирован .`
    })
  }

}

module.exports.register = async function(req, res) {
  const {email, password} = req.body

  const candidate = (await db.query(`SELECT (email) FROM Users WHERE email = $1`, [email])).rows[0]?.email;

  
  if (candidate) {
    res.status(409).json({
      message: `Такой email: ${email} уже занят. Попробуйте другой.`
    })
  } else { 
    try {
      const salt = bcrypt.genSaltSync(7)
      const hashPassword = bcrypt.hashSync(password, salt)

      const newUser = await db.query(`INSERT INTO Users (email, password) values ($1, $2) RETURNING *`, [email, hashPassword]);
      res.status(201).json(newUser.rows[0])
    } catch (error) {
      errorHandler(res, error)
    }
      
  }

  
}