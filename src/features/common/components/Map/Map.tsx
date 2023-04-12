import GoogleMapReact from "google-map-react";

import "./Map.scss";

export interface ILocation {
  location: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const Marker = ({ text }: any) => (
  <div>
    {text}
    <img src="/location.svg" width="25px" height="25px"/>
  </div>
);

export const Location: React.FC<ILocation> = ({ location, zoom }) => {
  return (
    <div>
      <div className="mapContainer">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBkLy6yxswzTFaRjl9ZiBChOn4tsDOy-1g",
            region: "us",
          }}
          defaultCenter={location}
          defaultZoom={14}
          center={location}
          yesIWantToUseGoogleMapApiInternals
        >
          <Marker lat={location.lat} lng={location.lng} text={""} />
        </GoogleMapReact>{" "}
      </div>
    </div>
  );
};
