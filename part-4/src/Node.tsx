import React, { useState } from 'react';
import Parent2 from './components/Parent2';
import Parent1 from './containers/Parent1';
import { NodeStyle } from './styles/styles';

const Node: React.FC<{}> = () => {
	// TODO: utworzyć handler dla przycisku, ktory zostanie przekazany do Parent1.
	// Jego parametrem będzie string, z wartością Input-a

	// TODO: wykorzystać useState który będzie zarządzał zmienną string.
	// Jego wartośc musi zostać przekazana do Parent2, a ustawiona w handlerze.s

	return (
		<>
			<em>Node</em>
			<div style={NodeStyle}>
				<Parent1 nameForChild={'Przykładowy tekst'} />
				<Parent2 onClick={() => {}} />
			</div>
		</>
	);
};

export default Node;
