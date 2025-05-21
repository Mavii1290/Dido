import React from "react";
import CategoryMenu from "./categoryMenu";
import { Category, Subcategory } from "../../../types";

interface Props {
  data: Category[];
  onSelect: (sub: Subcategory) => void;
}

const ShopCategory: React.FC<Props> = ({ data, onSelect }) => {
  return (
    <div className="shop-category">
      <CategoryMenu data={data} onSelect={onSelect} />
    </div>
  );
};

export default ShopCategory;
