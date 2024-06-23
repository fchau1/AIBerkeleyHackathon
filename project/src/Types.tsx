export interface Coordinate {
    x1: number
    x2: number
    y1: number;
    y2: number;
}

export interface TileType {
    coordinates?: Coordinate
    isHighlighted: boolean;
    word: string;
    totalWidth: number;
}

export interface TileProps {
    tile: TileType;
}

export const letterWidth = 'w-8'