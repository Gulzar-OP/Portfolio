import express from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";
// import path from "path";

import dotenv from 'dotenv'
dotenv.config()

import AuthRoutes from './routes/AuthRoutes.js'
import SkillRoutes from './routes/SkillRoutes.js'
import EducationRoutes from './routes/EducationRoutes.js'
import CertificateRoutes from './routes/CertificateRoute.js'
import BlogRoutes from './routes/BlogRoutes.js'
import ContactRoutes from './routes/ContactRoutes.js'
import ProfileRoutes from './routes/ProfileRoute.js'
import SettingRooutes from './routes/SettingRoutes.js'
import ProjectRoutes from './routes/ProjectRoutes.js'

import connectionDB from './config/connectDB.js';
const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_API,
    ],
    credentials: true,
  })
);
const PORT = process.env.PORT || 2000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/v1/auth', AuthRoutes);
app.use("/api/v1/skills", SkillRoutes);
app.use("/api/v1/education", EducationRoutes);
app.use("/api/v1/certificate", CertificateRoutes)
app.use("/api/v1/blogs", BlogRoutes)
app.use('/api/v1/contact',ContactRoutes)
app.use('/api/v1/profile',ProfileRoutes)
app.use('/api/v1/settings',SettingRooutes)
app.use('/api/v1/projects',ProjectRoutes)

app.listen(PORT, () => {
  connectionDB();
  console.log(`Server is running on port ${PORT}`)
})