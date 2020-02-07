import React from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './component.css';
import { Link } from 'react-router-dom';

class Main extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
            product : [],
        };
        this.handleSaveProduct = this.handleSaveProduct.bind(this);     
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
    handleSaveProduct(e) {
		const token = this.props.token
		const axiosConfig = {
        	headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
    		}
    	}
		let newSave = {post_id: e.target.name}
		axios
			.put('http://localhost:8000/productsaves', newSave, axiosConfig)
			.then(res => console.log(res))
			.catch(err => console.log(err))
	}	
     render(){
         return (
            <div>
                <div className ='titleDiv'>   
                    <p className ='titleMain'>Circus Seller</p>
                </div>
                <div className ='panierDiv'>
                    <Link to='/productadd' >Ajouter un Artiste</Link>
                    <p>Mon panier</p>
                </div>
                <div className='cardList'>
                    {this.state.product.map(product => {
                        return <ProductCard productData={product} handleSaveProduct={this.handleSaveProduct} />;
                    })}
                </div>
            </div>
         )}   
             
}

export default Main;