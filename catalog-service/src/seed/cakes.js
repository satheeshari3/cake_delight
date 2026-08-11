const mongoose = require("mongoose");
require("dotenv").config();

const Cake = require("../models/cake.model");

const cakes = [
  {
    name: "Black Forest Cake",
    description: "Classic chocolate cake with cherries and cream",
    category: "Chocolate",
    price: 550,
    availability: true,
    imageReference: "/images/black-forest.jpg"
  },
  {
    name: "Red Velvet Cake",
    description: "Soft red velvet cake with cream cheese frosting",
    category: "Velvet",
    price: 750,
    availability: true,
    imageReference: "/images/red-velvet.jpg"
  },
  {
    name: "Chocolate Lava Cake",
    description: "Rich chocolate cake with chocolate ganache",
    category: "Chocolate",
    price: 700,
    availability: true,
    imageReference: "/images/chocolate-lava.jpg"
  },
  {
    name: "Chocolate Truffle Cake",
    description: "Rich chocolate cake with chocolate ganache",
    category: "Chocolate",
    price: 650,
    availability: true,
    imageReference: "/images/chocolate-truffle.jpg"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Cake.deleteMany({});

    await Cake.insertMany(cakes);

    console.log(`${cakes.length} cakes inserted successfully`);

    await mongoose.disconnect();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();