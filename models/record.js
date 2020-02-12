const mongojs = require('mongojs')
const isodate = require("isodate")
const config = require('../config.json')
const db = mongojs(config.db)

exports.get = (params, callback) => {

    //params
    const startDate = new Date(isodate(params.startDate).toISOString())
    const endDate = new Date(isodate(params.endDate).toISOString())
    const minCount = params.minCount
    const maxCount = params.maxCount

    const Records = db.collection('records')

    Records.aggregate([
        {
            "$project": {
                "_id": 0,
                "key": 1,
                "createdAt": 1,
                "totalCount": {
                    "$sum": "$counts"
                }
            }
        },
        {
            $match: {
                "createdAt": {
                    $gte: startDate,
                    $lte: endDate
                },
                "totalCount": {
                    $gte: minCount,
                    $lte: maxCount
                }
            }
        }
    ], function (err, docs) {
        if(err){
            return callback({ "code": 500, "msg": err.errmsg, records:[] })
        }
        return callback(null,docs);
    })
}