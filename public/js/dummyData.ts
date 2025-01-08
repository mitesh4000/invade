const hullsA = [
  {
    A: [
      "./game_assets/PNG/Hulls_Color_A/Hull_01.png",
      "./game_assets/PNG/Hulls_Color_A/Hull_02.png",
      "./game_assets/PNG/Hulls_Color_A/Hull_03.png",
      "./game_assets/PNG/Hulls_Color_A/Hull_04.png",
      "./game_assets/PNG/Hulls_Color_A/Hull_05.png",
      "./game_assets/PNG/Hulls_Color_A/Hull_06.png",
      "./game_assets/PNG/Hulls_Color_A/Hull_07.png",
      "./game_assets/PNG/Hulls_Color_A/Hull_08.png",
    ],
  },
] as const;
type Tank = {
  _id: string;
  hull: string;
  gun: string;
  track: string;
};
