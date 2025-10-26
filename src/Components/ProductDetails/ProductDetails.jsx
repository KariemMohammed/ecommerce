import React, { useEffect, useState } from "react";
import Style from "./ProductDetails.module.css";
import { data, Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { CartContext } from "../Context/CartContext";

export default function ProductDetails() {
  const { addProductTocart } = React.useContext(CartContext);
  let { id, category } = useParams();
  const [ProDuctDetails, setProDuctDetails] = useState(null);
  const [RelatedProudcts, setRelatedProudcts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductDetails() {
    setIsLoading(true);
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProDuctDetails(data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getAllProducts(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        const AllProudcts = data.data;
        const Related = AllProudcts.filter(
          (product) => product.category.name == category
        );
        setRelatedProudcts(Related);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProductDetails();
    getAllProducts(category);
  }, [id, category]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row bg-white dark:bg-gray-900">
          {ProDuctDetails && (
            <>
              <div className="w-1/4 p-5">
                <Slider {...settings}>
                  {ProDuctDetails?.images.map((src) => (
                    <img
                      src={src}
                      alt={ProDuctDetails?.title}
                      className="w-full h-[400px] object-contain"
                    />
                  ))}
                </Slider>
              </div>
              <div className="w-3/4 p-5">
                <h2 className="font-bold text-3xl dark:text-white">{`${ProDuctDetails?.title}`}</h2>
                <p className="text-gray-600 mt-4 me-3 pb-2 font-light dark:text-gray-100">{`${ProDuctDetails?.description}`}</p>
                <span className="text-green-700">{`${ProDuctDetails?.category.name}`}</span>

                <div className="flex justify-between">
                  <div className="mt-1 dark:text-white">{`${ProDuctDetails?.price} EGP`}</div>
                  <div>
                    <i className="fa-solid fa-star text-amber-400"></i>
                    {`${ProDuctDetails?.ratingsAverage}`}
                  </div>
                </div>
                <button
                  onClick={() => {
                    addProductTocart(ProDuctDetails.id);
}}
                  className="w-full cursor-pointer mt-4 bg-green-700 text-white p-2 rounded-xl"
                >
                  +add to cart
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <div className="flex flex-wrap">
        {RelatedProudcts?.map((product) => (
          <div key={product.id} className="w-1/4 p-4 relative">
            <Link to={`/ProDuctDetails/${product.id}/${product.category.name}`}>
              <div
                className="product group flex flex-col justify-between h-full overflow-hidden 
                      shadow-md rounded-lg bg-white p-3 transition-all duration-300 
                      hover:shadow-[0_4px_20px_rgba(34,197,94,0.4)] dark:bg-gray-900"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-[220px] object-cover rounded-md"
                />

                <div className="mt-2 flex-1">
                  <h3 className="text-green-700 text-xs font-medium">
                    {product.category.name}
                  </h3>
                  <h2 className="text-gray-800 font-semibold text-sm truncate dark:text-white">
                    {product.title.split(" ", 3).join(" ")}
                  </h2>
                  <div className="flex justify-between items-center pt-2">
                    {product.priceAfterDiscount ? (
                      <div className="">
                        <p className="font-mono line-through text-red-700  text-sm">
                          {product.price} EGP
                        </p>
                        <p className="font-mono text-gray-700 text-sm dark:text-white">
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
                    className="cursor-pointer bg-green-700 text-white py-2 rounded-md w-[90%] mx-auto 
                       transform translate-y-10 opacity-0 
                       transition-all duration-500 
                       group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    + Add
                  </button>

                  <i className="fa-solid fa-heart text-2xl ps-2 hover:text-red-500 cursor-pointer"></i>
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
    </>
  );
}
