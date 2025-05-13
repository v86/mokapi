export default function handler(req, res) {
  const { error, delay } = req.query;

  if (delay) {
    const ms = parseInt(delay, 10);
    if (!isNaN(ms)) {
      setTimeout(() => {
        res.status(error ? parseInt(error, 10) : 200).json({
          message: 'Delayed mock response'
        });
      }, ms);
      return;
    }
  }

  res.status(error ? parseInt(error, 10) : 200).json({
    message: 'Mock response'
  });
}
