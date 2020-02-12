var express = require('express')
  , router = express.Router()

router.use('/records', require('./records'))

module.exports = router