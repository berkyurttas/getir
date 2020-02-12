//Validate date inputs (YYYY-MM-DD)
const isValidDate = (dateString) => {
    if(dateString != undefined){
        var regEx = /^\d{4}-\d{2}-\d{2}$/
        if(!dateString.match(regEx)){
            return false
        }
        var d = new Date(dateString)
        var dNum = d.getTime()
        if(!dNum && dNum !== 0) {
            return false
        }
        return d.toISOString().slice(0,10) === dateString
    }else{
        return false
    }
}

exports.isValidDate = isValidDate;