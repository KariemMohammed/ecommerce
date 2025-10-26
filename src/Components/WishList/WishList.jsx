import React, { useContext } from "react";
import { WishListContext } from "../Context/WishlistContext";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function WishList() {
  const { wishList, removeFromWishlist, isLoading } =
    useContext(WishListContext);

  if (isLoading) return <Loading/>;

  if (wishList.length === 0)
    return <p className="text-center mt-10 text-gray-600">You Wish List Is Empyt</p>;

  return (
    <div className="p-4">
      {wishList.map((product) => (
        <div
          key={product.id}
          className="flex flex-wrap items-center border-b my-3 p-3 rounded-lg shadow-sm hover:shadow-md transition"
        >
          
          <div className="w-full md:w-2/12">
            <img
              src={product.imageCover}
              alt={product.title}
              className="w-full rounded-md"
            />
          </div>

          
          <div className="w-full md:w-10/12 flex flex-col md:flex-row justify-between items-start md:items-center mt-3 md:mt-0 p-5">
            <div>
              <Link
                to={`/ProductDetails/${product.id}/${product.category?.name}`}
              >
                <h5 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {product.title}
                </h5>
              </Link>
              <h6 className="text-green-600 font-medium mt-1">
                {product.price} EGP
              </h6>

              <button
                onClick={() => removeFromWishlist(product.id)}
                className="text-red-600 cursor-pointer text-sm flex items-center gap-1 mt-1 hover:underline"
              >
                <i className="fa fa-trash"></i> Remove
              </button>
            </div>

            <div className="mt-3 md:mt-0">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm cursor-pointer">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
