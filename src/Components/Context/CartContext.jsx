import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { data } from "react-router-dom";
import Loading from "../Loading/Loading";

export const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [CartDetails, setCartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const headers = {
    token: localStorage.getItem("token"),
  };

  function GetCart() {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then(({ data }) => {
        setCartDetails(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function removeProduct(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then(({ data }) => {
        toast.success("Product Removed");
        setCartDetails(data);
      });
  }

  function cartProductQuantity(productId, count) {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then(({ data }) => {
        setCartDetails(data);
        toast.success("Product Quantity Updated");
      });
  }

  function clearAllProduct() {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then(({ data }) => {
        console.log(data);
        toast.success("All Product Is Clear");
        setCartDetails(data);
      });
  }

  useEffect(() => {
    if (isLoading) return;
    GetCart();
  }, []);

  function addProductTocart(productId) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then(({ data }) => {
        toast.success(data.message, { duration: 4000 });
        setCartDetails(data);
        console.log(data);
        GetCart();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <CartContext.Provider
      value={{
        addProductTocart,
        GetCart,
        removeProduct,
        cartProductQuantity,
        clearAllProduct,
        CartDetails,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
