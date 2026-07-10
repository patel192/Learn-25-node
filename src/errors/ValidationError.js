const AppError = require("./AppError");
class ValidationError extends AppError {
    constructor(messsage = "Validation Failed"){
        super(message,400)
    }
}

module.exports = ValidationError;