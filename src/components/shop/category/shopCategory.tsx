import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import CategoryMenu from "./categoryMenu";
import { Category, Subcategory } from "../../../types";

interface Props {
  data: Category[];
  onSelect: (sub: Subcategory) => void;
  selectedSubcategorySlug?: string;
}

const ShopCategory: React.FC<Props> = ({ data, onSelect, selectedSubcategorySlug }) => {
  const router = useRouter();
  const subcategorySlug = selectedSubcategorySlug || (router.query.subcategorySlug as string);
  const [isOpen, setIsOpen] = useState(false);

  // Optional: Close drawer on Escape key press
  const handleEsc = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setIsOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  return (
    <div className="shop-category relative">

      <div
        className={`fixed inset-0 z-50 transition duration-300 ease-in-out ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isOpen ? "opacity-40" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />


          <div className="overflow-y-auto h-full">
            <CategoryMenu
              data={data}
              onSelect={(sub) => {
                setIsOpen(false); // Close drawer
                onSelect(sub);    // Navigate
              }}
              selectedSubcategorySlug={subcategorySlug}
            />
          </div>
        </div>
      </div>

  );
};

export default ShopCategory;

