const AppError = require("../AppError");
class ForbiddenError extends AppError{
    construtor(message = "Forbidden"){
        super(message,403)
    }
}

module.exports = ForbiddenError;