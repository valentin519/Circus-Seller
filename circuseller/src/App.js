import React , { useState } from 'react';
import Login from './component/Login';
import './App.css';
import Welcome from './component/Welcome';
import { Switch, Route } from 'react-router-dom';
import Main from './component/Main'

function App() {
	const [token, setToken] = useState(null);
  return (
    <div className="App">
      <Switch>
      <Route exact path='/'>
					<Welcome />
				</Route>
				<Route path='/login'>
					<Login token={token} setToken={setToken} />
				</Route>
				<Route path='/main'>
					<Main token={token} />
				</Route>
			</Switch>
    </div>
  );
}

export default App;
