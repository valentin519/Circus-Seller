import React from 'react'
import './component.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { Link } from 'react-router-dom';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nextPage : true,
            redirection : false,
            newUser : {
                firstname : '',
                lastname : '',
                adress: '',
                password : '',
                confirmedPassword: '',
                email : ''
            }  
        };
        
        this.handleChangeNewUser = this.handleChangeNewUser.bind(this);
        this.postForm = this.postForm.bind(this);
    }
   
    handleChangeNewUser(event) {
		const propertyName = event.target.name
		const newUser = {...this.state.newUser}
		newUser[propertyName] = event.target.value
		this.setState({ newUser: newUser })
	}
    postForm (e){
        e.preventDefault();
        let newUserData = JSON.stringify ({
            firstname : this.state.newUser.firstname,
            lastname : this.state.newUser.lastname,
            adress : this.state.newUser.adress,
            email : this.state.newUser.email,
            password : this.state.newUser.password
        });
    axios
            .post('http://localhost:8000/register', newUserData , {headers:{"Content-Type" : "application/json"}})
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
                        <input placeholder='Prénom'
                            type="text"
                            id="firstname"
                            name="firstname"
                            onChange={this.handleChangeNewUser}
                            value={this.state.firstname}/>
                        
                        <input placeholder='Nom'
                            type="text"
                            id="lastname"
                            name="lastname"
                            onChange={this.handleChangeNewUser}
                            value={this.state.lastname}/>
                         <input placeholder='Adresse'
                            type="text"
                            id="adress"
                            name="adress"
                            onChange={this.handleChangeNewUser}
                            value={this.state.adress}/>
                        <input placeholder='Email'
                            type="email"
                            id="email"
                            name="email"
                            onChange={this.handleChangeNewUser}
                            value={this.state.email}/>
                        <input placeholder='Mot de passe'
                            type="password"
                            id="password"
                            name="password"
                            onChange={this.handleChangeNewUser}
                            value={this.state.password}/>
                
                            <div className='validButton'>
                                <button  type='submit' onClick= {this.postForm}> S'inscrire</button>
                            </div>
                        </div>
                    </div>
        )
    }
}

export default Register
