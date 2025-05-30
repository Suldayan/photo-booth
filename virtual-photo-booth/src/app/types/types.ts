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
  popular: boolean;
}

// PhotoSelection
export interface PhotoSelectionProps {
  onNext: (stripType: StripType) => void;
  initialSelection?: StripType;
}

export interface PhotoSessionProps {
  userSelections: UserSelections;
}

// Home
export interface HomeProps {
  onNext: () => void;
}

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

// Mode Card
export interface ButtonConfig {
  text: string;
  icon?: React.ComponentType<{ className?: string }>;
  primary: boolean;
  onClick: () => void;
}

export interface ModeCardProps {
  mode: string;
  subtitle: string;
  description: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  isSelected: boolean;
  onClick: () => void;
  buttons: ButtonConfig[];
}

// Photo Session
export interface UserSelections {
  stripType: StripType;
  background?: string;
  filter?: string;
}

export interface PhotoSessionProps {
    userSelections: UserSelections
}

export interface FilterOptions {
  name: string;
  photoAssignment: string | null;
  css: string;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  sharpen?: boolean;
  overlay?: string | null;
  description: string;
}

// Editable Photo Strip
export interface EditablePhotoStripProps {
  photos: string[];
  borderColour: string; // Either white or black
}


