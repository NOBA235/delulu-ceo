import { PitchResponse } from "@/lib/validation/pitch-response";

const WIDTH = 1080;
const HEIGHT = 1350;

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
) {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width <= maxWidth || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  const visibleLines = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    let lastLine = visibleLines[maxLines - 1];
    while (lastLine && context.measureText(`${lastLine}…`).width > maxWidth) {
      lastLine = lastLine.slice(0, -1).trimEnd();
    }
    visibleLines[maxLines - 1] = `${lastLine}…`;
  }

  visibleLines.forEach((visibleLine, index) => {
    context.fillText(visibleLine, x, y + index * lineHeight);
  });
}

export async function renderShareCard(pitch: PitchResponse): Promise<Blob> {
  if (typeof document === "undefined") {
    throw new Error("Share image export is only available in a browser.");
  }

  const canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not prepare the share image.");

  context.fillStyle = "#F4F5F0";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  const background = context.createLinearGradient(0, 0, WIDTH, HEIGHT);
  background.addColorStop(0, "#FFFFFF");
  background.addColorStop(1, "#E6F4EA");
  context.fillStyle = background;
  roundedRect(context, 48, 48, WIDTH - 96, HEIGHT - 96, 42);
  context.fill();

  context.fillStyle = "#006C4C";
  roundedRect(context, 92, 96, 260, 58, 29);
  context.fill();
  context.fillStyle = "#FFFFFF";
  context.font = "700 25px Arial, sans-serif";
  context.textBaseline = "middle";
  context.fillText("DELULU CEO", 222, 125, 220);

  context.fillStyle = "#72796F";
  context.font = "700 19px Arial, sans-serif";
  context.textBaseline = "alphabetic";
  context.fillText("A SERIES A DELUSION", 92, 218);

  context.fillStyle = "#191C1A";
  const nameSize = Math.min(74, Math.max(48, 940 / pitch.startupName.length));
  context.font = `700 ${nameSize}px Georgia, serif`;
  drawWrappedText(context, pitch.startupName, 92, 320, 896, 82, 2);

  context.fillStyle = "#006C4C";
  context.font = "700 20px Arial, sans-serif";
  context.fillText("FORBES COVER STORY", 92, 520);

  context.fillStyle = "#191C1A";
  context.font = "700 43px Georgia, serif";
  drawWrappedText(context, `“${pitch.forbesHeadline}”`, 92, 590, 896, 56, 4);

  context.fillStyle = "#006C4C";
  roundedRect(context, 92, 870, 896, 306, 30);
  context.fill();

  context.fillStyle = "#89F8C7";
  context.font = "700 20px Arial, sans-serif";
  context.fillText("THE CEO VERDICT", 132, 926);

  context.fillStyle = "#FFFFFF";
  context.font = "700 37px Georgia, serif";
  drawWrappedText(context, `“${pitch.ceoVerdict}”`, 132, 1000, 816, 48, 4);

  context.fillStyle = "#414942";
  context.font = "600 21px Arial, sans-serif";
  context.fillText("Your worst decisions. Our next unicorn.", 92, 1240);
  context.textAlign = "right";
  context.fillStyle = "#72796F";
  context.font = "700 18px Arial, sans-serif";
  context.fillText("MADE WITH DELULU CEO", 988, 1280);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Your browser could not create the PNG. Please try again."));
    }, "image/png");
  });
}