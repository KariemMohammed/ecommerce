import React, { useContext, useEffect, useState } from "react";
import Style from "./ProductsRecent.module.css";
import Loading from "../Loading/Loading";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";
import { CartContext } from "../Context/CartContext";
import { WishListContext } from "../Context/WishlistContext";



export default function ProductsRecent() {
  const { addProductTocart } = useContext(CartContext);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { wishList, addToWishlist, removeFromWishlist } = useContext(WishListContext);


  async function getAllProducts() {
    setIsLoading(true);
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (isLoading) return;
    getAllProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap ">
          {products?.map((product) => (
            <div
              key={product.id}
              className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/4 2xl:w-1/5 3xl:w-1/6  relative p-2"
            >
              <Link
                to={`/ProDuctDetails/${product.id}/${product.category.name}`}
              >
                <div
                  className="product group flex flex-col justify-between h-full overflow-hidden 
                      shadow-md rounded-lg bg-white p-3 transition-all duration-300 
                      hover:shadow-[0_4px_20px_rgba(34,197,94,0.4)] dark:bg-gray-900"
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-md"
                  />

                  <div className="mt-2 flex-1">
                    <h3 className="text-green-700 text-xs font-medium">
                      {product.category.name}
                    </h3>
                    <h2 className="text-gray-800 dark:text-white font-semibold text-sm truncate">
                      {product.title.split(" ", 3).join(" ")}
                    </h2>
                    <div className="flex justify-between items-center pt-2">
                      {product.priceAfterDiscount ? (
                        <div className="">
                          <p className="font-mono line-through text-red-700 text-sm">
                            {product.price} EGP
                          </p>
                          <p className="font-mono text-gray-700 dark:text-white text-sm">
                            {" "}
                            {product.priceAfterDiscount} EGP
                          </p>
                        </div>
                      ) : (
                        <p className="font-mono text-gray-700 text-sm dark:text-white">
                          {product.price} EGP
                        </p>
                      )}

                      <span className="flex items-center gap-1 text-gray-600 text-xs font-semibold">
                        <i className="fa-solid fa-star text-amber-400"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 mb-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addProductTocart(product.id);
                      }}
                      className="cursor-pointer bg-green-700 text-white py-2 rounded-md w-[90%] mx-auto 
             transform translate-y-10 opacity-0 
             transition-all duration-500 
             group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      + Add
                    </button>


                    <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    const isInWishlist = wishList.some((item) => item.id === product.id);
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  }}
>
  <i
    className={`fa-solid fa-heart text-2xl ps-2 cursor-pointer transition-colors duration-300 ${
      wishList.some((item) => item.id === product.id)
        ? "text-red-500"
        : "text-gray-200 hover:text-red-500"
    }`}
  ></i>
</button>
                  </div>
                </div>
              </Link>

              {product.priceAfterDiscount ? (
                <span
                  className="absolute left-9 top-8 bg-red-100 text-red-800
     text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300"
                >
                  Sale
                </span>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
