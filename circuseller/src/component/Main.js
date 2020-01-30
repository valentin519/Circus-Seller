import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

class Main extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            product : [],
        };     
    }
    componentDidMount() {
		axios
            .get('http://localhost:8000/products')
			.then(response => response.data)
			.then(data => {
				this.setState({
                    product: data
				})
			});
	}
     render(){
         return (
        <div className='cardList'>
        {this.state.product.map(product => {
            return <ProductCard productData={product} />;
        })}
    </div>

         )}   
             
}

export default Main;