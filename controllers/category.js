const db = require('../db')

module.exports.getAll = async function(req, res) {
  const categories = await db.query(`SELECT * FROM Categories`);
  res.status(200).json(categories.rows)
}

module.exports.getById = async function(req, res) {
  const id = req.params.id
  const category = await db.query(`SELECT * FROM Categories where id = $1`, [id]);0
  res.status(200).json(category.rows[0])
}

module.exports.remove = async function(req, res) {
  const id = req.params.id
  const category = await db.query(`DELETE FROM Categories where id = $1`, [id]);
  res.status(200).json(category.rows[0])
}

module.exports.create = async function(req, res) {
  const {id, name, imageSrc, user_id} = req.body
  const newCategory = await db.query(`INSERT INTO Categories (name, imageSrc, user_id) values ($1, $2, $3) RETURNING *`, [name, imageSrc, user_id]);
  res.status(201).json(newCategory.rows[0])
}

module.exports.update = async function(req, res) {
  const {name, imageSrc, user_id} = req.body
  const id = req.params.id
  const category = await db.query(`UPDATE Categories set name = $2, imageSrc = $3, user_id = $4 where id=$1 RETURNING *`, [id, name, imageSrc, user_id]);
  res.status(202).json(category.rows[0])

}