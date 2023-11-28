export interface Location {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
}

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface GeoBoundingBox {
    bottom_left?: Coordinates;
    top_right?: Coordinates;
}
