interface Wolfchild {
  name: string;
  type_name: string;
  layer_1: Layer1;
  variants: string[];
  match_body_color: boolean;
};
interface Layer1 {
  zPos: number;
  child: string;
};
