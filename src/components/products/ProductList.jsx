import React, { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContextProvider";
import ProductItem from "./ProductItem";
import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const ProductList = () => {
  const { products, getProducts, pages } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const getPagesCount = () => {
    const pageCountArr = [];
    for (let i = 1; i <= pages; i++) {
      pageCountArr.push(i);
    }
    return pageCountArr;
  };
  if (currentPage < 1) setCurrentPage(1);
  if (currentPage > pages) setCurrentPage(pages);
  useEffect(() => {
    getProducts();
  }, [searchParams]);
  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage]);
  return (
    <div>
      <h1>Product List</h1>
      {products.map((elem) => (
        <ProductItem key={elem.id} elem={elem} />
      ))}
      <Pagination>
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
        {getPagesCount().map((elem) =>
          elem === currentPage ? (
            <Pagination.Item active key={elem}>
              {elem}
            </Pagination.Item>
          ) : (
            <Pagination.Item onClick={() => setCurrentPage(elem)} key={elem}>
              {elem}
            </Pagination.Item>
          )
        )}
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
      </Pagination>
    </div>
  );
};

export default ProductList;
