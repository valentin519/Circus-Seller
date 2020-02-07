import React from 'react';


function ProductCard({ productData , handleSaveProduct}) {
	return (
        <div className ='productCard'>
            <p>{productData.title}</p>
            <p>{productData.content}</p>
            <p>{productData.price}</p>
            <img className='avatar' src={productData.pictur} alt = ''/>
            <img className = 'buyIcon' src = 'https://zupimages.net/up/20/05/5z25.png' alt ='' onClick={handleSaveProduct}/>
            
        </div>
    )}



export default ProductCard;