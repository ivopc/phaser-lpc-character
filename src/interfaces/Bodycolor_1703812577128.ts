interface Bodycolor {
  name: string;
  type_name: string;
  layer_1: Layer1;
  variants: string[];
  match_body_color: boolean;
};
interface Layer1 {
  zPos: number;
  male: string;
  muscular: string;
  female: string;
  pregnant: string;
  teen: string;
  child: string;
};
