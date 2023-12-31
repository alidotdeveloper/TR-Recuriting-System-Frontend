const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(200).json({ error: "invalid user" });
    }
    if (!password) {
      return res.status(200).json({ error: "password should not be empty" });
    }

    if (await argon2.verify(user.password, password)) {
      const token = jwt.sign(
        { user: user.id.toString() },
        process.env.SECURITY_KEY
      );
      res.cookie("jwtlogin", token);

      res.status(200).json({
        status: "ok",
        message: "Login successful",
        role: user.role,
        auth: token,
      });
    } else {
      console.log("soory it's not working");
    }
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .json({ error: "An error occurred while lohin and setting cookie" });
  }
};

module.exports = login;
