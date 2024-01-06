import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

const companyService = {
  getAllCompanies: async () => {
    try {
      const response = await axios.get(`${apiUrl}/companies`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching companies");
    }
  },
  getCompany: async (companyId) => {
    try {
      const response = await axios.get(`${apiUrl}/companies/${companyId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching company");
    }
  },
  addCompany: async (companyData) => {
    try {
      const response = await axios.post(`${apiUrl}/companies`, companyData);
      return response.data;
    } catch (error) {
      throw new Error("Error adding company");
    }
  },
  updateCompany: async (companyId,companyData) => {
    try {
      const response = await axios.patch(`${apiUrl}/companies/${companyId}`, companyData);
      return response.data;
    } catch (error) {
      throw new Error("Error adding company");
    }
  },
  deleteCompany: async (companyId) => {
    try {
      const response = await axios.delete(`${apiUrl}/companies/${companyId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error adding company");
    }
  },
};

const employeeService = {
  getAllEmployees: async () => {
    try {
      const response = await axios.get(`${apiUrl}/employees`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching employees");
    }
  },
  getEmployee: async (employeeId) => {
    try {
      const response = await axios.get(`${apiUrl}/employees/${employeeId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching employee");
    }
  },
  addEmployee: async (employeeData) => {
    try {
      const response = await axios.post(`${apiUrl}/employees`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error("Error adding employee");
    }
  },
  updateEmployee: async (employeeId,employeeData) => {
    try {
      const response = await axios.patch(`${apiUrl}/employees/${employeeId}`, employeeData);
      return response.data;
    } catch (error) {
      throw new Error("Error adding employee");
    }
  },
  deleteEmployee: async (employeeId) => {
    try {
      const response = await axios.delete(`${apiUrl}/employees/${employeeId}`);
      return response.data;
    } catch (error) {
      throw new Error("Error adding employee");
    }
  },
};

const dashboardService = {

  //employees With MaxSalary
  getEmployeeMaxSalary: async () => {
    try {
      const response = await axios.get(`${apiUrl}/dashboard/employeesWithMaxSalary`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching employees");
    }
  },
  //second Highest Salary
  getEmployeeSecHighestSalary: async () => {
    try {
      const response = await axios.get(`${apiUrl}/dashboard/secondHighestSalary`);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching employees");
    }
  },
}

export { companyService, employeeService, dashboardService };