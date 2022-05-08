import mongoose from 'mongoose';
const collectionRef = 'users';

const UsersSchema = {
  name:       { type: String, required: true, },
  last_name:  { type: String, required: true, },
  email:      { type: String, required: true, unique: true },
  username:   { type: String, required: true, unique: true },
  role:       { type: String, required: true },
  avatar:     { type: String, required: true },
  password:   { type: String, required: true },
  cart:       { type: String, required: true },
//   cart: {
//       _id:     { type: String },
//       products: { type: [ { type: mongoose.Schema.Types.ObjectId, ref: 'products' } ] }, 
//     }
};

export { collectionRef, UsersSchema };
