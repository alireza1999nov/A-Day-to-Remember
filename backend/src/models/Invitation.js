import mongoose from 'mongoose';

const invitationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: [true, 'لوکیشن الزامی است'],
      trim: true
    },
    locationNote: {
      type: String,
      default: '',
      trim: true
    },
    date: {
      type: String,
      required: [true, 'تاریخ الزامی است'],
      trim: true
    },
    time: {
      type: String,
      required: [true, 'ساعت الزامی است'],
      trim: true
    },
    telegramId: {
      type: String,
      default: '',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;
