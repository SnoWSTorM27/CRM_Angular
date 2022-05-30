const db = require('../db')

module.exports.login = async function (req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
}

module.exports.register = async function(req, res) {
  const {email, password} = req.body
  const newUser = await db.query(`INSERT INTO Users (email, password) values ($1, $2) RETURNING *`, [email, password]);
  res.status(201).json(newUser.rows[0])
}