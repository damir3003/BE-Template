import express from 'express';
import bodyParser from 'body-parser';
import { sequelize } from './model';
import contractsApi from './contracts/contracts-api';
import jobsApi from './jobs/jobs-api';
import userApi from './users/user-api';
import adminApi from './admin/admin-api';

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

app.use('/', contractsApi);
app.use('/', jobsApi);
app.use('/', userApi);
app.use('/', adminApi);

module.exports = app;
