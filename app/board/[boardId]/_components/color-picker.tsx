"use client"

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
};

export const ColorPicker = ({
    onChange,
}: ColorPickerProps) => {
    return (
        <div
            className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200"
        >
            <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
            
            <ColorButton color={{ r: 155, g: 89, b: 182 }} onClick={onChange} />
            <ColorButton color={{ r: 52, g: 152, b: 219 }} onClick={onChange} />
            <ColorButton color={{ r: 20, g: 184, b: 166 }} onClick={onChange} />
            <ColorButton color={{ r: 241, g: 196, b: 15 }} onClick={onChange} />
            <ColorButton color={{ r: 230, g: 126, b: 34 }} onClick={onChange} />
            <ColorButton color={{ r: 231, g: 76, b: 60 }} onClick={onChange} />
            <ColorButton color={{ r: 128, g: 0, b: 32 }} onClick={onChange} />
            <ColorButton color={{ r: 236, g: 72, b: 153 }} onClick={onChange} />
            <ColorButton color={{ r: 46, g: 204, b: 113 }} onClick={onChange} />
            <ColorButton color={{ r: 245, g: 240, b: 150 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
        </div>
    )
};

interface ColorButtonProps {
    onClick: (color: Color) => void;
    color: Color;
};

const ColorButton = ({
    onClick,
    color,
}: ColorButtonProps) => {
    return (
        <button
           className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition"
           onClick={() => onClick(color)} 
        >
            <div
                className="h-8 w-8 rounded-md border border-neutral-300"
                style={{ background: colorToCss(color) }}
            />
        </button>
    )
}