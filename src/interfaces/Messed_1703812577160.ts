interface Messed {
  name: string;
  type_name: string;
  layer_1: Layer1;
  variants: string[];
};
interface Layer1 {
  zPos: number;
  child: string;
};
