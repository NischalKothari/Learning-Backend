var express = require("express");
var router = express.Router();

const userModel = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/create-multiple", async function (req, res) {
  // 1. Define the array of data you want to insert
  const usersToCreate = [
    // 1. Complete Profile (All fields explicitly set)
    {
      username: "alpha_tester",
      nickname: "Al",
      description:
        "First test entry, complete data set with a recent creation date.",
      categories: ["Test", "Data", "Full"],
      dateCreated: "2025-09-27T10:00:00.000Z",
    },
    // 2. Minimal Profile (No Nickname/Categories) - Using schema defaults for nulls and empty arrays
    // NOTE: If testing defaults, you'd usually omit 'nickname' and 'categories'.
    // Here, we set them to explicit values that would trigger the same result.
    {
      username: "beta_user_minimal",
      nickname: null, // Explicitly set to null
      description: "Minimal profile for testing defaults. Older date.",
      categories: [], // Explicitly set to empty array
      dateCreated: "2024-01-01T00:00:00.000Z",
    },
    // 3. Long Description
    {
      username: "verbose_writer",
      nickname: "Vicky",
      description:
        "This is a very long description intended to test any potential character limits in the database or UI display. It goes on and on, detailing the user's passion for backend systems and asynchronous operations, covering hundreds of characters.",
      categories: ["Backend", "Scale", "Long Text", "Coding"],
      dateCreated: "2025-09-26T15:30:00.000Z",
    },
    // 4. Empty Categories Array (Explicitly set to empty)
    {
      username: "cat_less_explicit",
      nickname: "NoCat",
      description: "User with explicitly empty categories for testing.",
      categories: [],
      dateCreated: "2025-08-01T12:00:00.000Z",
    },
    // 5. Null Nickname (Explicitly set to null)
    {
      username: "noname_prof",
      nickname: null, // Explicitly set to null
      description: "User profile with an explicit null nickname value.",
      categories: ["Null Test"],
      dateCreated: "2025-09-27T08:00:00.000Z",
    },
    // 6. Many Categories
    {
      username: "hyper_focus",
      nickname: "Hyper",
      description: "Profile with many interests to test array capacity.",
      categories: [
        "Art",
        "Music",
        "Science",
        "History",
        "Coding",
        "Cooking",
        "Fitness",
        "Reading",
        "Philosophy",
        "Games",
      ],
      dateCreated: "2025-07-05T20:45:00.000Z",
    },
    // 7. Different Date Format/Past Date (Manual override)
    {
      username: "past_entry_manual",
      nickname: "TimeTraveler",
      description:
        "Entry with a manually set past date to test date overriding the schema default.",
      categories: ["Historical"],
      dateCreated: "2020-10-15T09:10:30.000Z", // Date far in the past
    },
    // 8. Numeric/Mixed Categories (Testing flexibility of Array type)
    {
      username: "version_mgr",
      nickname: "VManager",
      description:
        "User who lists versions as categories, testing mixed types in the array.",
      categories: ["Project Alpha", 1.0, 2.0, "Beta"],
      dateCreated: "2025-09-27T11:00:00.000Z",
    },
    // 9. Unicode/Special Chars
    {
      username: "unicode_user_⭐",
      nickname: "Łukasz",
      description: "Testing special characters like é, ñ, and emojis. 💯",
      categories: ["Special Chars", "International"],
      dateCreated: "2025-09-27T12:00:00.000Z",
    },
    // 10. Shortest Possible Values (Testing minimum length)
    {
      username: "a",
      nickname: "b",
      description: "c",
      categories: ["d"],
      dateCreated: "2025-09-27T13:00:00.000Z",
    },
  ];

  try {
    // 2. Use insertMany() and await the result
    const createdUsers = await userModel.insertMany(usersToCreate);

    // 3. Send a success response
    res.status(201).json({
      message: `${createdUsers.length} users created successfully!`,
      data: createdUsers,
    });

    console.log("success");
  } catch (error) {
    // Handle any potential errors during insertion (e.g., validation failure)
    console.error("Error creating multiple users:", error);
    res.status(500).json({
      message: "Failed to create users.",
      error: error.message,
    });
  }
});

//reset

// Assuming 'userModel' is your Mongoose Model
router.get("/drop-collection", async function (req, res) {
  try {
    // Access the underlying MongoDB Collection object and call 'drop()'
    await userModel.collection.drop();

    res.json({
      message: "Successfully dropped the entire collection (thorough clean).",
    });
  } catch (error) {
    // Handle cases where the collection might not exist (code 26)
    if (error.code === 26) {
      return res.json({
        message: "Collection was already clean (did not exist).",
      });
    }
    console.error("Error dropping collection:", error);
    res.status(500).json({ message: "Failed to drop collection." });
  }
});

//check

router.get("/users", async function (req, res) {
  try {
    // 1. Use Model.find({}) to get all documents.
    const allUsers = await userModel.find({});

    // 2. Respond with the data in JSON format.
    // This is the simplest way to view the data in a browser or API tool.
    res.status(200).json({
      message: "Successfully retrieved all users.",
      count: allUsers.length,
      data: allUsers,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Failed to retrieve users.",
      error: error.message,
    });
  }
});

//Case Insensitive Search

router.get("/find-case-insens", async (req, res) => {
  var regex = new RegExp("^HyPer", "i");
  var regex2 = new RegExp("^Timetraveler$", "i");
  let user = await userModel.find({ username: regex });
  let user2 = await userModel.find({ nickname: regex2 });
  let datas = [user, user2];
  res.send("check log");
  console.log(datas);
});

// Search from array fields

router.get("/find-array", async (req, res) => {
  let user = await userModel.find({
    categories: { $all: [new RegExp("^coding$", "i"), "Cooking"] },
  });
  res.send(user);
});

// Search in a specific date range in mongoose

router.get("/find-date", async (req, res) => {
  let user = await userModel.find({
    dateCreated: { $gt: "2025-09-15", $lte: "2025-09-27" },
  });
  res.status(200).json({
    message: "Successfully retrieved all users.",
    count: user.length,
    data: user,
  });
});

// Filter out on basis of field length

router.get("/find-length", async function (req, res) {
  try {
    let user = await userModel.find({
      $expr: {
        $and: [
          //Ensure that value is not null and a string
          { $eq : [{$type : "$nickname"}, "string"] },
          //Length Boundary
          { $gte: [{ $strLenCP: "$nickname" }, 0] },
          { $lte: [{ $strLenCP: "$nickname" }, 3] },
        ],
      },
    });
    res.status(200).json({
      message: "Successfully retrieved all users.",
      count: user.length,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Failed to retrieve users.",
      error: error.message,
    });
  }
});

module.exports = router;
