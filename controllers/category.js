const db = require('../db')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const user_id = req.user.id
    const categories = await db.query(`SELECT * FROM Categories where user_id=$1`, [user_id]);
    res.status(200).json(categories.rows)  
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function(req, res) {
  try {
    const id = req.params.id
    const category = await db.query(`SELECT * FROM Categories where id = $1`, [id]);0
    res.status(200).json(category.rows[0])
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function(req, res) {
  try {
    const id = req.params.id
    const category = await db.query(`DELETE FROM Categories where id = $1`, [id]);
    const positions = await db.query(`DELETE FROM Positions where category_id = $1`, [id]);
    res.status(200).json({
      message: `Категория удалена`
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  try {
    const name = req.body.name
    const imageSrc = req.file ? req.file.path : null
    const user_id = req.user.id
    const newCategory = await db.query(`INSERT INTO Categories (name, imageSrc, user_id) values ($1, $2, $3) RETURNING *`, [name, imageSrc, user_id]);
    res.status(201).json(newCategory.rows[0])
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async function(req, res) {
  try {
    const name = req.body.name
    const id = req.params.id
    const user_id = req.user.id
    if (req.file) {
      const imagesrc = req.file.path 
      const category = await db.query(`UPDATE Categories set name = $2, imagesrc = $3, user_id = $4 where id = $1 RETURNING *`, [id, name, imagesrc, user_id]);
      res.status(200).json(category.rows[0])
    } else {
      const category = await db.query(`UPDATE Categories set name = $2, user_id = $3 where id = $1 RETURNING *`, [id, name, user_id]);
      res.status(200).json(category.rows[0])
    }
    
  } catch (e) {
    errorHandler(res, e)
  }
}