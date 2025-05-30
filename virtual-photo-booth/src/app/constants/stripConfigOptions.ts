import { StripConfig } from "../types/types";

export const STRIP_CONFIGS: Record<string, StripConfig> = {
    '4x1': {
        photoCount: 4,
        photoWidth: 'w-16',
        photoHeight: 'h-20',
        stripWidth: 'w-20',
        layout: 'vertical'
    },
    '3x2': {
        photoCount: 6,
        photoWidth: 'w-14',
        photoHeight: 'h-16',
        stripWidth: 'w-32',
        layout: 'grid',
        gridCols: 2,
        gridRows: 3
    },
    '6x1': {
        photoCount: 6,
        photoWidth: 'w-14',
        photoHeight: 'h-18',
        stripWidth: 'w-18',
        layout: 'vertical'
    },
};