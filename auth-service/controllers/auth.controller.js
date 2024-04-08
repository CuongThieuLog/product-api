const User = require("../../user-service/models/user.model");

function AuthController() {
  this.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);

      if (!user) {
        return res
          .status(401)
          .send({ error: "Đăng nhập thất bại! Kiểm tra thông tin xác thực" });
      }

      res.send({ id: user._id, user: user.toAuthJSON() });
    } catch (error) {
      res.status(400).send({ error: "Đăng nhập thất bại!" });
    }
  };

  this.logout = async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token != req.token;
      });

      await req.user.save();
      res.send({ message: "Đăng xuất thành công!" });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  this.logoutAll = async (req, res) => {
    try {
      req.user.tokens.splice(0, req.user.tokens.length);
      await req.user.save();
      res.send();
    } catch (error) {
      res.status(500).send(error);
    }
  };

  return this;
}

module.exports = AuthController();
