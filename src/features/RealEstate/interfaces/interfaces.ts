export interface IRealEstateItem {
  id: number;
  name: string;
  propertyType: PropertType;
  description: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  price: number;
  type: string;
  forSale: boolean;
  city: string;
  state: string;
  agent: {
    name: string;
    phone: string;
    email: string;
    agentId: number;
  };
  images: string[];
}

export enum PropertType {
  Apartment = "Apartment",
  Townhome = "Townhome",
  Ranch = "Ranch",
  Condos = "Condos",
}

export enum EViewMode {
  user,
  agent,
}