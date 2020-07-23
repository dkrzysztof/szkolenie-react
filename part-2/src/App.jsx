import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const handleClick = () => {};

	return (
		<div>
			<div className="App">
				<header className="App-header">
					<button className="mb-3" onClick={handleClick}>
						toggle component
					</button>
					{/* importowac klasowy komponent /*/}
				</header>
			</div>
		</div>
	);
}

export default App;
