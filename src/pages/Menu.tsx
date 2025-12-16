import { useState, useEffect } from "react";
import axios from "axios";

// Import local images from assets
import spaghetti from "../assets/spaghetti.jpg";
import pakistani1 from "../assets/pakistani1.jpg";
import chinese1 from "../assets/chinese1.jpg";
import nihari from "../assets/nihari.jpg";
import seekhkabab from "../assets/seekhkabab.jpg";
import pizza from "../assets/pizza.jpg";

interface MenuItem {
  _id?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
}

// Map backend image names to local imports
const imageMap: Record<string, string> = {
  "spaghetti.jpg": spaghetti,
  "nihari.jpg": nihari,
  "seekhkabab.jpg": seekhkabab,
  "pizza.jpg": pizza,
  "pakistani1.jpg": pakistani1,
  "chinese1.jpg": chinese1,
  // add rest of your asset mappings here
};

const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    axios.get("http://localhost:5000/menu").then((res) => {
      const mappedItems = res.data.map((item: MenuItem) => ({
        ...item,
        image: imageMap[item.image] || item.image,
      }));
      setItems(mappedItems);

      const uniqueCats = Array.from(new Set(mappedItems.map((i) => i.category))) as string[];
      setCategories(uniqueCats);
      setSelectedCategory(uniqueCats[0]);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const firstItem = items.find((i) => i.category === selectedCategory);
      if (firstItem) setSelectedItem(firstItem);
    }
  }, [selectedCategory, items]);

  const handleItemClick = (item: MenuItem) => setSelectedItem(item);

  return (
    <div className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg text-gray-600">
            Explore our diverse culinary offerings from around the world
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors duration-300 ${
                selectedCategory === cat
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300 text-gray-600 hover:text-blue-500"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {items
              .filter((item) => item.category === selectedCategory)
              .map((item) => (
                <div
                  key={item._id || item.name}
                  onClick={() => handleItemClick(item)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedItem?._id === item._id ? "border-blue-500 shadow-lg" : "border-gray-300"
                  }`}
                >
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{item.description || "Delicious dish from our menu."}</p>
                  <span className="font-bold text-gray-800">${item.price}</span>
                </div>
              ))}
          </div>

          <div className="hidden md:flex justify-center items-center">
            {selectedItem && (
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-opacity duration-500"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
