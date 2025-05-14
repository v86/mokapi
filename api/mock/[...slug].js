// api/mock/[...slug].js

const mockResponses = {
  "GET /order 404": {
    error: "User not found",
    code: "USER_NOT_FOUND"
  },

  "POST /order 403": {
    error: "Access denied",
    code: "ACCESS_DENIED"
  }
};

export default function handler(req, res) {
  const { slug } = req.query;
  const { error, delay } = req.query;

  const path = `/${Array.isArray(slug) ? slug.join("/") : ""}`;
  const method = req.method.toUpperCase();
  const statusCode = error ? parseInt(error, 10) : 200;

  // Logging
  console.log(`[${new Date().toISOString()}] ${method} ${path} | status: ${statusCode} | delay: ${delay || 0}ms`);

  const key = `${method} ${path} ${statusCode}`;
  const mockBody = mockResponses[key] || { message: delay ? "Delayed mock response" : "Mock response" };

  const sendResponse = () => {
    res.status(statusCode).json(mockBody);
  };

  if (delay) {
    const ms = parseInt(delay, 10);
    if (!isNaN(ms)) {
      setTimeout(sendResponse, ms);
      return;
    }
  }

  sendResponse();
}
