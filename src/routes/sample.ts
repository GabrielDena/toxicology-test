import * as express from 'express';
import SampleController from '../controllers/sample.controller';

const sampleRoutes = express.Router();
const controller = new SampleController();

sampleRoutes.get('/samples', controller.getAllSamples);
sampleRoutes.get('/sample/:code', controller.getSample);
sampleRoutes.post('/sample', controller.insertSample);

export default sampleRoutes;
