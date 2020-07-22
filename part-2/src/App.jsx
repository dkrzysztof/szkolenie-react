import React from 'react';
import './App.css';

import Timer from './Timer';

function App(props) {
	const buttonOnClick = () => {
		console.log('I was Clicked');
	};

	return (
		<div>
			<div className="App">
				<header className="App-header">
					Hello {props.name}
					<Timer />
				</header>
			</div>
		</div>
	);
}

export default App;
