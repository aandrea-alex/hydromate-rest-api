import { mongoose, Schema } from 'mongoose';
import { CONTACT_TYPE } from '../../constants/index.js';
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Set phone number'],
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: Object.values(CONTACT_TYPE), 
      required: [true, 'Set contact type'],
      default: CONTACT_TYPE.PERSONAL,
    },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    photo: { type: String },
  },
  { versionKey: false, timestamps: true },
);

export const ContactsCollection = mongoose.model('Contact', contactSchema);
