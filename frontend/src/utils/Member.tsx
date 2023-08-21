import React from "react";

import { SetMembersLS, SetLinesLS } from "./LocalStorage";

export interface CursorClick {
  x: number;
  y: number;
}

export interface Line {
  first: CursorClick;
  second: CursorClick;
}

export interface Member {
  pose: string;
  materialId: string;
  material: string;
  quantity: number;
  quality: string;
  points?: Line;
  length?: number | undefined;
  unitWeight: number;
  pieceWeight?: number | undefined;
  totalWeight?: number | undefined;
}

export const AddMember = (
  members: Member[] | null,
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>,
  member: Member
) => {
  if (members) {
    setMembers([...members, member]);
    SetMembersLS([...members, member]);
  } else {
    setMembers([member]);
    SetMembersLS([member]);
  }
};

export const DeleteMember = (
  index: number,
  members: Member[] | null,
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>,
  lines: Line[] | null,
  setLines: React.Dispatch<React.SetStateAction<Line[] | null>>
): void => {
  if (members) {
    let tempMembers = members ? [...members] : null;
    let tempLines = lines ? [...lines] : null;

    if (tempMembers) {
      tempMembers.splice(index, 1);
    }

    if (tempLines) {
      tempLines.splice(index, 1);
    }

    setMembers(tempMembers);
    SetMembersLS(tempMembers);
    setLines(tempLines);
    SetLinesLS(tempLines);
  }
  return;
};

export const RenderMembers: React.FC<{
  lines: Line[] | null;
}> = (props: { lines: Line[] | null }): JSX.Element | null => {
  const imgElement = document.getElementById("back-image");

  let imgWidth = 0;
  let imgHeight = 0;

  if (imgElement) {
    imgWidth = imgElement.getClientRects()[0].width;
    imgHeight = imgElement.getClientRects()[0].height;
  }

  return (
    <React.Fragment>
      {props.lines?.map((line, ind) => (
        <line
          className="svg-line"
          key={`line_${ind}`}
          x1={line.first.x * imgWidth}
          y1={line.first.y * imgHeight}
          x2={line.second.x * imgWidth}
          y2={line.second.y * imgHeight}
        />
      ))}
    </React.Fragment>
  );
};

export const DetectMemberClick = (
  click: CursorClick,
  lines: Line[] | null,
  width: number,
  height: number
): number => {
  const clickPrecision = 12;

  if (lines) {
    let numbers: number[] = [];

    for (const line of lines) {
      let y2y1 = (line.second.y - line.first.y) * height;
      let x2x1 = (line.second.x - line.first.x) * width;
      let x1y2 = line.first.x * line.second.y * width * height;
      let x2y1 = line.first.y * line.second.x * width * height;

      let distance = y2y1 * click.x - x2x1 * click.y + x2y1 - x1y2;

      distance /= (y2y1 ** 2 + x2x1 ** 2) ** 0.5;

      if (Math.abs(distance) < clickPrecision) {
        return lines.indexOf(line);
      }
    }

    return -1;
  } else {
    return -1;
  }
};

export const FindLengths = (
  clickLine: Line | null,
  refLength: number | null,
  members: Member[] | null,
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>
): void => {
  let clickLineLength: number = 0;

  if (clickLine) {
    clickLineLength =
      ((clickLine.second.x - clickLine.first.x) ** 2 +
        (clickLine.second.y - clickLine.first.y) ** 2) **
      0.5;
      console.log(clickLine);
      
  }

  if (members) {
    let tempMembers = [...members];

    for (let i = 0; i < tempMembers.length; i++) {
      if (tempMembers[i].points) {
        console.log(tempMembers[i].points);
        
        let memberLength =
          ((tempMembers[i].points!.second.x - tempMembers[i].points!.first.x) **
            2 +
            (tempMembers[i].points!.second.y -
              tempMembers[i].points!.first.y) **
              2) **
          0.5;
          console.log(clickLineLength, memberLength);
          
        if (refLength) {
          tempMembers[i].length = parseFloat(
            ((memberLength * refLength) / clickLineLength).toFixed(1)
          );
          tempMembers[i].pieceWeight = parseFloat(
            (
              (tempMembers[i].length! * tempMembers[i].unitWeight) /
              1000
            ).toFixed(2)
          );
          tempMembers[i].totalWeight = parseFloat(
            (tempMembers[i].pieceWeight! * tempMembers[i].quantity).toFixed(1)
          );
        }
      }
      console.log('---');
      
    }

    setMembers(tempMembers);
  }
};
