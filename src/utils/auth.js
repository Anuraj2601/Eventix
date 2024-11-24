import jwt_decode from "jwt-decode";

export const getEmailFromToken = (token) => {
  try {
    const decoded = jwt_decode(token);
    return decoded.email; 
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
