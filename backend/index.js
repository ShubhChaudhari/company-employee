import dotenv from 'dotenv';
import express from 'express';
import connectDB from './db.js';
import companyRoutes from './routes/company.routes.js';
import employeeRoutes from './routes/employee.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js';
import cors from "cors"

const app = express();

// database connection  
dotenv.config();
connectDB();

// middlewares

app.use(express.json({}));
app.use(cors());


//route
app.use("/api", companyRoutes);
app.use("/api", employeeRoutes);
app.use("/api", dashboardRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT}`);
  });
