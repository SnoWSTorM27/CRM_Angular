const express = require('express')
const controller = require('../controllers/analytics')
const router = express.Router()


// /api/analytics/overview
router.get('/overview', controller.overview)
// /api/analytics/analytics
router.get('/analytics', controller.analytics)



module.exports = router