import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Descriptions, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import ShowImagesCarousel from "../ShowImages/ShowImagesCarousel";
import { Location } from "../../../common/components/Map/Map";
import { IRealEstateItem } from "../../interfaces/interfaces";

import "./PropertyDetailPage.scss";

function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<IRealEstateItem | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      const response = await fetch(`http://localhost:3001/properties/${id}`);
      const data = await response.json();
      setProperty(data);
    };

    fetchProperty();
  }, [id]);

  const handleGoBack = () => {
    navigate("/");
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-detail">
      <div className="property-detail-header">
        <Button icon={<ArrowLeftOutlined />} onClick={handleGoBack}>
          Go Back
        </Button>
      </div>
      <ShowImagesCarousel images={property.images} />
      <div className="property-detail-content">
        <h1 className="property-detail-title">{property.name}</h1>
        <Descriptions bordered>
          <Descriptions.Item label="Price">{`$${property.price}`}</Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {property.address}, {property.city}, {property.state}
          </Descriptions.Item>
          <Descriptions.Item label="For Sale">
            {property.forSale ? "for sale" : "for rent"}
          </Descriptions.Item>
          <Descriptions.Item label="Agent Name">
            {property.agent.name}
          </Descriptions.Item>
          <Descriptions.Item label="Agent Phone">
            {property.agent.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Agent Email">
            {property.agent.email}
          </Descriptions.Item>
        </Descriptions>
        <p className="property-detail-description">{property.description}</p>
      </div>
      <div>
        <Location
          location={{
            lat: property.location.lat,
            lng: property.location.lng,
          }}
          zoom={12}
        />
      </div>
    </div>
  );
}

export default PropertyDetailPage;
