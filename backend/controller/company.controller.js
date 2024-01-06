import Company from "../model/company.model.js";

export const createCompany = async (req, res) => {
  try {
    const { name } = req.body;
    const newCompany = await Company.create({ name });
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companys = await Company.find({ deleted_at: null }); // retrieve all active Employees,
    res.json(companys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCompanyById = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCompany) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//------------Hard Delete--------------------------------
// export const deleteCompanyById = async (req, res) => {
//     try {
//       const deletedCompany = await Company.findByIdAndRemove(req.params.id);
//       if (!deletedCompany) {
//         return res.status(404).json({ error: 'Company not found' });
//       }
//       res.json(deletedCompany);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

//----------------Soft Delete--------------------------
  export const deleteCompanyById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCompany = await Company.findByIdAndUpdate(
        id,
        { deleted_at: new Date() },
        { new: true }
      );
      if (!deletedCompany) {
        return res.status(404).json({ error: 'Company not found' });
      }
      res.status(200).json({ message: 'Company deleted successfully', deletedCompany });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
