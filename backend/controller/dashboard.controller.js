import Company from "../model/company.model.js";
import Employee from "../model/employee.model.js";


export const employeeTable = async (req, res) => {
  try {
    const employees = await Employee.aggregate([
      { $sort: { salary: -1 } },
      {
        $group: {
          _id: "$companyId",
          employee: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $project: {
          _id: 0,
          employee_name: "$employee.name",
          company_name: "$company.name",
          salary: "$employee.salary",
        },
      },
    ]);
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const salaryTable = async(req, res) =>{
    try {
        const companies = await Company.find({});
        const result = [];
    
        for (const company of companies) {
          const employees = await Employee.find({ companyId: company._id }).sort({ salary: -1 }).limit(2);
          const secondHighestSalary = employees[1]; // Assuming at least two employees exist
    
          if (secondHighestSalary) {
            result.push({
              company_name: company.name,
              employee_name: secondHighestSalary.name,
              salary: secondHighestSalary.salary
            });
          }
        }
    
        res.json(result);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
