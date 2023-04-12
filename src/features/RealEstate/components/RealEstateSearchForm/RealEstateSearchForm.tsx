import { Button, Form, Input, Radio, Select, Slider } from "antd";
import { IRealEstateItem, PropertType } from "../../interfaces/interfaces";

import "./RealEstateSearchForm.scss";

const { Option } = Select;

interface IRealEstateSearchFormProps {
  realEstates: IRealEstateItem[];
  onSearch: (data: IRealEstateItem[]) => void;
}

export const RealEstateSearchForm = ({
  onSearch,
  realEstates,
}: IRealEstateSearchFormProps) => {
  const [form] = Form.useForm();

  const handleSearch = () => {
    const values = form.getFieldsValue();
    const searchParams = {
      address: values?.address,
      description: values?.description,
      price: values?.price,
      propertyType: values?.propertyType,
      forSale: values?.forSale,
    };

    const filteredRealEstates = filterRealEstates(searchParams);
    onSearch(filteredRealEstates);
  };

  const filterRealEstates = (searchParams: {
    address: string;
    description: string;
    price: [number, number];
    propertyType: PropertType;
    forSale: boolean;
  }) => {
    let filteredRealEstates = realEstates;

    if (searchParams.address) {
      filteredRealEstates = filteredRealEstates.filter((item) =>
        item.address.toLowerCase().includes(searchParams.address.toLowerCase())
      );
    }

    if (searchParams.description) {
      filteredRealEstates = filteredRealEstates.filter((item) =>
        item.description
          .toLowerCase()
          .includes(searchParams.description.toLowerCase())
      );
    }

    if (searchParams?.price && searchParams?.price.length === 2) {
      filteredRealEstates = filteredRealEstates.filter(
        (item) =>
          item.price >= searchParams.price[0] &&
          item.price <= searchParams.price[1]
      );
    }
    if (searchParams?.propertyType) {
      filteredRealEstates = filteredRealEstates.filter(
        (item) => item.propertyType === searchParams.propertyType
      );
    }

    if (searchParams.forSale) {
      filteredRealEstates = filteredRealEstates.filter((item) => item.forSale);
    }

    if (searchParams.forSale === false) {
      filteredRealEstates = filteredRealEstates.filter((item) => !item.forSale);
    }

    return filteredRealEstates;
  };

  return (
    <Form
      layout="vertical"
      form={form}
      onFinish={handleSearch}
      className="form"
    >
      <h2 className="title">Find Your Dream Home</h2>
      <Form.Item name="forSale" label="Sale/Rent">
        <Radio.Group>
          <Radio.Button value={true}>For Sale</Radio.Button>
          <Radio.Button value={false}>For Rent</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item name="price" label="Price Range">
        <Slider range min={0} max={10000000} defaultValue={[0, 10000000]} />
      </Form.Item>
      <Form.Item name="propertyType" label="Property Type">
        <Select placeholder="Select a property type">
          <Option value={PropertType.Apartment}>Apartment</Option>
          <Option value={PropertType.Condos}>Condos</Option>
          <Option value={PropertType.Ranch}>Ranch</Option>
          <Option value={PropertType.Townhome}>Townhome</Option>
        </Select>
      </Form.Item>
      <Form.Item name="address" label="Address">
        <Input placeholder="Enter an address" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} placeholder="Enter a description" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
};
