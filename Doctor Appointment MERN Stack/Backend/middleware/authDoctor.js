import jwt from "jsonwebtoken";

//user authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dToken } = req.headers;
    if (!dToken) {
      return res.json({ success: false, message: "Not authorized" });
    }
    const token_decode = jwt.verify(dToken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export { authDoctor };
