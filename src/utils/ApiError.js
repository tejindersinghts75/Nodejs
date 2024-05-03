// class ApiError extends Error {
//   constructor(
//       statusCode,
//       message= "Something went wrong",
//       errors = [],
//       stack = ""
//   ){
//       super(message)
//       this.statusCode = statusCode
//       this.data = null
//       this.message = message
//       this.success = false;
//       this.errors = errors

//       if (stack) {
//           this.stack = stack
//       } else{
//           Error.captureStackTrace(this, this.constructor)
//       }

//   }
//   toJSON() {
//     return {
//         statusCode: this.statusCode,
//         message: this.message,
//         errors: this.errors,
//         success: this.success,
//     };
// }
// }

// export {ApiError}
class ApiError {
    constructor(statusCode, data, message = "Failed"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = false
    }
}

export { ApiError }