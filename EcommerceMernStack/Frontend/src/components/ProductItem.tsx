import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

interface ProductItemProps {
  id: string;
  image: string[];
  name: string;
  price: number;
}
const ProductItem = ({ id, image, name, price }: ProductItemProps) => {
  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    throw new Error(
      "ShopContext is undefined. Make sure you're inside the provider."
    );
  }

  const { currency } = shopContext;
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
