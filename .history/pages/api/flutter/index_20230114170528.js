export default async function handler(req, res) {
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": process.env.MONGODB_DATA_API_KEY,
    },
  };
  const fetchBody = {
    dataSource: process.env.MONGODB_DATA_SOURCE,
    database: "social_butterfly",
    collection: "flutters",
  };
  const baseUrl = `${process.env.MONGODB_DATA_API_URL}/action`;

  try {
    switch (req.method) {
      case "GET":
        const readData = await fetch(`${baseUrl}/find`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
            sort: { postedAt: -1 },
          }),
        });
        const readDataJson = await readData.json();
        res.status(200).json(readDataJson.documents);
        break;
      case "POST":
        const flutter = req.body;

        const postData = await fetch(`${baseUrl}/insertOne`, {
          ...fetchOptions,
          body: JSON.stringify({
            ...fetchBody,
          }),
        });
        const postDataJson = await readData.json();
        res.status(200).json(readDataJson.documents);
        break;

      default:
        res.status(405).end();
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
}
