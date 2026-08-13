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
    name: "Blueberry",
    description: "Rich bluebrry cake with chocolate ganache",
    category: "fruit",
    price: 800,
    availability: true,
    imageReference: "/images/blueberry.jpg"
  }
];

const seedDatabase = async () => {
  try {
    const count = await Cake.countDocuments();

    if (count === 0) {
      await Cake.insertMany(cakes);
      console.log(`${cakes.length} cakes inserted successfully`);
    } else {
      console.log(`Catalog already contains ${count} cakes. Skipping seed.`);
    }
  } catch (error) {
    console.error("Seeding failed:", error.message);
    throw error;
  }
};

module.exports = seedDatabase;