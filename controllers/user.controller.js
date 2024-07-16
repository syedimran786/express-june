const asyncWrapper = require('../helpers/asyncWrapperFunc');
const User = require('../models/user.model');


let registerUser = asyncWrapper(async (req, res, next) => {
    let { firstName, lastName, email, mobile, password, confirmPassword } = req.body
    if (password === confirmPassword) {
        let isUserAvailable = await User.findOne({ $or: [{ mobile }, { email }] })

        if (!isUserAvailable) {
            let user = await User.create({ firstName, lastName, email, mobile, password: confirmPassword })
            return res.status(201).json({ error: false, message: "User Registered Successfully" })
        }
        return res.status(403).json({ error: true, message: "User Already Exists" })
    }
    else {
        return res.status(500).json({ error: true, message: "Password is Not Matching" })
    }
})

let loginUser = async (req, res, next) => {
    let { email, mobile, password } = req.body

    let isUserAvailable = await User.findOne({ $or: [{ mobile }, { email }] })
    if (isUserAvailable) {
        if (password === isUserAvailable.password) {
            return res.status(200).json({ error: false, message: "User Logged in Successfully" })
        }
        else {
            return res.status(401).json({ error: true, message: "Password is Incorrect" })
        }
    }
    return res.status(404).json({ error: true, message: "User Not Exists" })

}

module.exports = {
    registerUser,
    loginUser
}