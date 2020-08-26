import { getAllUnpaidJobsForUser, payJob } from './jobs-service';

export const index = async (req, res) => {
  const { profile } = req;
  const contracts = await getAllUnpaidJobsForUser(profile);
  if (!contracts) return res.status(404).end();
  res.json(contracts);
};

export const put = async (req, res) => {
  const { profile } = req;
  const { id } = req.params;
  try {
    await payJob(id, profile);
    res.json({ done: 'platio' });
  } catch (er) {
    res.status(500).json({ error: er.message });
  }
};
