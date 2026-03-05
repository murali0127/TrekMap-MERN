class ExpressError extends Error {
      constructor(message, statusCode) {
            super(message); //CALLS THE PARENT(Error)'s CONSTRUCTOR

            this.statusCode = statusCode;

      }

}

module.exports = ExpressError;