import express from "express";
import { randomBytes } from "crypto";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

type comment = {
	id: string;
	content: string;
};

type commentsByPostId = {
	[key: string]: comment[];
};

const commentsByPostId: commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
	const commendId = randomBytes(4).toString("hex");
	const { content } = req.body;

	const comments = commentsByPostId[req.params.id] || [];

	comments.push({ id: commendId, content });

	commentsByPostId[req.params.id] = comments;

	res.status(201).send(comments);
});

app.listen(4001, () => {
	console.log("listening on port 4001");
});
