import React, { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContextProvider";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { oneProduct, getOneProduct, categories, getCategories, editProduct } =
    useProducts();
  const { id } = useParams();
  useEffect(() => {
    getCategories();
    getOneProduct(id);
  }, []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const handleClick = () => {
    const newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("image", image);
    newProduct.append("category", category);
    editProduct(id, newProduct);
  };
  useEffect(() => {
    setTitle(oneProduct.title);
    setDescription(oneProduct.description);
    setPrice(oneProduct.price);
  }, [oneProduct]);
  return (
    <div>
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <input
        type="text"
        placeholder="price"
        onChange={(e) => setPrice(e.target.value)}
        value={price}
      />
      <input
        type="file"
        placeholder="image"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <select onChange={(e) => setCategory(e.target.value)}>
        <option>Choose category</option>
        {categories.map((elem) => (
          <option value={elem.id} key={elem.id}>
            {elem.title}
          </option>
        ))}
      </select>
      <button onClick={handleClick}>Edit Product</button>
    </div>
  );
};

export default EditProduct;
