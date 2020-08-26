export const getProfile = async (req, res, next) => {
  const { Profile } = req.app.get('models');
  const profile = await Profile.findOne({
    where: { id: req.get('profile_id') || 0 },
    raw: true,
  });
  if (!profile) return res.status(401).end();
  req.profile = profile;
  next();
};

export const isAdmin = async (req, res, next) => {
  console.log(req.get('profile_id'))
  if (req.get('profile_id') === 'admin'){
    next();
  }else{
    return res.status(401).end();
  }
};
