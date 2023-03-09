//Interface to Schema
export interface ICabin {
  name: string;
  tv: boolean;
  bathroom: number;
  room: number;
  wifi: boolean;
  bed: number;
  parking: boolean;
  pet_friendly: boolean;
  heating: boolean;
  air_conditioning: boolean;
  capacity: number;
  pictureURLs: string[];
  description: string;
  price: {
    winter: number;
    spring: number;
    summer: number;
    fall: number;
  };
}
