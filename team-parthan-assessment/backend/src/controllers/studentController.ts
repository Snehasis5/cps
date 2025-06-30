import { Request, Response } from 'express';
import QuizConcern from '../models/QuizConcern';
import User from '../models/User';

export const enrollUnderInstructor = async (req: any, res: Response) => {
  const { instructorCode } = req.body;
  const instructor = await User.findOne({ instructorCode });
  if (!instructor) return res.status(404).json({ error: 'Instructor not found' });

  const student = await User.findByIdAndUpdate(req.user._id, { enrolledUnder: instructorCode }, { new: true });
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  await student.save();
  res.json(student);
};

export const submitConcern = async (req: any, res: Response) => {
  const { topicId, message } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'PDF is required' });

  const concern = new QuizConcern({
    studentId: req.user._id,
    instructorCode: req.user.enrolledUnder,
    topicId,
    message,
    pdfUrl: `/uploads/${file.filename}`,
    status: 'pending',
  });

  await concern.save();
  res.status(201).json({ success: true, message: 'Concern submitted successfully' });

};