export const errorHandle = (error, req, res, next) => {
  if (typeof error === "string") {
    return res.status(400).json({ code: 1000, message: error, cause: "Client error" });
  } else if (error instanceof Error) {
    return res.status(500).json({ code: 2000, message: error.message, cause: "Server error" });
  } else if (error.name === "CustomError") {
    return res.status(error.statusCode).json({ code: error.code, message: error.message, cause: error.cause });
  }

  return res.status(500).json({
    code: 2000,
    message: "Internal Server Error",
    cause: "Server error"
  });
};

export const notFoundHandle = (req, res, next) => {
  return res.status(404).json({
    code: 1000,
    message: "Page Not Found",
    cause: "The requested page does not exist or has been removed.",
  });
};
