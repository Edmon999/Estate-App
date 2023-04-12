import React, { useState } from "react";
import { Button, Card, Modal } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  deleteRealEstateData,
  editRealEstateData,
} from "../../realEstateSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store/store";
import { RealEstateListingForm } from "../RealEstateListingForm/RealEstateListingForm";

import { EViewMode, IRealEstateItem } from "../../interfaces/interfaces";

import "./PropertyList.scss";

interface IPropertyListProps {
  properties: IRealEstateItem[];
}

const PropertyList: React.FC<IPropertyListProps> = ({ properties }) => {
  const [isEditModalOpened, setIsEditModalOpened] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IRealEstateItem>();

  const dispatch = useAppDispatch();
  const { viewMode } = useAppSelector((state: RootState) => state.realEstates);

  const showConfirmModal = (id: number) => {
    Modal.confirm({
      title: "Confirm",
      content: "Are you sure you want to delete this item?",
      onOk: () => {
        dispatch(deleteRealEstateData(id));
      },
      onCancel: () => {},
    });
  };
  const onDelete = (id: number) => showConfirmModal(id);

  const onEdit = (data: IRealEstateItem) => {
    setIsEditModalOpened(true);
    setCurrentData(data);
  };

  const closeEditModal = () => {
    setIsEditModalOpened(false);
  };

  const onEditSubmit = (values: any) => {
    const editedData: IRealEstateItem = {
      id: currentData!.id,
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
      images: currentData!.images,
    };
    dispatch(editRealEstateData(editedData)).finally(() => {
      closeEditModal();
    });
  };

  return (
    <>
      {isEditModalOpened && viewMode === EViewMode.agent && (
        <Modal
          title="Edit Property Listing"
          open={isEditModalOpened}
          onCancel={() => {
            setIsEditModalOpened(false);
          }}
          footer={null}
        >
          <RealEstateListingForm
            onSubmit={onEditSubmit}
            initialValues={{
              address: currentData?.address,
              agentEmail: currentData?.agent.email,
              agentName: currentData?.agent.name,
              agentPhone: currentData?.agent.phone,
              description: currentData?.description,
              forSale: currentData?.forSale,
              lat: currentData?.location.lat,
              lng: currentData?.location.lng,
              name: currentData?.name,
              price: currentData?.price,
              propertyType: currentData?.propertyType,
            }}
          />
        </Modal>
      )}
      <div>
        <h2>Available listings</h2>
        <div className="property-list">
          {properties?.map((property) => (
            <Link
              to={`/properties/${property.id}`}
              className="property-link"
              key={property.id}
            >
              <Card
                hoverable
                cover={<img alt={property.name} src={property.images[0]} />}
              >
                <Card.Meta
                  title={property.name}
                  description={`${property.description.slice(0, 32)} ...`}
                />
                <div className="property-details">
                  <div className="property-location">
                    <span>Location:</span>
                    <p>{property.address}</p>
                  </div>
                  <div className="property-price">
                    <span>Price:</span>
                    <p>{property.price}</p>
                  </div>

                  <div
                    className={`property-type ${
                      property.forSale ? "sale" : "rent"
                    }`}
                  >
                    <span>{property.forSale ? "For Sale" : "For Rent"}</span>
                  </div>
                </div>
                {viewMode === EViewMode.agent ? (
                  <div className="btn-container">
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={(e) => {
                        e.preventDefault();
                        onEdit(property);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.preventDefault();
                        onDelete(property.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                ) : null}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertyList;
