import { getBestProfession, getBestPayedClient } from './admin-service';

export const showBestProfession = async (req, res) => {
  const { id } = req.params;
  const { profile } = req;
  const { start, end, limit = 2 } = req.query;
  const professions = await getBestProfession(start, end, limit);
  if (!professions) return res.status(404).end();
  res.json(professions);
};
export const showBestClient = async (req, res) => {
  const { id } = req.params;
  const { profile } = req;
  const { start, end, limit = 2 } = req.query;
  const professions = await getBestPayedClient(start, end, limit);
  if (!professions) return res.status(404).end();
  res.json(professions);
};
