import React from 'react';


function ProductCard({ productData}) {
	return (
        <div>
            <p>{productData.title}</p>
            <p>{productData.content}</p>
            <p>{productData.price}</p>
            <img src={productData.pictur} alt = ''/>
            
        </div>
    )}



export default ProductCard;