import express from "express";
import "dotenv/config";
import routes from "./src/routes/index.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
routes(app);

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
