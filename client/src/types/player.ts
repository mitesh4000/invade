export interface Player {
  playerId: number;
  playerName: string;
  tankHull: HTMLImageElement;
  tankGun: HTMLImageElement;
  tankTrack: HTMLImageElement;
  tankTrack_2: HTMLImageElement;
  x: number;
  y: number;
  angle: number;
  direaction: number;
  color: string;
  hull: number;
  moving: boolean;
  track: Number; // example ["A",2]
}

export interface GameState {
  map: {
    mapImage: HTMLImageElement;
    x: number;
    y: number;
  };
  players: Player[];
}
