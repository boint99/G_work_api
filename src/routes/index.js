import express from 'express'
import { StatusCodes } from 'http-status-codes';
import { userRoute } from './user/userRoute';

const Router = express.Router()

// define the about route
Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'APIs_Route are ready to use.' })
});

// user
Router.use('/login', userRoute )

export const APIs_Route = Router
