import React from 'react';
import { Parent1Style } from '../styles/styles';
import { Input, Button } from 'antd';
interface Parent1Props {
	onClick: (value: string) => void;
}

const Parent1: React.FC<Parent1Props> = () => {
	let text: string = '';

	// TODO: zmienna text powinna przetrzymywać wartość z komponentu Input.
	// Napisać handler dla niego.

	// TODO: przekazać props onClick z komponentu rodzica do komponentu Button.

	return (
		<div>
			<em>Parent1</em>
			<div style={Parent1Style}>
				<Input placeholder="Wpisz tekst" onChange={() => {}} />
				<Button type="primary" onClick={() => {}}>
					Prześlij do komponentu obok
				</Button>
			</div>
		</div>
	);
};

export default Parent1;
