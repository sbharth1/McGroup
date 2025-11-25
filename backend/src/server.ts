import app from "./app.ts";
import { connectDB } from "./config/db.config.ts";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

const db = async () => {
  await connectDB();
};
db();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
