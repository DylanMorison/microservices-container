import express from "express";
import { randomBytes } from "crypto";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

type posts = {
	[key: string]: {
		id: string;
		title: string;
	};
};

const posts: posts = {};

app.get("/posts", (req, res) => {
	res.send(posts);
});

app.post("/posts", (req, res) => {
	const id = randomBytes(4).toString("hex");
	const { title } = req.body;

	posts[id] = {
		id,
		title
	};

	res.status(201).send(posts[id]);
});

app.listen(4000, () => {
	console.log("listening on port 4000");
});
