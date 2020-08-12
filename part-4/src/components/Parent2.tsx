import React from 'react';
import { Parent2Style } from '../styles/styles';
import { Input, Button } from 'antd';
interface Parent2Props {
	onClick: (value: string) => void;
}

const Parent2: React.FC<Parent2Props> = () => {
	let text: string = '';

	// TODO: zmienna text powinna przetrzymywać wartość z komponentu Input.
	// Napisać handler dla niego.

	// TODO: przekazać props onClick z komponentu rodzica do komponentu Button.

	return (
		<div>
			<em>Parent2</em>
			<div style={Parent2Style}>
				<Input placeholder="Wpisz tekst" onChange={() => {}} />
				<Button type="primary" onClick={() => {}}>
					Prześlij do komponentu obok
				</Button>
			</div>
		</div>
	);
};

export default Parent2;
