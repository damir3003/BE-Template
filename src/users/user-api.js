const express = require('express');
const router = express.Router();

const ROUTE_PREFIX = '/users';
import { getProfile } from '../middleware/getProfile';

router.get(`${ROUTE_PREFIX}`, getProfile, async (req, res) => {
  res.json(req.profile);
});

// router.gepostt('/bala', getProfile , async (req, res) => {
//     res.json(req.profile)
// })

export default router;
