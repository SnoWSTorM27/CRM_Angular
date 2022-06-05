const db = require('../db')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function(req, res) {
  try {
    const category_id = req.params.categoryId
    const user_id = req.user.id
    const positions = await db.query(`SELECT * FROM Positions where category_id = $1, user_id = $2`, [category_id, user_id]);
    res.status(200).json(positions.rows)
  } catch (e) {
    errorHandler(res, e)
  }
  
}

module.exports.create = async function(req, res) {
  try {
    const {name, cost, category_id} = req.body
    const user_id = req.user.id
    const newPosition = await db.query(`INSERT INTO Positions (name, cost, category_id, user_id) values ($1, $2, $3, $4) RETURNING *`, [name, cost, category_id, user_id]);
    res.status(201).json(newPosition.rows[0])
  } catch (e) {
    errorHandler(res, e)
  }
  
}

module.exports.remove = async function(req, res) {
  try {
    const id = req.params.id
    const position = await db.query(`DELETE FROM Positions where id = $1`, [id]);
    res.status(200).json({
      message: `Позиция была удалена`
    })
  } catch (e) {
    errorHandler(res, e)
  }
  
}

module.exports.update = async function(req, res) {
  try {
    const {name, cost, category_id} = req.body
    const id = req.params.id
    const user_id = req.user.id
    const position = await db.query(`UPDATE Positions set name = $2, cost = $3, category_id = $4, user_id = $5 where id=$1 RETURNING *`, [id, name, cost, category_id, user_id]);
    res.status(200).json(position.rows[0])
  } catch (e) {
    errorHandler(res, e)
  }
  
}
