const bcrypt = require("bcryptjs");

module.exports = {
  hash: (password, saltRounds = 10) => {
    return bcrypt.hashSync(password, saltRounds);
  },
  compare: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  },
};
