export interface ILayer {
    zPos: number;
    layerId: number;
    male?: string;
    muscular?: string;
    female?: string;
    child?: string;
    teen?: string;
    pregnant?: string;
    skeleton?: string;
    zombie?: string;
};

export interface ISpritesheetMap {
    name: string;
    type_name: string;
    variants: string[];
    match_body_color?: boolean;
    preview_row?: number;
    layers: ILayer[];
};

export type BodyTypes = "male" | "muscular" | "female" | "child" | "teen" | "pregnant" | "skeleton" | "zombie";