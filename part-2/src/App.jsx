import React, { useState, useEffect } from 'react';
import './App.css';
import { Button } from 'antd';
import List from './List';

function App(props) {
	const [state, setState] = useState({
		isToggled: true,
		counter: 0
	});

	const handleClick = () => {
		setState((ps) => {
			return {
				...ps,
				isToggled: !ps.isToggled
			};
		});
	};

	return (
		<div>
			<div className="App">
				<header className="App-header">
					<p>{state.isToggled.toString()}</p>
					{/* ten state zostaje zmieniony*/}
					{state.counter} {/* ten state pozostaje nie zmieniony*/}
					<Button className="mb-3" onClick={handleClick}>
						toggle component
					</Button>
					{/* importowac klasowy komponent /*/}
					{state.isToggled && <List />}
				</header>
			</div>
		</div>
	);
}

export default App;
