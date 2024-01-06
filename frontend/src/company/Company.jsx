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
  Box,
  Typography,
  Container,
} from "@mui/material";
import { companyService } from "../services/apiService";
import moment from "moment";

const initialValueCompany = {
  name: "",
};

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [companyData, setCompanyData] = useState(initialValueCompany);

  function formatDateToDDMMYYYY(dateString) {
    return moment(dateString).format("DD-MM-YYYY");
  }

  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({
      ...companyData,
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

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    const companyId = companyData._id;
    try {
      if (companyId) {
        const response = await companyService.updateCompany(
          companyId,
          companyData
        );
        console.log("response", response);
        setCompanyData(initialValueCompany);
        fetchCompanies();
      } else {
        const response = await companyService.addCompany(companyData);
        console.log("response", response);
        setCompanyData(initialValueCompany);
        fetchCompanies();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCompanyEdit = async (companyId) => {
    try {
      const response = await companyService.getCompany(companyId);
      setCompanyData(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCompanyDelete = async (employeeId) => {
    const response = await companyService.deleteCompany(employeeId);
    console.log(response);
    fetchCompanies();
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
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
                  Company Form
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleCompanySubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="name"
                        fullWidth
                        label="Name"
                        value={companyData.name}
                        onChange={handleCompanyInputChange}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create Company
                  </Button>
                </Box>
              </Box>
            </Container>
          </Grid>
          <Grid item xs={6}>
            {/* Company Table */}
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Updated At</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company._id}>
                      <TableCell>{company.name}</TableCell>
                      <TableCell>
                        {formatDateToDDMMYYYY(company.created_at)}
                      </TableCell>
                      <TableCell>
                        {formatDateToDDMMYYYY(company.updated_at)}
                      </TableCell>
                      <TableCell>
                        {/* Edit and Delete buttons */}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleCompanyEdit(company._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleCompanyDelete(company._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Company;
