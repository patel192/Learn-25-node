const AppError = require("./AppError");
class ValidationError extends AppError {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
        this.statusCode = 400;
    }
}

module.exports = ValidationError;