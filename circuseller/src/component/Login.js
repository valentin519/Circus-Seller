import React from 'react';
import '../App.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			token: null,
		};
		this.onChange = this.onChange.bind(this);
	}
	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	handleSubmit = event => {
		event.preventDefault();
		const config = {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(this.state),
		};
		axios
			.post('http://localhost:8000/login', {
				email: this.state.email,
				password: this.state.password,
			})
			.then(response => {
				this.props.setToken(response.data.token);
			});
	};

	render() {
		const isConnected = this.props.token !== null;
		if (isConnected) {
			return <Redirect to='/mainthread' />;
		}
		return (
			<div className='conectForm'>
				<div className='form'>
					<p className='titleConnection'>Se connecter</p>
					<input
						placeholder='Tel ou email'
						type='email'
						id='email'
						name='email'
						onChange={this.onChange}
						value={this.state.email}
					/>

					<input
						placeholder='Mot de passe'
						type='password'
						id='password'
						name='password'
						onChange={this.onChange}
						value={this.state.password}
					/>
					<div className='bottomPage'>
						<Link
							className='validationButton'
							type='submit'
							to='/mainthread'
							onClick={this.handleSubmit}
                        >
							Valider
						</Link>
						<p className='forgotPass'>Mot de passe oublié?</p>
						<p className='or'>Ou</p>
						<Link className='loginButton' type='button' to='/register'>
							Créer un compte
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;