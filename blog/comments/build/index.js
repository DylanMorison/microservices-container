"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var crypto_1 = require("crypto");
var app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
var commentsByPostId = {};
app.get("/posts/:id/comments", function (req, res) {
    res.send(commentsByPostId[req.params.id] || []);
});
app.post("/posts/:id/comments", function (req, res) {
    var commendId = crypto_1.randomBytes(4).toString("hex");
    var content = req.body.content;
    var comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commendId, content: content });
    commentsByPostId[req.params.id] = comments;
    res.status(201).send(comments);
});
app.listen(4001, function () {
    console.log("listening on port 4001");
});
