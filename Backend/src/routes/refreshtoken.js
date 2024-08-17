import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../config/models/usermodel.js';
import blacklistModel from '../config/models/blaclistModel.js';

const tokengenrater = Router();

tokengenrater.post('/', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  // Check if the refresh token exists in the database
  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
  });
});

tokengenrater.post('/regen', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  // Remove the refresh token from the user's document
  const user = await User.findOne({ refreshToken });
  if (!user) return res.sendStatus(403);

  user.refreshToken = null;
  await user.save();

  res.sendStatus(200);
});

export default tokengenrater;
