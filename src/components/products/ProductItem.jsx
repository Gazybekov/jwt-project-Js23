import React from "react";
import { useProducts } from "../../context/ProductContextProvider";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ elem }) => {
  const { deleteProduct } = useProducts();
  const navigate = useNavigate();
  console.log(elem);
  return (
    <div>
      Title: {elem.title}
      Price: {elem.price}
      Category: {elem.category.title}
      Description:{elem.description}
      <img width={150} src={elem.image} alt="" />
      {elem.is_author ? (
        <>
          <button onClick={() => deleteProduct(elem.id)}>Delete</button>
          <button onClick={() => navigate(`/edit/${elem.id}`)}>Edit</button>
        </>
      ) : null}
    </div>
  );
};

export default ProductItem;
