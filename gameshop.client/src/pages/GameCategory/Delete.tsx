import { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { createGameCategory } from '@/api/GameCategory/GameCategory'

interface ModalFormProps {
    record: Object;
    onClose: () => void;
    onDelete: (values: any) => void;
}


const Delete: React.FC<ModalFormProps> = ({ record, onClose, onDelete }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.resetFields();
        onDelete(record);
    }

    const handleCancel = () => {
        form.resetFields();
        onClose();
    }


    return (
        <Modal
            title="Delete GameCategory"
            open={!!record}
            onOk={handleSubmit}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" onClick={handleSubmit} type="primary" danger>
                    Delete
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" name="GameCategoryForm" initialValues={record}>
                <Form.Item name="id" label="Id">
                    <Input disabled />
                </Form.Item>
                <Form.Item name="name" label="Name">
                    <Input disabled />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default Delete;