export const getUserEmailFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("No token found.");

    try {
        const [header, payload] = token.split('.');
        if (!payload) throw new Error("Invalid token format: Missing payload.");

        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const decodedPayload = JSON.parse(window.atob(base64));

        if (decodedPayload && decodedPayload.sub) {
            return decodedPayload.sub; // Ensure this is the correct field for email
        } else {
            throw new Error("User email not found in token.");
        }
    } catch (err) {
        throw new Error("Failed to decode token.");
    }
};
