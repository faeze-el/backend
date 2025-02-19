import express from "express";
import cors from "cors";

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Allow CORS for frontend access

app.get("/", (req, res)=> {
  res.send('faeze service is working');
});

// Proxy API to bypass HTTPS restriction
app.post("/by-pass-api", async (req, res) => {
  try {
    const { url } = req.body;
    console.log("Calling URL:", url);

    if (!url || !url.startsWith("http://")) {
      return res.status(400).json({ error: "Invalid or missing HTTP URL" });
    }

    const fetch = (await import("node-fetch")).default;
    
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Start the server locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
