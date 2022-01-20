const collectionRef = 'users';

const UsersSchema = {
  name:      { type: String, required: true, },
  last_name: { type: String, required: true, },
  email:     { type: String, required: true, unique: true },
  username:  { type: String, required: true, unique: true },
  password:  { type: String, required: true }
};

export { collectionRef, UsersSchema };