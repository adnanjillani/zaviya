const mongoose = require("mongoose");
const Menu = require("./models/menumodel");

// Menu items to import
const menuItems = [
  {
    name: "Spaghetti Carbonara",
    price: 18,
    image: "spagheti.jpg",
    category: "italian",
    description: "Classic Italian pasta with creamy sauce and bacon."
  },
  {
    name: "Margherita Pizza",
    price: 16,
    image: "margherita.jpg",
    category: "italian",
    description: "Traditional pizza with tomatoes, mozzarella, and basil."
  },
  {
    name: "Risotto ai Funghi",
    price: 20,
    image: "risotto.jpg",
    category: "italian",
    description: "Creamy mushroom risotto with parmesan cheese."
  },
  {
    name: "Chicken Biryani",
    price: 15,
    image: "pakistani1.jpg",
    category: "pakistani",
    description: "Aromatic chicken biryani cooked with spices and rice."
  },
  {
    name: "Nihari",
    price: 18,
    image: "pakistani2.jpg",
    category: "pakistani",
    description: "Slow-cooked beef stew, rich in flavor and spices."
  },
  {
    name: "Seekh Kabab",
    price: 14,
    image: "pakistani3.jpg",
    category: "pakistani",
    description: "Spiced minced meat grilled to perfection."
  },
  {
    name: "Dim Sum Platter",
    price: 16,
    image: "chinese1.jpg",
    category: "chinese",
    description: "Variety of steamed dumplings and buns."
  },
  {
    name: "Kung Pao Chicken",
    price: 17,
    image: "chinese2.jpg",
    category: "chinese",
    description: "Spicy stir-fried chicken with peanuts and vegetables."
  },
  {
    name: "Peking Duck",
    price: 35,
    image: "chinese3.jpg",
    category: "chinese",
    description: "Crispy roasted duck served with pancakes and sauce."
  }
];

// Connect to MongoDB and insert items
mongoose.connect("mongodb://127.0.0.1:27017/zaviya", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("MongoDB connected");

    // Delete existing items first
    await Menu.deleteMany({});
    console.log("Old menu items deleted");

    // Insert new items
    const inserted = await Menu.insertMany(menuItems);
    console.log(`Inserted ${inserted.length} menu items`);

    mongoose.disconnect();
  })
  .catch(err => console.log(err));
