import React, { useState } from "react";
import shop_data from '../../data/shop_data';

const CategoryMenu = ({ data, onSelect }) => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (slug) => {
    setOpenCategory(openCategory === slug ? null : slug);
  };

  return (
    <section className="shop-category">
      <h2 className="text-lg font-semibold text-green-600 mb-4">Category</h2>
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md p-4">
        {shop_data.map((category) => {
          const isOpen = openCategory === category.slug;
          return (
            <div key={category.slug} className="mb-2">
              <div className="flex justify-between items-center">
                <button
                  className="flex-grow text-left font-semibold text-lg p-2 bg-gray-100 rounded hover:bg-gray-200"
                  onClick={() => toggleCategory(category.slug)}
                >
                  {category.category}
                </button>
                <span className=" text-gray-600 text-xl categories">
                  {isOpen ? "−" : "+"}
                </span>
              </div>
              {isOpen && (
                <ul className="mt-2 text-sm ">
                  {category.subcategories.map((sub) => (
                    <li key={sub.slug} className="mb-1 categoryOpen">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => onSelect(sub)}
                      >
                        {sub.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryMenu;
