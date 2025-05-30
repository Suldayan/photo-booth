import { StripOption } from "../types/types";

export const STRIP_OPTIONS: StripOption[] = [
    { 
        type: '4x1' as const, 
        name: 'Classic Strip', 
        description: 'Traditional vertical photo strip',
        popular: true
    },
    { 
        type: '3x2' as const, 
        name: 'Grid', 
        description: 'Grid layout for 6 total photos',
        popular: false
    },
    { 
        type: '6x1' as const, 
        name: 'Long Strip', 
        description: 'Extended vertical strip',
        popular: false
    }
];