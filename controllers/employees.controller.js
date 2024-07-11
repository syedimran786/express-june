const Employee = require('../models/employees.model');

let addEmployee = async (req, res, next) => {
    try {
        let { name, age, designation, gender, mobile, email, fef } = req.body;

        let isUserAvailable = await Employee.findOne({ $or: [{ mobile }, { email }] });

        if (isUserAvailable) {
            return res.status(201).json({ error: true, message: "Mobile Number or Email is Already Registered" })
        }

        let employee = await Employee.create({ name, age, designation, gender, mobile, email, fef })
        return res.status(201).json({ error: false, message: "Employee Added Successfully", data: employee })
    }
    catch (err) {
        next(err)
    }
}

let getAllEmployees = async (req, res, next) => {
    try {
        let employees = await Employee.find()
        res.status(201).json({ error: false, message: "Empployees Fetched Successfully", data: employees })

    }
    catch (err) {
        next(err)
    }
    res.status(201).json({ error: false, message: "Empployees Fetched Successfully" })
}

let getEmployee = async (req, res, next) => {
    try {
        let { eid } = req.params;
        let employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(400).json({ error: true, message: "No Employee Found With Given Id" })
        }
        res.status(201).json({ error: false, message: "Empployee Fetched Successfully", data: employee })
    }
    catch (err) {
        next(err)
    }

}

let updateEmployee = async (req, res, next) => {
    try {
        let { eid } = req.params;
        let { age } = req.body
        let employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(400).json({ error: true, message: "No Employee Found With Given Id" })
        }
        let updatedEmployee = await Employee.findByIdAndUpdate(eid, { $set: { age } }, { new: true, runValidators: true })

        res.status(201).json({ error: false, message: "Empployee Updated Successfully", data: updatedEmployee })
    }
    catch (err) {
        next(err)
    }
}

let deleteEmployee = async (req, res, next) => {
    try {
        let { eid } = req.params;
        let employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(400).json({ error: true, message: "No Employee Found With Given Id" })
        }
        let deletedEmployee = await Employee.findByIdAndDelete(eid)

        res.status(201).json({ error: false, message: "Empployee deleted Successfully", data: deletedEmployee })
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
}