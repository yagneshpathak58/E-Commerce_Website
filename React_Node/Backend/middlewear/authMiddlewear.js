import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  // 🔍 Debugging: log incoming headers and secret
  console.log("Authorization header:", req.headers.authorization);
  console.log("JWT_SECRET:", JWT_SECRET);

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};



// import jwt from 'jsonwebtoken';
// const JWT_SECRET = 'process.env.JWT_SECRET';

// export const verifyToken = (req, res, next) => {

//     const token = req.headers.authorization?.split(' ')[1];

//     if(!token) return res.status(401).json({ message: 'No token provided' });

//     try
//     {
//         const decoded = jwt.verify(token, JWT_SECRET);

//         req.user = decoded;

//         next();


//     }
//     catch(err)
//     {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };