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
  cindy: {
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