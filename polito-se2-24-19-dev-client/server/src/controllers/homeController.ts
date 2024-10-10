import { Request, Response } from 'express';
import { getHomeMessage } from '../services/homeService';

export const homeController = (req: Request, res: Response) => {
    const message = getHomeMessage();
    res.send(message);
};