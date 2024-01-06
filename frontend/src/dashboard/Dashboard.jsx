import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import { dashboardService } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [maxSalary, setMaxSalary] = useState([]);
  const [secHighSalary, setSecHighSalary] = useState([]);
  const navigate = useNavigate();

  const maxSalaryEmployeeList = async () => {
    try {
      const response = await dashboardService.getEmployeeMaxSalary();
      console.log("response", response);
      setMaxSalary(response);
    } catch (error) {}
  };
  const secHighSalaryEmployeeList = async () => {
    try {
      const response = await dashboardService.getEmployeeSecHighestSalary();
      console.log("response", response);
      setSecHighSalary(response);
    } catch (error) {}
  };

  useEffect(() => {
    maxSalaryEmployeeList();
    secHighSalaryEmployeeList();
  }, []);

  const handleButtonClick = () => {
    // Redirect to the desired URL or route
    navigate("/employees"); // Replace this with your desired route
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={()=>navigate("/companies")}
            sx={{ mt: 3, mb: 2 }}
          >
            Manage Company
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            onClick={()=>navigate("/employees")}
            sx={{ mt: 3, mb: 2 }}
          >
            Manage Employee
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ display: "flex", padding: "20px" }}>
        <Grid item xs={6}>
          {/* Company Table */}
          <Typography component="h1" variant="h5">
            Employee Second Highest Salary of their company Table
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {secHighSalary?.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.company_name}</TableCell>
                    <TableCell>{row.employee_name}</TableCell>
                    <TableCell>{row.salary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          {/* Company Table */}
          <Typography component="h1" variant="h5">
            Employee Max salary of their company Table
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Salary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {maxSalary?.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.company_name}</TableCell>
                    <TableCell>{row.employee_name}</TableCell>
                    <TableCell>{row.salary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
