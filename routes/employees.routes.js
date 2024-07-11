const {
    addEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employees.controller');
const express = require('express');

let router = express.Router()

router.post("/addemp", addEmployee)
router.get("/allemp", getAllEmployees)
router.get("/singleemp/:eid", getEmployee)
router.put("/updateemp/:eid", updateEmployee)
router.delete("/deleteemp/:eid", deleteEmployee)


module.exports = router