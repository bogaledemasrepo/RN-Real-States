export interface Property {
  id: string;
  name: string;
  location: string;
  category: string;
  price: string;
  rating: string;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface RealState {
  id: number;
  address: string;
  image: string;
  agentId: string;
  rating: number;
  price: string;
  title: string;
}

export interface RealStateDetail {
  address: string;
  agent: {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  areaInSqFt: string;
  createdAt: string;
  facilities: string[];
  id: number;
  images: string[];
  location: {
    x: number;
    y: number;
  };
  numOfBathrooms: number;
  numOfBedrooms: number;
  price: string;
  title: string;
  rating: number;
  updatedAt: string;
}
