import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    token: localStorage.getItem("token"),
  };

  // 🟢 Get All Wishlist Products
  function getWishlist() {
    setIsLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then(({ data }) => {
        setWishList(data.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // ❤️ Add to Wishlist
  function addToWishlist(productId) {
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      )
      .then(({ data }) => {
        toast.success(data.message || "Added to Wishlist");
        getWishlist();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Error adding product");
      });
  }

  // 💔 Remove from Wishlist
  function removeFromWishlist(productId) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then(({ data }) => {
        toast.success("Removed from Wishlist");
        setWishList(data.data);
        getWishlist();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 🔄 Load on mount
  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        wishList,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        isLoading,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
