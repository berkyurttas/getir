const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const { check, validationResult } = require('express-validator')
const util = require('../util.js')


//Validation array in order to validate request body
const validationArr = [
    check('startDate').custom(startDate => {
        if(!util.isValidDate(startDate)){
            throw new Error('startDate has wrong format')
        }else{
            return true
        }
    }),
    check('endDate').custom(endDate => {
        if(!util.isValidDate(endDate)){
            throw new Error('endDate has wrong format')
        }else{
            return true
        }
    }),
    check('minCount').not().isEmpty().withMessage("minCount cannot be empty").isNumeric().withMessage("minCount has to be numeric"),
    check('maxCount').not().isEmpty().withMessage("maxCount cannot be empty").isNumeric().withMessage("minCount has to be numeric")
]

/**
 * Route serving records with filters.
 * @name post/records
 * @function
 * @inner
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {string} req.body.startDate Lower boundry of createdAt
 * @param {string} req.body.endDate Upper boundry of createdAt
 * @param {integer} req.body.minCount Lower boundry of sum of counts array
 * @param {integer} req.body.maxCount Upper boundry of sum of counts array
 * @return {Object}
 */
router.post('/', validationArr, function(req, res) {
    //checks if there is an error
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let msg = ""
        errors.array().forEach(error => {
            msg += error.msg + "\n"
        })
        return res.status(422).json({ "code": 422, "msg": msg, records:[] })
    }

    if(req.body)
    Record.get(req.body, function(err, records){
        if(err){
            return res.status(500).json(err)
        }
        else{
            const response = {
                "code": 0,
                "msg": "Success",
                "records": records
            }
            return res.send(response)
        }
    })
})

/**
 * Prevent all incoming requests except POST requests
 * @name /records
 * @function
 * @inner
 * @param {Object} req Request
 * @param {Object} res Response
 * @return {Object} Error response which contains method not allowed
 */
router.all('/', function(req,res){
    return res.status(405).json({ "code": 405, "msg": "Method not allowed", records:[] })
})

module.exports = router
