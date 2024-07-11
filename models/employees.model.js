const { Schema, model } = require('mongoose');

let empSchema = new Schema({
    name: {
        required: { value: true, message: "Name Is Mandatory" },
        type: String,
    },
    age: {
        required: true,
        type: Number,
    },
    designation: {
        required: true,
        type: String,
    },
    gender: {
        required: [true, "Gender is Mandatory"],
        type: String,
        default: "male"
    },
    mobile: {
        type: String,
        required: true,
        minlength: [10, "Mobile Should Contain Only 10"]
    },
    email: {
        type: String,
        required: [true, "Email is Mandatory"],
    },
    fef: {
        type: String,
        required: true,
        enum: {
            values: ["reactjs", "vuejs", "angularjs"],
            message: "Only reactjs,vuejs, angularjs  are allowed"
        }
    }
}, { timestamps: true })

module.exports = model("employee", empSchema)