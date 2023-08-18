import React, { useEffect, useState } from "react";

import SideBar from "../SideBar/SideBar";
import { CursorClick, Member, RenderMembers } from "../../utils/Member";

import "./Workspace.scss";

const Workspace: React.FC<{
  imageFile: File;
  cursorMode: "select" | "pencil" | "erase";
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
}> = (props: {
  imageFile: File;
  cursorMode: "select" | "pencil" | "erase";
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [cursorClickLocation, setCursorClickLocation] = useState<{
    first: CursorClick;
    second: CursorClick;
  }>({
    first: { x: -1, y: -1 },
    second: { x: -1, y: -1 },
  });
  const [lines, setLines] = useState<
    { first: CursorClick; second: CursorClick }[] | null
  >(null);

  useEffect(() => {
    if (props.imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(props.imageFile);
    } else {
      setImage(null);
    }
  }, [props.imageFile]);

  const SvgOnClickHandler = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    let tempCursorClickLocation = { ...cursorClickLocation };

    if (showSideBar) {
      if (props.cursorMode === "select") {
        setShowSideBar(false);
      }
    } else {
      const svgElement = document.getElementById("workspace-drawing");
      let offsetX = e.pageX - svgElement!.getClientRects()[0].left;
      let offsetY = e.pageY - svgElement!.getClientRects()[0].top;

      if (props.cursorMode === "pencil") {
        if (
          tempCursorClickLocation.first.x < 0 ||
          tempCursorClickLocation.first.y < 0
        ) {
          tempCursorClickLocation.first.x =
            offsetX / svgElement!.getClientRects()[0].width;
          tempCursorClickLocation.first.y =
            offsetY / svgElement!.getClientRects()[0].height;
        } else {
          tempCursorClickLocation.second.x =
            offsetX / svgElement!.getClientRects()[0].width;
          tempCursorClickLocation.second.y =
            offsetY / svgElement!.getClientRects()[0].height;

          if (lines) {
            setLines([...lines, tempCursorClickLocation]);
          } else {
            setLines([tempCursorClickLocation]);
          }

          setCursorClickLocation({
            first: { x: -1, y: -1 },
            second: { x: -1, y: -1 },
          });

          console.log(lines);
          
        }
      }
    }
  };

  return (
    <React.Fragment>
      {showSideBar && <SideBar setMembers={props.setMembers} />}
      <div className="workspace">
        <svg
          id="workspace-drawing"
          className={`cursor-${props.cursorMode}`}
          onClick={(e) => {
            SvgOnClickHandler(e);
          }}
        >
          <rect x="0" y="0" width="100%" height="100%" />
          <RenderMembers lines={lines} />
        </svg>
        <img src={image!} alt="" />
      </div>
    </React.Fragment>
  );
};

export default Workspace;
