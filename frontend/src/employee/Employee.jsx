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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { companyService, employeeService } from "../services/apiService";
import moment from "moment";

const initialValueEmployee = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  salary: "",
  companyId: "",
};

const Employee = () => {
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState(initialValueEmployee);

  function formatDateToDDMMYYYY(dateString) {
    return moment(dateString).format("DD-MM-YYYY");
  }

  const handleEmployeeInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const fetchCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();
      console.log("response", response);
      setCompanies(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await employeeService.getAllEmployees();
      console.log("response", response);
      setEmployees(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchEmployees();
  }, []);

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    const employeeId = employeeData._id;
    try {
      if (employeeId) {
        const response = await employeeService.updateEmployee(
          employeeId,
          employeeData
        );
        // console.log("response", response);
        setEmployeeData(initialValueEmployee);
        fetchEmployees();
      } else {
        const response = await employeeService.addEmployee(employeeData);
        // console.log("response", response);
        setEmployeeData(initialValueEmployee);
        fetchEmployees();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEmployeeEdit = async (employeeId) => {
    console.log("employeeId", employeeId);
    try {
      const response = await employeeService.getEmployee(employeeId);
      setEmployeeData(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEmployeeDelete = async (employeeId) => {
    const response = await employeeService.deleteEmployee(employeeId);
    console.log(response);
    fetchEmployees();
  };

  return (
    <div>
      {/* Employee Form */}
      <Grid
        container
        sx={{ padding: "10px", display: "flex", alignItems: "center" }}
      >
        <Grid item xs={6}>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Employee Form
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleEmployeeSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      name="name"
                      fullWidth
                      label="Name"
                      value={employeeData.name}
                      onChange={handleEmployeeInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={employeeData.email}
                      onChange={handleEmployeeInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="tel"
                      value={employeeData.phone}
                      onChange={handleEmployeeInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="dob"
                      label="Date of Birth"
                      type="date"
                      name="dob"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={employeeData.dob}
                      onChange={handleEmployeeInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="salary"
                      label="Salary"
                      name="salary"
                      value={employeeData.salary}
                      onChange={handleEmployeeInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="companyIdLabel">Company</InputLabel>
                      <Select
                        labelId="companyIdLabel"
                        id="companyId"
                        label="Company"
                        name="companyId"
                        value={employeeData.companyId}
                        onChange={handleEmployeeInputChange}
                      >
                        {companies.map((company) => (
                          <MenuItem key={company.id} value={company._id}>
                            {company.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Create Employee
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={6}>
          {/* Employee Table */}
          <Container component="main" maxWidth="">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Date of Birth</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Salary</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee._id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>
                        {formatDateToDDMMYYYY(employee.dob)}
                      </TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.phone}</TableCell>
                      <TableCell>{employee.salary}</TableCell>
                      <TableCell>
                        {/* Edit and Delete buttons */}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEmployeeEdit(employee._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleEmployeeDelete(employee._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Employee;
