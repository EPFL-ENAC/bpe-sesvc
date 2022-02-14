export interface Shelter {
  _id: string;
  name: string;
  organisation: string;
  shelter_total: number;
  shelter_occupants: number;
  shelter_lifespan: number;
  setup_people: number;
  setup_time: number;
  location_name: string;
  location_country: string;
  location_distance_from_capital: number;
  location_lat: number;
  location_lon: number;
  risk_flood: string;
  risk_seismic: string;
  habitability: Score;
  habitability_score: number;
  technical_performance: Score;
  technical_performance_score: number;
}
export interface Score {
  [property: string]: number | Score;
}
