import express from "express";
import schoolRouter from "./router/schoolRouter";
import "dotenv/config";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Server is up and running 🔥");
});

app.use("/", schoolRouter);

app.listen(8080, () => {
	console.log("Example app listening on port 8080!");
});
