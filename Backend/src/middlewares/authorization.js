import sendResponse from "../helpers/sendResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Guarantor from '../models/Guarontor.model.js'
import User from "../models/User.model.js";

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized!" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    
    if (!req.user) return res.status(401).json({ message: "User not found!" });

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token!" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    await verifyUser(req, res, async () => {
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied! Admins only." });
      }
      next();
    });
  } catch (error) {
    res.status(500).json({ message: "Server error!", error });
  }
};

export async function authorizationUser(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    console.log("Bearer Token:", bearerToken); // Debugging

    if (!bearerToken) {
      return sendResponse(res, 403, null, true, "Token not provided");
    }

    const token = bearerToken.split(" ")[1];
    console.log("Extracted Token:", token); // Debugging

    if (!token) {
      return sendResponse(res, 403, null, true, "Token not provided");
    }

    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    console.log("Decoded Token:", decoded); // Debugging

    if (!decoded) {
      return sendResponse(res, 403, null, true, "Invalid token");
    }

    const user = await User.findById(decoded._id).lean();
    if (!user) {
      return sendResponse(res, 403, null, true, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in authorizationUser middleware:", error); // Debugging
    sendResponse(res, 500, null, true, "Something went wrong");
  }
}

export async function authorizationStudent(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.split(" ")[1];
    console.log("token=>", token);
    if (!token) return sendResponse(res, 403, null, true, "Token not provided");
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);   
    if (decoded) {
      const user = await User.findById(decoded._id);    
      if (!user) {
        return sendResponse(res, 403, null, true, "Student not found");
      }
      if(user.role == 'student') {
        req.student = decoded;
        next();
      } else {
        sendResponse(res, 401, null, true, "Unauthorized User");  
      }
    } else {
      sendResponse(res, 400, null, true, "Decoded not available");
    }
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
}

export async function authorizationTrainer(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.split(" ")[1];
    console.log("token=>", token);
    if (!token) return sendResponse(res, 403, null, true, "Token not provided");
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);   
    if (decoded) {
      const user = await User.findById(decoded._id);    
      if (!user) {
        return sendResponse(res, 403, null, true, "Trainer not found");
      }
      if(user.role == 'trainer') {
        req.trainer = decoded;
        next();
      } else {
        sendResponse(res, 401, null, true, "Unauthorized User");  
      }
    } else {
      sendResponse(res, 400, null, true, "Decoded not available");
    }
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
}

export async function authorizationAdmin(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.split(" ")[1];
    console.log("token=>", token);
    if (!token) return sendResponse(res, 403, null, true, "Token not provided");
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);   
    if (decoded) {
      const user = await User.findById(decoded._id);    
      if (!user) {
        return sendResponse(res, 403, null, true, "User not found");
      }
      if(user.role == 'admin') {
        req.admin = decoded;
        next();
      } else {
        sendResponse(res, 401, null, true, "Unauthorized User");  
      }
    } else {
      sendResponse(res, 400, null, true, "Decoded not available");
    }
  } catch (error) {
    sendResponse(res, 500, null, true, error.message);
  }
}