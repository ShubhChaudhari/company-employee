import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} from "../controller/employee.controller.js";

const router = express.Router();

// Create a new employee
router.post('/employees', createEmployee);

// Read all employees
router.get('/employees', getEmployees);

// Read a specific employee by ID
router.get('/employees/:id', getEmployeeById);

// Update a employee by ID
router.patch('/employees/:id', updateEmployeeById);

// Delete a employee by ID
router.delete('/employees/:id', deleteEmployeeById);

export default router;
