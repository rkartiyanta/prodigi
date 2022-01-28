export const validateAdmin = (req) => {
    return req.get("User-Type").toLowerCase() != "admin"
}