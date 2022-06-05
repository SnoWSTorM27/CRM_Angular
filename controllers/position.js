const db = require('../db')

module.exports.getByCategoryId = async function(req, res) {
  const category_id = req.params.categoryId
  const positions = await db.query(`SELECT * FROM Positions where category_id = $1`, [category_id]);
  res.status(200).json(positions.rows)
}

module.exports.create = async function(req, res) {
  const {name, cost, category_id, user_id} = req.body
  const newPosition = await db.query(`INSERT INTO Positions (name, cost, category_id, user_id) values ($1, $2, $3, $4) RETURNING *`, [name, cost, category_id, user_id]);
  res.status(201).json(newPosition.rows[0])
}

module.exports.remove = async function(req, res) {
  const id = req.params.id
  const position = await db.query(`DELETE FROM Positions where id = $1`, [id]);
  res.status(200).json(position.rows[0])
}

module.exports.update = async function(req, res) {
  const {name, cost, category_id, user_id} = req.body
  const id = req.params.id
  const position = await db.query(`UPDATE Positions set name = $2, cost = $3, category_id = $4, user_id = $5 where id=$1 RETURNING *`, [id, name, cost, category_id, user_id]);
  res.status(202).json(position.rows[0])
}
