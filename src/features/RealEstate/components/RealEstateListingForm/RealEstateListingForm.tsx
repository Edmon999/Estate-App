import { Button, Form, Input, InputNumber, Radio, Select } from "antd";

import { PropertType } from "../../interfaces/interfaces";

import "./RealEstateListingForm.scss";

const { Option } = Select;

export const RealEstateListingForm = ({ onSubmit, initialValues }: any) => {
  const [form] = Form.useForm();

  const handleFormSubmit = () => {
    const values = form.getFieldsValue();
    onSubmit(values);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleFormSubmit}
      initialValues={initialValues}
      className="form"
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder="Enter property name" />
      </Form.Item>
      <Form.Item
        name="propertyType"
        label="Property Type"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select a property type">
          <Option value={PropertType.Apartment}>Apartment</Option>
          <Option value={PropertType.Condos}>Condos</Option>
          <Option value={PropertType.Ranch}>Ranch</Option>
          <Option value={PropertType.Townhome}>Townhome</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea rows={4} placeholder="Enter a description" />
      </Form.Item>
      <Form.Item name="address" label="Address" rules={[{ required: true }]}>
        <Input placeholder="Enter address" />
      </Form.Item>
      <Form.Item name="price" label="Price">
        <Input type="number" placeholder="Enter price" />
      </Form.Item>
      <Form.Item name="forSale" label="Sale/Rent">
        <Radio.Group>
          <Radio.Button value={true}>For Sale</Radio.Button>
          <Radio.Button value={false}>For Rent</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="lat" label="Latitude" rules={[{ required: true }]}>
        <InputNumber
          placeholder="example 40.730610"
          style={{
            width: "300px",
          }}
        />
      </Form.Item>
      <Form.Item name="lng" label="Longitude" rules={[{ required: true }]}>
        <InputNumber
          placeholder="example -73.935242."
          style={{
            width: "300px",
          }}
        />
      </Form.Item>
      <Form.Item
        name="agentName"
        label="Agent Name"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter agent's name" />
      </Form.Item>
      <Form.Item
        name="agentPhone"
        label="Agent Phone"
        rules={[{ required: true }]}
      >
        <Input placeholder="Enter agent's phone number" />
      </Form.Item>
      <Form.Item
        name="agentEmail"
        label="Agent Email"
        rules={[{ required: true, type: "email" }]}
      >
        <Input placeholder="Enter agent's email address" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="button">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
