const collectionRef = 'messages';

const MessagesSchema = {
  sender: {
    id: { type: String, required: true},
    author: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String }
  },
  message: { type: String, required: true }
};

export { collectionRef, MessagesSchema };