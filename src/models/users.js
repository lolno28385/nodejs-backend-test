const mongoose = require('mongoose');

const { Schema, Schema: {Types} } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: Types.String, required: true },
    lastName: { type: Types.String, required: true },
    email: { type: Types.String, required: true, unique: true },
    passwordHash: { type: Types.String, required: true },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

export default User;
