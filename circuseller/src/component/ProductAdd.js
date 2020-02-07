import React from 'react'
import './component.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';

class ProductAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            newProduct : {
                title : '',
                content : '',
                price: '',
                pictur : ''
            }  
        };
        
        this.handleChangeNewProduct = this.handleChangeNewProduct.bind(this);
        this.postForm = this.postForm.bind(this);
    }
   
    handleChangeNewProduct(event) {
		const propertyName = event.target.title
		const newProduct = {...this.state.newProduct}
		newProduct[propertyName] = event.target.value
		this.setState({ newProduct: newProduct })
	}
    postForm (e){
        e.preventDefault();
        let newProductData = JSON.stringify ({
            title : this.state.newProduct.title,
            content : this.state.newProduct.content,
            price : this.state.newProduct.price,
            pictur : this.state.newProduct.pictur
        });
    axios
            .post('http://localhost:8000/registerproduct', newProductData , {headers:{"Content-Type" : "application/json"}})
            .then (() => this.setState ({redirection : true}))
			.catch(err => console.log(err))
    }
    
    render(){
        const {redirection} = this.state;
        if (redirection){
            return <Redirect to= '/login'/>;
        }
        return(
            <div className = 'loginFormu' > 
            <div className ='divTitleWelcome'>
                <p className = 'titleWelcome'>Welcome</p>
                <p className = 'titleWelcome'>To</p>
                <p className = 'titleWelcome'>Circus Seller</p>
            </div>              
                    <form onSubmit = {this.postForm}/>
                    <div className="form-data">   
                        <input placeholder='Nom'
                            type="text"
                            id="title"
                            name="title"
                            onChange={this.handleChangeProduct}
                            value={this.state.title}/>
                        
                        <input placeholder='content'
                            type="text"
                            id="content"
                            name="content"
                            onChange={this.handleChangeNewProduct}
                            value={this.state.content}/>
                         <input placeholder='price'
                            type="int"
                            id="price"
                            name="price"
                            onChange={this.handleChangeNewProduct}
                            value={this.state.price}/>
                        <input placeholder='Lien de la photo'
                            type="text"
                            id="pictur"
                            name="pictur"
                            onChange={this.handleChangeNewProduct}
                            value={this.state.pictur}/>
                            <div className='validButton'>
                                <button  type='submit' onClick= {this.postForm}> Ajouter à la boutique</button>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default ProductAdd;
