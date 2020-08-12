import React, { useState } from 'react';
import { Button, Form, Input, Card } from 'antd';
import { Store } from 'antd/lib/form/interface';

interface ListElement {
	key: number;
	text: string;
}

let key = 0;

const List: React.FC<{}> = () => {
	const [list, setList] = useState<ListElement[]>([]);

	const handleSubmit = (values: Store) => {
		setList((ps) => {
			return [...ps, { key: key, text: values.text }];
		});
		key++;
	};

	//Utworzyć state ktory bedzie tablicą obiektów
	// z tej tablicy obiektów stwrzyć osobne
	// kafelki dla textów wpisanych z formularza

	return (
		<div>
			<Form onFinish={handleSubmit}>
				<Form.Item name="text">
					<Input />
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit">Wyslij</Button>
				</Form.Item>
			</Form>
			{list.map((x) => (
				<Card key={x.key} className="card">
					<p>{x.text}</p>
					<Button
						onClick={() => {
							setList((ps) =>
								ps.filter((val) => val.key !== x.key)
							);
						}}
						type="text"
					>
						X
					</Button>
				</Card>
			))}
		</div>
	);
};

export default List;
