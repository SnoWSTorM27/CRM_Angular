const { max } = require('moment');
const db = require('../db')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
  
  const {offset, limit, start, end, order} = req.query
  if (start && end) {
    try {

      const orders = await db.query(
        `SELECT * FROM Orders
        WHERE order_date >= '${start}' and order_date <= '${end}' 
        ORDER BY order_date DESC
        OFFSET ${offset}
        LIMIT ${limit}`
      );
      
      res.status(200).json(orders.rows)
    } catch (e) {
      errorHandler(res, e)
    }
  }else if (order) {
    try {
      const orders = await db.query(
        `SELECT * FROM Orders
        WHERE order_number = ${order}
        ORDER BY order_date DESC
        OFFSET ${offset}
        LIMIT ${limit}`);
      
      res.status(200).json(orders.rows)
    } catch (e) {
      errorHandler(res, e)
    }
  } else {
    try {
      const orders = await db.query(
        `SELECT * FROM Orders
        ORDER BY order_date DESC
        OFFSET ${offset}
        LIMIT ${limit}`);
      
      res.status(200).json(orders.rows)
    } catch (e) {
      errorHandler(res, e)
    }
  }
  
}

module.exports.getByOrder = async function(req, res) {
  try {
    const order_id = req.params.order_number
    const category = await db.query(`SELECT * FROM orderpositions where order_id = $1`, [order_id]);
    res.status(200).json(category.rows)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function(req, res) {
  try { 
    const lastOrder = await (await db.query(`SELECT MAX("order_number") FROM Orders`)).rows[0].max;
    const maxOrder = lastOrder ? lastOrder : 0;
    const user_id = req.user.id;
    const total_price = req.body.total_price
    const newOrder = await db.query(`INSERT INTO Orders (order_number, user_id, total_price) values ($1, $2, $3) RETURNING *`, [maxOrder + 1, user_id, total_price]);
    for (const orderPosition of req.body.list) {
      const {name, quantity, cost} = orderPosition
      
      const newSales = await db.query(`INSERT INTO OrderPositions (order_id, name, quantity, cost) values ($1, $2, $3, $4) RETURNING *`, [maxOrder + 1, name, quantity, cost]);
    }
    res.status(201).json(newOrder.rows[0])
  } catch (e) {
    errorHandler(res, e)
  }
  
}
