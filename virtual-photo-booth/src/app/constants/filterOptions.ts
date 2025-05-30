import { FilterOptions } from "../types/types";

export const filterOptions: FilterOptions[] = [
    {
        name: "None",
        photoAssignment: null,
        css: "",
        overlay: null,
        description: "Original camera feed"
    },
    {
        name: "Life4Cut",
        photoAssignment: "life4cut",
        css: "brightness(1.1) contrast(1.3) saturate(1.2) hue-rotate(-5deg)",
        overlay: "linear-gradient(rgba(255,220,180,0.3), rgba(255,220,180,0))",
        description: "High contrast, bright skin tone, warm highlights"
    },
    {
        name: "Dalkom",
        photoAssignment: "dalkom", 
        css: "brightness(1.05) contrast(0.9) saturate(1.1) hue-rotate(8deg)",
        overlay: "linear-gradient(rgba(255,192,203,0.15), rgba(255,218,185,0.1))",
        description: "Soft pinks/peaches, dreamy glow"
    },
    {
        name: "Cheongsoon",
        photoAssignment: "cheongsoon",
        css: "brightness(1.15) contrast(0.95) saturate(0.8)",
        mixBlendMode: "luminosity",
        description: "Clear, no-makeup idol style"
    },
    {
        name: "Y2K-Retro",
        photoAssignment: "y2k",
        css: "sepia(0.3) contrast(1.2) brightness(1.05) saturate(1.1)",
        overlay: "linear-gradient(rgba(0,150,255,0.1), rgba(255,100,255,0.05))",
        description: "Cyan shadows, faded highlights, 2000s nostalgia"
    },
    {
        name: "Gohwajil",
        photoAssignment: "gohwajil",
        css: "brightness(1.1) contrast(1.4) saturate(1.1) blur(0px)",
        sharpen: true,
        description: "Ultra-sharp idol selfie effect"
    },
    {
        name: "Urban",
        photoAssignment: "urban",
        css: "brightness(0.9) contrast(1.2) saturate(1.1) hue-rotate(15deg)",
        overlay: "linear-gradient(rgba(0,100,150,0.1), rgba(100,0,200,0.05))",
        description: "Cool tones with neon highlights, nightlife"
    }
];