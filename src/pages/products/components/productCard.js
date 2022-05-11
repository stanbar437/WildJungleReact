import React, { useState } from "react";
import ProductItem from "./productItem";
import InfiniteScroll from "react-infinite-scroll-component";

function ProductCard(props) {
  const { products} = props;

  const [scroll, setScroll] = useState({
    items: Array.from(products.filter((v, i) => i <= 6)),
    hasMore: true,
  });

  const fetchMoreData = () => {
    setTimeout(() => {
      setScroll({
        items: scroll.items.concat(
          Array.from(
            scroll.items.length < 105
              ? products.filter((v, i) =>
                  i <= products.length
                    ? scroll.items.length <= i && i <= scroll.items.length + 10
                    : products.length
                )
              : products
          )
        ),
        hasMore: scroll.items.length >= 300 ? false : true,
      });
    }, 300);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={scroll.items.length}
        next={fetchMoreData}
        hasMore={scroll.hasMore}
      >
        {scroll.items.map((products, i) => {
          return <ProductItem key={i} products={products} />;
        })}
      </InfiniteScroll>
    </>
  );
}
export default ProductCard;
