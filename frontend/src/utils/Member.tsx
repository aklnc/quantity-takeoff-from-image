import React from "react";

export interface Member {
  pose: string;
  materialId: string;
  material: string;
  quantity: number;
  quality: string;
  length?: number | undefined;
  unitWeight: number;
  pieceWeight?: number | undefined;
  totalWeight?: number | undefined;
}

export interface CursorClick {
  x: number;
  y: number;
}

interface Line {
  first: CursorClick;
  second: CursorClick;
}

export const AddMember = () => {
  return;
};

export const RenderMembers: React.FC<{
  lines: Line[] | null;
}> = (props: { lines: Line[] | null }) => {
  const svgElement = document.getElementById("workspace-drawing");

  let svgWidth = 0;
  let svgHeight = 0;

  if (svgElement) {
    svgWidth = svgElement.getClientRects()[0].width;
    svgHeight = svgElement.getClientRects()[0].height;
  }

  return (
    <React.Fragment>
      {props.lines?.map((line, ind) => (
        <line
        className="svg-line"
          key={`line_${ind}`}
          x1={line.first.x * svgWidth}
          y1={line.first.y * svgHeight}
          x2={line.second.x * svgWidth}
          y2={line.second.y * svgHeight}
        />
      ))}
    </React.Fragment>
  );
};
