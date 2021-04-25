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
var posts = {};
app.get("/posts", function (req, res) {
    res.send(posts);
});
app.post("/posts", function (req, res) {
    var id = crypto_1.randomBytes(4).toString("hex");
    var title = req.body.title;
    posts[id] = {
        id: id,
        title: title
    };
    res.status(201).send(posts[id]);
});
app.listen(4000, function () {
    console.log("listening on port 4000");
});
