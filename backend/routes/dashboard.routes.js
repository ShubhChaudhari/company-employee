import express from "express";
import { employeeTable, salaryTable } from "../controller/dashboard.controller.js";


const router = express.Router();

//employees With MaxSalary
router.get('/dashboard/employeesWithMaxSalary', employeeTable);

//second Highest Salary
router.get('/dashboard/secondHighestSalary', salaryTable);


export default router;
