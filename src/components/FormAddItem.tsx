import React from 'react';
import { Input, Button, Form } from 'antd';

interface FormAddItemProps {
	onFinish: (values: any) => void;
}

const FormAddItem: React.FC<FormAddItemProps> = ({ onFinish }) => {
	return (
		<Form onFinish={onFinish}>
			<Form.Item name="text">
				<Input />
			</Form.Item>
			<Form.Item>
				<Button htmlType="submit">Wyslij</Button>
			</Form.Item>
		</Form>
	);
};

export default FormAddItem;
