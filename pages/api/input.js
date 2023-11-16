export default function handler(req, res) {
  const { text } = req.query;
  res.status(200).json({ message: text });
}