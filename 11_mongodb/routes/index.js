var express = require("express");
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//create :-
router.get("/create", async function (req, res, next) {
  const createdUser = await userModel.create({
    username: "nick001",
    age : 22,
    name: "Nischal Kothari",
  });
  res.send(createdUser)
});

//find all:-
router.get("/allusers", async function (req, res, next) {
  let allUsers = await userModel.find()
  res.send(allUsers)
});

//find one :-
router.get("/oneuser", async function (req, res, next) {
  let oneUser = await userModel.findOne({username : "nick001"})
  res.send(oneUser)
});

//insert multiple:-

router.get("/create", async function (req, res, next) {
  try {
    const users = await userModel.create([
      {
        username: "nick001",
        age: 22,
        name: "Nischal Kothari",
      },
      {
        username: "sara_dev",
        age: 25,
        name: "Sara Mehta",
      },
      {
        username: "tech_guru",
        age: 29,
        name: "Rahul Sharma",
      },
      {
        username: "mona123",
        age: 20,
        name: "Mona Patel",
      },
      {
        username: "the_coder",
        age: 27,
        name: "Arjun Verma",
      },
      {
        username: "anuj98",
        age: 23,
        name: "Anuj Singh",
      },
    ]);

    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//delete Many :-
router.get("/manyuser", async function (req, res, next) {
  let deletedUser = await userModel.deleteMany({
    username: {$in: ["tech_guru","mona123"]}
  })
  res.send(deletedUser)
});

module.exports = router;
