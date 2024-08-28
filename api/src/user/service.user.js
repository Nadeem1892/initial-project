const User = require("./model.user");
const bcrypt = require("bcrypt");
const userService = {};

userService.registerUser = async ({ name, email, password }) => {
  try {
    const hash = bcrypt.hashSync(password, 10);

    let newUser = await User.create({ name, email, password: hash });
    return { status: "OK", data: newUser };
  } catch (err) {
    return { status: "ERR", data: null, error: err };
  }
};

userService.getUserEmail = async (email) => {
  try {
    let user = await User.find({ email });
    return { status: "OK", data: user, error: null };
  } catch (err) {
    return { status: "ERR", data: [], error: err };
  }
};

// userService.finduser = async (matchFiels)=>{
//     return User.findOne({...matchFiels})
// }

userService.userLogin = async (email, password) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      let { password: hash } = user;
      let isMatched = bcrypt.compareSync(password, hash);
      if (isMatched) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = userService;
