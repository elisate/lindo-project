export const vendor = (req, res, next) => {
  const user = req.user; // Access the user from the request

  if (!user || user.role !== "vendor") {
    return res
      .status(403)
      .json({ message: "Access denied. Contact admin please!" });
  }

  next();
};
