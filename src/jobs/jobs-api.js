const express = require('express');
const router = express.Router();

const ROUTE_PREFIX = '/jobs';
import { getProfile } from '../middleware/getProfile';
import { put, index } from './jobs-controller';

router.post(`${ROUTE_PREFIX}/:id/pay`, getProfile, async (req, res) =>
  put(req, res)
);
router.get(`${ROUTE_PREFIX}/unpaid`, getProfile, async (req, res) =>
  index(req, res)
);

export default router;
