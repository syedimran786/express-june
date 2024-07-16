const { Schema, model } = require('mongoose');

let userSchema = new Schema({
    firstName: {
        required: [true, "First Name is Mandatory"],
        type: String,
        minlength: [3, "First Name Should Contain Minimum 3 Characters"],
    },
    lastName: {
        type: String,
        maxlength: [10, "Last Name Should Contain Maximum 3 Characters"],
    },
    email: {
        type: String,
        required: [true, "Email is Mandatory"],
    },
    mobile: {
        type: Number,
        required: [true, "Mobile is Mandatory"],
    },
    password: {
        type: String,
        required: [true, "Password is Mandatory"],
        minlength: [8, "Password Should Contain Minimum 8 Characters"]
    },
    confirmPassword: {
        type: String,
        // required: [true, "Confirm Password is Mandatory"],
        // minlength: [8, "Confirm Password Should Contain Minimum 8 Characters"]
    }
})

module.exports = model("user", userSchema)