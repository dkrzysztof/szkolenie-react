import React, { useState } from 'react';
import './App.css';

import Timer from './Timer';

function App(props) {
	const [state, setstate] = useState(true);

	const buttonOnClick = () => {
		setstate((ps) => !ps);
	};

	return (
		<div>
			<div className="App">
				<header className="App-header">
					Hello {props.name}
					<button onClick={buttonOnClick}>ohh</button>
					{state ? <Timer /> : null}
				</header>
			</div>
		</div>
	);
}

export default App;
