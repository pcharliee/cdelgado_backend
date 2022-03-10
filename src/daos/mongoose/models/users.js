import mongoose from 'mongoose';
const collectionRef = 'users';

const UsersSchema = {
  name:       { type: String, required: true, },
  last_name:  { type: String, required: true, },
  email:      { type: String, required: true, unique: true },
  username:   { type: String, required: true, unique: true },
  avatar:     { type: String },
  password:   { type: String, required: true },
  cart: {
    type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'products' } ], 
    default: []
  },
};

export { collectionRef, UsersSchema };
