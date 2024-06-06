import { useState } from 'react'
import { Modal, Form, Input, Button } from 'antd'
interface ModalFormProps {
    record: Object;
    onClose: () => void;
    onUpdate: (values: any) => void;
}


const Edit: React.FC<ModalFormProps> = ({ record, onClose, onUpdate }) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            form.resetFields();
            console.log(values)
            onUpdate(values)
            //createGameCategory()
        }).catch(error => {
            console.log(error);
        })
    }

    const handleCancel = () => {
        form.resetFields();
        onClose();
    }


    return (
        <Modal
            title="Update GameCategory"
            open={!!record}
            onOk={handleSubmit}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" onClick={handleSubmit} type="primary">
                    Update
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" name="GameCategoryForm" initialValues={record}>
                <Form.Item name="id" label="Id">
                    <Input disabled/>
                </Form.Item>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name" }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default Edit;