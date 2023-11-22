const Database = [
  {
    userID: 1,
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

module.exports = Database;


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
