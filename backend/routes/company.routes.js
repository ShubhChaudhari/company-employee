import express from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
} from "../controller/company.controller.js";

const router = express.Router();

// Create a new company
router.post('/companies', createCompany);

// Read all companies
router.get('/companies', getCompanies);

// Read a specific company by ID
router.get('/companies/:id', getCompanyById);

// Update a company by ID
router.patch('/companies/:id', updateCompanyById);

// Delete a company by ID
router.delete('/companies/:id', deleteCompanyById); 

export default router;
