import { useState } from "react";

import { Modal, Button } from "antd";

import { createNewData } from "../../realEstateSlice";
import { RealEstateListingForm } from "../RealEstateListingForm/RealEstateListingForm";
import { IRealEstateItem } from "../../interfaces/interfaces";
import { useAppDispatch } from "../../../../store/hooks";

export const CreatePropertyListing = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onSubmit = (values: any) => {
    const newProperty: IRealEstateItem = {
      id: Math.random(),
      name: values.name,
      propertyType: values.propertyType,
      description: values.description,
      address: values.address,
      location: {
        lat: values.lat,
        lng: values.lng,
      },
      price: values.price,
      type: values.type,
      forSale: values.forSale ? true : false,
      city: values.city,
      state: values.state,
      agent: {
        name: values.agentName,
        phone: values.agentPhone,
        email: values.agentEmail,
        agentId: 1,
      },
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQRmUkGYNM81mk-kZm_A2MQeGvnET69MCfog&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgbpmuSrQLfQA_iMNZMLsauBlNRi392-3lXA&usqp=CAU",
        "https://assets-news.housing.com/news/wp-content/uploads/2022/01/11171226/World%E2%80%99s-15-Most-Beautiful-Houses-That-Will-Leave-You-Awestruck-02.png",
      ],
    };
    dispatch(createNewData(newProperty)).finally(() => {
      setVisible(false);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        style={{
          marginTop: "20px",
        }}
      >
        Add Listing
      </Button>
      {visible && (
        <Modal
          title="Create Property Listing"
          open={visible}
          onCancel={handleCancel}
          footer={null}
        >
          <RealEstateListingForm onSubmit={onSubmit} />
        </Modal>
      )}
    </>
  );
};
