import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { API } from "../helpers/const ";
import { useNavigate } from "react-router-dom";
export const productContext = createContext();
export const useProducts = () => useContext(productContext);
const INIT_STATE = {
  categories: [],
  products: [],
  oneProduct: {},
  pages: 13,
};
const ProductContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "GET_CATEGORIES":
        return { ...state, categories: action.payload };
      case "GET_PRODUCTS":
        return { ...state, products: action.payload };
      case "GET_ONE_PRODUCT":
        return { ...state, oneProduct: action.payload };
    }
  };
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  //! Config
  const getConfig = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const Authorization = `Bearer ${tokens.access.access}`;
    const config = {
      headers: { Authorization },
    };
    return config;
  };
  //! getCategory
  const getCategories = async () => {
    const { data } = await axios(`${API}/category/list/`, getConfig());
    dispatch({
      type: "GET_CATEGORIES",
      payload: data.results,
    });
  };
  //! addProduct
  const addProduct = async (product) => {
    try {
      await axios.post(`${API}/products/`, product, getConfig());
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  //! getProducts
  const getProducts = async () => {
    const { data } = await axios(
      `${API}/products/${window.location.search}`,
      getConfig()
    );
    dispatch({
      type: "GET_PRODUCTS",
      payload: data.results,
    });
  };
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/products/${id}/`, getConfig());
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  //! getOneProduct
  const getOneProduct = async (id) => {
    try {
      const { data } = await axios(`${API}/products/${id}/`, getConfig());
      dispatch({
        type: "GET_ONE_PRODUCT",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const editProduct = async (id, newProduct) => {
    try {
      await axios.patch(`${API}/products/${id}/`, newProduct, getConfig());
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  const values = {
    getCategories,
    categories: state.categories,
    addProduct,
    getProducts,
    products: state.products,
    deleteProduct,
    pages: state.pages,
    getOneProduct,
    oneProduct: state.oneProduct,
    editProduct,
  };
  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductContextProvider;
