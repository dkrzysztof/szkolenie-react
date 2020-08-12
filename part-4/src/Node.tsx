import React, { useState } from 'react';
import Parent1 from './components/Parent1';
import Parent2 from './containers/Parent2';
import { NodeStyle } from './styles/styles';

const Node: React.FC<{}> = () => {
	const [text, setText] = useState<string>('');
	const handleButtonClick = (value: string) => {
		setText(value);
	};

	return (
		<>
			<em>Node</em>
			<div style={NodeStyle}>
				<Parent1 onClick={handleButtonClick} />
				<Parent2 nameForChild={text} />
			</div>
		</>
	);
};

export default Node;
