const express = require('express');
const router = express.Router();

const ROUTE_PREFIX = '/contracts';
import { getProfile } from '../middleware/getProfile';
import { show, index } from './contracts-controller';

router.get(`${ROUTE_PREFIX}/:id`, getProfile, async (req, res) =>
  show(req, res)
);
router.get(`${ROUTE_PREFIX}`, getProfile, async (req, res) => index(req, res));

export default router;
