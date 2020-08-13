import React, { useState } from 'react';
import Parent2 from './components/Parent2';
import Parent1 from './containers/Parent1';
import { NodeStyle } from './styles/styles';

const Node: React.FC<{}> = () => {
	// TODO: utworzyć handler dla przycisku, ktory zostanie przekazany do Parent1.
	// Jego parametrem będzie string, z wartością Input-a
	const [text, setText] = useState<string>('initialState');

	// TODO: wykorzystać useState który będzie zarządzał zmienną string.
	// Jego wartośc musi zostać przekazana do Parent2, a ustawiona w handlerze.s
	const onClick = (newText: string) => {
		setText(newText);
	};

	return (
		<>
			<em>Node</em>
			<div style={NodeStyle}>
				<Parent1 nameForChild={text} />
				<Parent2 onClick={onClick} />
			</div>
		</>
	);
};

export default Node;
