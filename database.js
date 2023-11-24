const database = [
  {
    userID: 1,
    name: "Cindy",
    email: "cindy@gmail.com",
    password: "cindy123",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
    ],
  },
];


// Add userModel to the database
const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.userID === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { database, userModel };


/*  original
let Database = {
  users: {
    id: 1,
    name: "Cindy",
    email: "cindy@gmail.com",
    password: "cindy123!",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
    ],
  },
};

module.exports = Database;
*/
