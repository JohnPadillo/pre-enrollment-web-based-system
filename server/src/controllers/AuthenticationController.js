const User = require("../models/User");

module.exports = {
  async register(req, res) {
    // res.send({
    //   message: `Hello ${req.body.email}! Your email was registerd`
    // });
    try {
      const user = await User.create(req.body);
      res.send(user.toJSON());
    } catch (error) {
      res.status(400).send({
        error: "This email is already in use."
      });
    }
  }
};
