import express, {json} from 'express';
import authRoutes from './Routes/authRoutes';
//import userRoutes from './Routes/userRoutes';
import viewRoutes from './Routes/viewRoutes';
import incidentRoutes from './Routes/incidentRoutes';
import pollRoutes from './Routes/pollRoutes';
import cors from 'cors'
//import './types/express'

const app = express();

app.use(cors());

app.use(json());

app.use('/auth', authRoutes);
//app.use('/users', userRoutes);
app.use('/views', viewRoutes);
app.use('/incidents', incidentRoutes);
app.use('/polls', pollRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
