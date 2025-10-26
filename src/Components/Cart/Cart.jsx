import React, { useContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../Context/CartContext";
import Loading from "../Loading/Loading";
export default function Cart() {
  
  const { CartDetails, removeProduct, cartProductQuantity, clearAllProduct , isLoading } =
    useContext(CartContext);
  useEffect(() => {
    
  }, []);

  return (
    <>
     {isLoading ? <Loading/> : <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-screen *:w-full">
        <table className="w-full hidden md:table  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {CartDetails?.data?.products?.map((product) => (
              <tr
                key={product.product._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="iPhone 12"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title.split(" ", 3).join(" ")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        cartProductQuantity(
                          product.product._id,
                          product.count - 1
                        )
                      }
                      className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div className="ms-3">
                      <input
                        type="number"
                        id="first_product"
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        readOnly
                        value={product.count}
                        required
                      />
                    </div>
                    <button
                      onClick={() =>
                        cartProductQuantity(
                          product.product._id,
                          product.count + 1
                        )
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {`${product.price} EGP`}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeProduct(product.product._id)}
                    className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="grid gap-4 md:hidden">
          {CartDetails?.data?.products?.map((product) => (
            <div
              key={product.product._id}
              className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <div className="flex flex-col  gap-4">
                <img
                  src={product.product.imageCover}
                  className="w-[100%] h-[50%]] object-cover rounded"
                  alt={product.product.title}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.product.title.split(" ", 3).join(" ")}
                  </h3>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {`${product.price} EGP`}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() =>
                    cartProductQuantity(product.product._id, product.count - 1)
                  }
                  className="px-2 py-1 text-gray-500 bg-white border border-gray-300 rounded-full dark:bg-gray-700 dark:text-gray-300"
                >
                  -
                </button>

                <input
                  type="number"
                  readOnly
                  value={product.count}
                  className="w-14 text-center rounded-md bg-gray-50 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />

                <button
                  onClick={() =>
                    cartProductQuantity(product.product._id, product.count + 1)
                  }
                  className="px-2 py-1 text-gray-500 bg-white border border-gray-300 rounded-full dark:bg-gray-700 dark:text-gray-300"
                >
                  +
                </button>
                <div className="flex justify-end w-full">
                  <button
                    onClick={() => removeProduct(product.product._id)}
                    className=" w-[95%]  text-red-600 border-1 rounded-full dark:text-red-400 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {" "}
          <button
            onClick={() => {
              clearAllProduct();
            }}
            className="cursor-pointer mt-4 bg-green-700 text-white p-2 rounded-xl"
          >
            Clear All Product
          </button>
        </div>
      </div>}
    </>
  );
}
