import React, { useState, useEffect } from 'react';
import './App.css';

import Timer from './Timer';

function App() {
	const [state, setstate] = useState(false);

	useEffect(() => {
		console.log('I was executed');
		return () => {
			console.log('I was unmounted');
		};
	}, []);

	return (
		<div>
			<div className="App">
				<header className="App-header">
					{state.toString()}
					<button className="mb-3" onClick={() => {}}>
						toggle component
					</button>
					{state ? <Timer /> : null}
				</header>
			</div>
		</div>
	);
}

export default App;
