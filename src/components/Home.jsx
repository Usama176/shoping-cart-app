// import React from 'react';
import { CartState } from '../context/Context';
import Filters from './Filters';
import Product from './Product';

import './styles.css';

const Home = () => {

    const { 
        state: { products },
        filterState: {
            sort,
            byStock,
            byFastDelivery,
            byRating,
            searchQuery,
        },
    } = CartState();

    const transformProducts = () => {
        let sortedProducts = products;

        if(sort) {
            sortedProducts = sortedProducts.sort((a, b) =>
                sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            );
        }

        if(!byStock) {
            sortedProducts = sortedProducts.filter((product) => product.inStock)
        }

        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter((product) => product.fastDelivery);
        }
        
        if (byRating) {
            sortedProducts = sortedProducts.filter(
              (product) => product.ratings >= byRating
            );
          }
      
          if (searchQuery) {
            sortedProducts = sortedProducts.filter((product) =>
              product.name.toLowerCase().includes(searchQuery)
            );
          }

        return sortedProducts;
    };

    return (
        <div className='home'>
            <Filters />
            <div className='productContainer'>
                {transformProducts().map((product) => (
                    <Product product={product} key={product.id} />
                ))}
            </div>
        </div>
    );
};

export default Home;