import jsPDF from "jspdf";
import { Layer, LayerType } from "@/types/canvas";
import { colorToCss, getContrastingTextColor } from "@/lib/utils";

interface BoundingBox {
  minX: number;
  minY: number;
  width: number;
  height: number;
}

const PADDING = 40;

export const calculateBoundingBox = (
  layers: Readonly<Record<string, Layer>> | Layer[] | null | undefined,
): BoundingBox => {
  const layerArray = Array.isArray(layers)
    ? layers
    : layers
      ? Object.values(layers)
      : [];

  if (layerArray.length === 0) {
    return { minX: 0, minY: 0, width: 800, height: 600 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const layer of layerArray) {
    minX = Math.min(minX, layer.x);
    minY = Math.min(minY, layer.y);
    maxX = Math.max(maxX, layer.x + layer.width);
    maxY = Math.max(maxY, layer.y + layer.height);
  }

  minX -= PADDING;
  minY -= PADDING;
  maxX += PADDING;
  maxY += PADDING;

  return { minX, minY, width: maxX - minX, height: maxY - minY };
};

const calculateFontSize = (width: number, height: number, scaleFactor: number) => {
  const maxFontSize = 100;
  return Math.min(width * scaleFactor, height * scaleFactor, maxFontSize);
};

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
};

export const renderBoardToPng = async (
  layers: Readonly<Record<string, Layer>> | null | undefined,
  layerIds: readonly string[] | null | undefined,
  bbox: BoundingBox,
): Promise<string> => {
  await document.fonts.ready;

  const scale = 2;
  const canvas = document.createElement("canvas");
  canvas.width = bbox.width * scale;
  canvas.height = bbox.height * scale;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  ctx.scale(scale, scale);
  ctx.fillStyle = "#f5f5f5";
  ctx.fillRect(0, 0, bbox.width, bbox.height);
  ctx.translate(-bbox.minX, -bbox.minY);

  const ids = layerIds ?? (layers ? Object.keys(layers) : []);

  for (const id of ids) {
    const layer = layers?.[id];
    if (!layer) continue;

    const { x, y, width, height, fill } = layer;
    const fillCss = fill ? colorToCss(fill) : "#000000";

    if (layer.type === LayerType.Rectangle) {
      ctx.fillStyle = fillCss;
      ctx.fillRect(x, y, width, height);
    } else if (layer.type === LayerType.Ellipse) {
      ctx.fillStyle = fillCss;
      ctx.beginPath();
      ctx.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (layer.type === LayerType.Path) {
      const points = (layer as any).points as [number, number, number?][];
      if (points && points.length > 0) {
        ctx.strokeStyle = fillCss;
        ctx.lineWidth = 4;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(x + points[0][0], y + points[0][1]);
        for (const point of points) {
          ctx.lineTo(x + point[0], y + point[1]);
        }
        ctx.stroke();
      }
    } else if (layer.type === LayerType.Text) {
      const fontSize = calculateFontSize(width, height, 0.5);
      ctx.fillStyle = fillCss;
      ctx.font = `${fontSize}px Caveat`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lines = wrapText(ctx, (layer as any).value || "Text", width);
      const lineHeight = fontSize * 1.1;
      const startY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, i) => {
        ctx.fillText(line, x + width / 2, startY + i * lineHeight);
      });
    } else if (layer.type === LayerType.Note) {
      ctx.fillStyle = fillCss;
      ctx.fillRect(x, y, width, height);

      const fontSize = calculateFontSize(width, height, 0.15);
      ctx.fillStyle = fill ? getContrastingTextColor(fill) : "#000000";
      ctx.font = `${fontSize}px Jua`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lines = wrapText(ctx, (layer as any).value || "Text", width - 16);
      const lineHeight = fontSize * 1.2;
      const startY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2;
      lines.forEach((line, i) => {
        ctx.fillText(line, x + width / 2, startY + i * lineHeight);
      });
    }
  }

  return canvas.toDataURL("image/png");
};

export const downloadPngAsPdf = (
  dataUrl: string,
  width: number,
  height: number,
  fileName: string,
) => {
  const orientation = width >= height ? "landscape" : "portrait";

  const pdf = new jsPDF({
    orientation,
    unit: "px",
    format: [width, height],
  });

  pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
  pdf.save(`${fileName}.pdf`);
};