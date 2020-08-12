import React, { useState } from 'react';
import Parent1 from './components/Parent1';
import Parent2 from './containers/Parent2';
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
				<Parent1 onClick={() => {}} />
				<Parent2 nameForChild={'Przykładowy tekst'} />
			</div>
		</>
	);
};

export default Node;
