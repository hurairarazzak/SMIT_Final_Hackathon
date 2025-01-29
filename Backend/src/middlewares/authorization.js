import sendResponse from "../helpers/sendResponse.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.model.js";

export async function authorizationUser(req, res, next) {
  try {
    const bearerToken = req?.headers?.authorization;
    const token = bearerToken?.split(" ")[1]; // Extract token from Authorization header
    console.log("Token received:", token); // Log the token for debugging
    
    if (!token) return sendResponse(res, 403, null, true, "Token not provided");

    // Decode the token using the secret from .env
    const decoded = jwt.verify(token, process.env.AUTH_SECRET); 
    if (decoded) {
      // Find the user based on the decoded token
      const user = await User.findById(decoded._id).lean(); 
      if (!user) {
        return sendResponse(res, 403, null, true, "User not found");
      }

      console.log("Decoded user:", decoded); // Log the decoded user data

      // Attach the decoded user data to the request object for further use
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
    } else {
      return sendResponse(res, 403, null, true, "Token is invalid");
    }
  } catch (error) {
    console.error("Error in authorizationUser:", error.message);
    sendResponse(res, 500, null, true, "Internal server error");
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


