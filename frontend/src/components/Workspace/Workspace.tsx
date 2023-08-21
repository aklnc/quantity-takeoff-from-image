import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Member,
  RenderMembers,
  DetectMemberClick,
  DeleteMember,
} from "../../utils/Member";
import {
  GetLinesLS,
  SetLinesLS,
  GetMaterialsLS,
} from "../../utils/LocalStorage";

import SideBar from "../SideBar/SideBar";
import { Line } from "../../utils/Member";
import { Material } from "../../utils/Material";
import { SideBarMode } from "../SideBar/SideBar";
import { InfoxText } from "../InformativeText/InformativeText";
import { CursorMode } from "../Navigation/Navigation";
import { View } from "../../App";

import "./Workspace.scss";
import MaterialSideBar from "../MaterialList/MaterialSideBar";
import RefLength from "../RefLength/RefLenght";

const Workspace: React.FC<{
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  imageFile: File;
  cursorMode: CursorMode;
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
  lines: Line[] | null;
  setLines: React.Dispatch<React.SetStateAction<Line[] | null>>;
  setInformativeText: React.Dispatch<React.SetStateAction<InfoxText>>;
}> = (props: {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
  imageFile: File;
  cursorMode: CursorMode;
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
  lines: Line[] | null;
  setLines: React.Dispatch<React.SetStateAction<Line[] | null>>;
  setInformativeText: React.Dispatch<React.SetStateAction<InfoxText>>;
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [showRefLengthInput, setShowRefLengthInput] = useState<boolean>(false);
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [sideBarMode, setSideBarMode] = useState<SideBarMode>("create");
  const [cursorClickLocation, setCursorClickLocation] = useState<Line>({
    first: { x: -1, y: -1 },
    second: { x: -1, y: -1 },
  });
  const [materials, setMaterials] = useState<Material[] | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [linesOnDrawing, setLinesOnDrawing] = useState<JSX.Element | null>(
    null
  );
  const [render, setRender] = useState(0)

  useEffect(() => {
    let tempLines = GetLinesLS();
    let tempMaterials = GetMaterialsLS();

    if (tempLines) {
      props.setLines(tempLines);
    }

    if (tempMaterials) {
      setMaterials(tempMaterials);
    }

  }, []);

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

  useEffect(() => {
    let templinesOnDrawing: JSX.Element | null = null;
    if (props.lines) {
      templinesOnDrawing = <RenderMembers lines={props.lines} />;
    }

    setLinesOnDrawing(templinesOnDrawing);
  }, [props.lines, useWindowSize(), render]);

  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
  }

  const SvgOnClickHandler = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    let tempCursorClickLocation = { ...cursorClickLocation };

    if (showSideBar) {
      if (props.cursorMode !== "pencil") {
        setShowSideBar(false);
      }
    } else {
      let imgElement = document.getElementById("back-image");
      let offsetX = e.pageX - imgElement!.getClientRects()[0].left;
      let offsetY = e.pageY - imgElement!.getClientRects()[0].top;

      if (props.cursorMode === "pencil") {
        if (selectedMaterial) {
          if (
            tempCursorClickLocation.first.x < 0 ||
            tempCursorClickLocation.first.y < 0
          ) {
            tempCursorClickLocation.first.x =
              offsetX / imgElement!.getClientRects()[0].width;
            tempCursorClickLocation.first.y =
              offsetY / imgElement!.getClientRects()[0].height;
          } else {
            tempCursorClickLocation.second.x =
              offsetX / imgElement!.getClientRects()[0].width;
            tempCursorClickLocation.second.y =
              offsetY / imgElement!.getClientRects()[0].height;

            if (props.lines) {
              props.setLines([...props.lines, tempCursorClickLocation]);
              SetLinesLS([...props.lines, tempCursorClickLocation]);
            } else {
              props.setLines([tempCursorClickLocation]);
              SetLinesLS([tempCursorClickLocation]);
            }

            setCurrentLine(tempCursorClickLocation);

            setCursorClickLocation({
              first: { x: -1, y: -1 },
              second: { x: -1, y: -1 },
            });

            setSideBarMode("create");
            setShowSideBar(true);
          }
        } else {
          props.setInformativeText("Please select a material to draw!");

          setTimeout(() => {
            props.setInformativeText(null);
          }, 2500);
        }
      } else if (props.cursorMode === "select") {
        tempCursorClickLocation.first.x = offsetX;
        tempCursorClickLocation.first.y = offsetY;

        let selected = DetectMemberClick(
          tempCursorClickLocation.first,
          props.lines,
          imgElement!.getClientRects()[0].width,
          imgElement!.getClientRects()[0].height
        );

        if (selected >= 0 && props.members) {
          setSelectedMember(props.members[selected]);
          setSideBarMode("select");
          setShowSideBar(true);
        }
      } else if (props.cursorMode === "erase") {
        tempCursorClickLocation.first.x = offsetX;
        tempCursorClickLocation.first.y = offsetY;

        let selected = DetectMemberClick(
          tempCursorClickLocation.first,
          props.lines,
          imgElement!.getClientRects()[0].width,
          imgElement!.getClientRects()[0].height
        );

        if (selected >= 0 && props.members) {
          DeleteMember(
            selected,
            props.members,
            props.setMembers,
            props.lines,
            props.setLines
          );
          setCursorClickLocation({
            first: { x: -1, y: -1 },
            second: { x: -1, y: -1 },
          });
        }
      } else {
        if (
          tempCursorClickLocation.first.x < 0 ||
          tempCursorClickLocation.first.y < 0
        ) {
          tempCursorClickLocation.first.x =
            offsetX / imgElement!.getClientRects()[0].width;
          tempCursorClickLocation.first.y =
            offsetY / imgElement!.getClientRects()[0].height;
        } else {
          tempCursorClickLocation.second.x =
            offsetX / imgElement!.getClientRects()[0].width;
          tempCursorClickLocation.second.y =
            offsetY / imgElement!.getClientRects()[0].height;

          setCurrentLine(tempCursorClickLocation);
          setShowRefLengthInput(true);

          setCursorClickLocation({
            first: { x: -1, y: -1 },
            second: { x: -1, y: -1 },
          });
        }
      }
    }
  };

  // For rendering lines first time
  setTimeout(() => {
    setRender(1)
  }, 10)

  return (
    <React.Fragment>
      {showSideBar &&
        (props.cursorMode === "pencil" ? (
          <SideBar
            selectedMaterial={selectedMaterial}
            selectedMember={selectedMember}
            currentLine={currentLine}
            members={props.members}
            setMembers={props.setMembers}
            mode={sideBarMode}
            setShowSideBar={setShowSideBar}
          />
        ) : (
          <SideBar
            selectedMember={selectedMember}
            currentLine={selectedMember?.points ? selectedMember.points : null}
            members={props.members}
            setMembers={props.setMembers}
            mode={sideBarMode}
            setShowSideBar={setShowSideBar}
          />
        ))}
      {materials && !showSideBar && (
        <MaterialSideBar
          materials={materials}
          selectedMaterial={selectedMaterial}
          setSelectedMaterial={setSelectedMaterial}
        />
      )}
      {showRefLengthInput && (
        <RefLength
          setView={props.setView}
          setShowRefLengthInput={setShowRefLengthInput}
          currentLine={currentLine}
          members={props.members}
          setMembers={props.setMembers}
        />
      )}
      <div className="workspace">
        <svg
          id="workspace-drawing"
          className={`cursor-${props.cursorMode}`}
          onClick={(e) => {
            SvgOnClickHandler(e);
          }}
        >
          <rect className="svg-rect" x="0" y="0" width="100%" height="100%" />
          {linesOnDrawing}
        </svg>
        <img id="back-image" src={image!} alt="" />
      </div>
    </React.Fragment>
  );
};

export default Workspace;
