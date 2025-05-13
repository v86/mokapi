export default async function handler(req, res) {
  const { slug, error, delay } = req.query;

  if (delay) {
    await new Promise(r => setTimeout(r, parseInt(delay)));
  }

  if (error) {
    return res.status(parseInt(error)).send(`Mock error ${error}`);
  }

  res.status(200).json({
    endpoint: `/${slug ? slug.join("/") : ""}`,
    method: req.method,
    message: "OK"
  });
}