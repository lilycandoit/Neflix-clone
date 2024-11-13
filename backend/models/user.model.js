import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default:''
  },
  searchHistory: {
    type: Array,
    default: []
  }
})

export const User = mongoose.model('User', userSchema);
// meaning to create users based on userSchema above from mongoose library, noted that  'User' is singular and first letter should be capitallized, which mean per user