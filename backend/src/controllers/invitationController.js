import Invitation from '../models/Invitation.js';

export const createInvitation = async (req, res) => {
  try {
    const { location, locationNote, date, time, telegramId } = req.body;

    if (!location || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'لوکیشن، تاریخ و ساعت الزامی هستند'
      });
    }

    const invitation = await Invitation.create({
      location: location.trim(),
      locationNote: locationNote ? locationNote.trim() : '',
      date: date.trim(),
      time: time.trim(),
      telegramId: telegramId ? String(telegramId).trim() : ''
    });

    res.status(201).json({
      success: true,
      message: 'پاسخ دعوت با موفقیت ثبت شد',
      data: invitation
    });
  } catch (error) {
    console.error('Error creating invitation:', error);
    res.status(500).json({
      success: false,
      message: 'خطا در ثبت پاسخ دعوت'
    });
  }
};
