const db = require('../db')

module.exports.getAll = async function(req, res) {
  const orders = await db.query(`SELECT * FROM Orders`);
  res.status(200).json(orders.rows)
}

module.exports.create = async function(req, res) {
  const {id, order_date, user_id} = req.body
  const newOrder = await db.query(`INSERT INTO Orders (id, user_id) values ($1, $2) RETURNING *`, [id, user_id]);
  res.status(201).json(newOrder.rows[0])
}
