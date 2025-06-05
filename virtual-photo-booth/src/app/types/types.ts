export type StripType = '4x1' | '3x2' | '6x1';

// page.tsx
export interface UserSelections {
  stripType: StripType;
  background?: string;
  filter?: string;
  frameStyle?: string;
}

export interface StripOption {
  type: StripType;
  name: string;
  description: string;
}

export type StripConfig = {
    photoCount: number;
    photoWidth: string;
    photoHeight: string;
    stripWidth: string;
    layout: 'vertical' | 'grid';
    gridCols?: number;
    gridRows?: number;
};


// Mode Card
export interface ButtonConfig {
  text: string;
  icon?: React.ComponentType<{ className?: string }>;
  primary: boolean;
  onClick: () => void;
}


// Photo Session
export interface FilterOptions {
  name: string;
  photoAssignment: string | null;
  css: string;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  sharpen?: boolean;
  overlay?: string | null;
  description: string;
}
