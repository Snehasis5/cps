import express, { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';

dotenv.config();
const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

interface AuthRequestBody {
  email: string;
  password: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true if using port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

router.post('/register', async (req: Request<{}, {}, AuthRequestBody>, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, passedArray: [] });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email, role: 'user' }, process.env.JWT_SECRET as string, { expiresIn: '2h' });
    res.status(201).json({ message: 'Registration successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req: Request<{}, {}, AuthRequestBody>, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password ?? '');
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id, email, role: 'user' }, process.env.JWT_SECRET as string, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/google', async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload?.email) {
      res.status(400).json({ message: 'Invalid Google token' });
      return;
    }

    let user = await User.findOne({ 
      $or: [
        { email: payload.email },
        { googleId: payload.sub }
      ]
    });

    if (!user) {
      user = new User({
        email: payload.email,
        googleId: payload.sub,
        profile: {
          name: payload.name || '',
          picture: payload.picture || ''
        }
        // No password required for Google users
      });
      await user.save();
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, role: 'user' },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    );

    res.json({ token: jwtToken });
    return;
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
    return;
  }
});

router.post('/forgot-password', async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '15m' });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = `
      <p>Hello ${(user.profile?.name) || 'User'},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you didn’t request this, you can ignore this email.</p>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_FROM || '"MyApp" <no-reply@myapp.com>',
      to: user.email,
      subject: 'Password Reset Request',
      html: message,
    });

    res.json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/reset-password', async (req: Request, res: Response): Promise<void> => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

router.get('/verify', (req: Request, res: Response): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: JwtPayload | string | undefined) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    res.status(200).json({ message: 'Token is valid' });
  });
});

export default router;