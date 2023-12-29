interface Hookhand {
  name: string;
  type_name: string;
  layer_1: Layer1;
  layer_2: Layer2;
  variants: string[];
};
interface Layer2 {
  zPos: number;
  male: string;
};
interface Layer1 {
  zPos: number;
  is_mask: boolean;
  male: string;
};
