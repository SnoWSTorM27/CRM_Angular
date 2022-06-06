const { max } = require('moment');
const db = require('../db')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  try {
    const orders = await db.query(`SELECT * FROM Orders`);
    
    res.status(200).json(orders.rows)
  } catch (e) {
    errorHandler(res, e)
  }
  
}

module.exports.create = async function(req, res) {
  try { 
    const lastOrder = await (await db.query(`SELECT MAX("id") FROM Orders`)).rows[0].max;
    const maxOrder = lastOrder ? lastOrder : 0;
    const user_id = req.user.id;
    const {name, quantity} = req.body
    const cost = (await db.query(`SELECT cost FROM Positions where name = $1`, [name])).rows[0].cost;
    const newOrder = await db.query(`INSERT INTO Orders (id, user_id) values ($1, $2) RETURNING *`, [maxOrder + 1, user_id]);
    const newSales = await db.query(`INSERT INTO Sales (order_id, name_sale, quantity, cost_sale) values ($1, $2, $3, $4) RETURNING *`, [maxOrder + 1, name, quantity, cost]);
    res.status(201).json(newOrder.rows[0])
  } catch (e) {
    errorHandler(res, e)
  }
  
}
