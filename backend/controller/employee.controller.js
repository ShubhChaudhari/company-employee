import Employee from "../model/employee.model.js";

export const createEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ deleted_at: null }); //retrieve all active Companies
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// export const getEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find().populate('companyId');
//     console.log('employees', employees)
    
//     const secondHighestSalaries = {};

//     employees.forEach((employee) => {
//       const key = `${employee.companyId.name}-${employee.name}`;
//       if (!secondHighestSalaries[key]) {
//         secondHighestSalaries[key] = { max: -Infinity, secondMax: -Infinity };
//       }
      
//       const salary = employee.salary;

//       if (salary > secondHighestSalaries[key].max) {
//         secondHighestSalaries[key].secondMax = secondHighestSalaries[key].max;
//         secondHighestSalaries[key].max = salary;
//       } else if (salary > secondHighestSalaries[key].secondMax && salary < secondHighestSalaries[key].max) {
//         secondHighestSalaries[key].secondMax = salary;
//       }
//     });

//     res.json({ secondHighestSalaries });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEmployeeById = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//--------------------Soft Delete------------------------

export const deleteEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true }
    );
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//---------------Hard Delete--------------------------
// export const deleteEmployeeById = async (req, res) => {
//     try {
//       const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);
//       if (!deletedEmployee) {
//         return res.status(404).json({ error: 'Employee not found' });
//       }
//       res.json(deletedEmployee);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
