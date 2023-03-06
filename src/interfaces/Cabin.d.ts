//Interface to Schema
export interface Cabin {
  // Properties ordered by alphabetic order
  amenities:  string;// - [amenities]  (o lo separamos en columnas para cada amenity/servicio con valor booleano, más fácil de renderizar)
  capacity:   string;
  description:string;
  name:       string;
  price: {
    autumn: number;
    spring: number;
    summer: number
    winter: number;
  }
}