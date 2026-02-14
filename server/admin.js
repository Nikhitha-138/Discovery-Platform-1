const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const User = require('./db/models/user');

const createAdmin = async () => {
  await mongoose.connect("mongodb://localhost:27017/cannabis");
  const name = 'cannabis'
  const email = 'cannabis@gmail.com'
  const password = 'Admin@123'
  const hashedPassword = await bcrypt.hash(password, 10)

  await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: 'Admin'
  })
  console.log("Admin added to DB"); process.exit();
}
createAdmin()