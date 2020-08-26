const express = require('express');
const router = express.Router();

const ROUTE_PREFIX = '/admin';
import { showBestProfession, showBestClient } from './admin-controller';
import { isAdmin } from '../middleware/getProfile';

router.get(`${ROUTE_PREFIX}/best-profession`,isAdmin, async (req, res) =>
  showBestProfession(req, res)
);
router.get(`${ROUTE_PREFIX}/best-clients`,isAdmin, async (req, res) =>
  showBestClient(req, res)
);

export default router;
