export interface IPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface IPolygon {
  type: "Polygon";
  coordinates: [[number, number][]];
}
