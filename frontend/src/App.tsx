import React, { useEffect, useState } from "react";

import Navigation from "./components/Navigation/Navigation";
import MaterialList from "./components/MaterialList/MaterialList";
import { Member } from "./utils/Member";
import { Line } from "./utils/Member";
import { CursorMode } from "./components/Navigation/Navigation";
import Members from "./components/Members/Members";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import Workspace from "./components/Workspace/Workspace";
import InformativeText, {
  InfoxText,
} from "./components/InformativeText/InformativeText";

import { Material } from "./utils/Material";

export type View = "members" | "workspace" | "materialList"

const App: React.FC = () => {
  const [view, setView] = useState<View>(
    "materialList"
  );

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [cursorMode, setCursorMode] = useState<CursorMode>(
    "pencil"
  );

  const [materialList, setMaterialList] = useState<Material[] | null>(null);

  const [members, setMembers] = useState<Member[] | null>(null);
  const [lines, setLines] = useState<Line[] | null>(null);

  const [informativeText, setInformativeText] = useState<InfoxText>(null);

  useEffect(() => {
    let materialsLS = localStorage.getItem("materials");

    if (materialsLS) {
      setMaterialList(JSON.parse(materialsLS));
    }
  }, []);

  return (
    <React.Fragment>
      <Navigation
        view={view}
        setView={setView}
        setCursorMode={setCursorMode}
        cursorMode={cursorMode}
        //@ts-ignore
        setInformativeText={setInformativeText}
      />
      {view === "materialList" ? (
        <MaterialList
          materialList={materialList}
          setMaterialList={setMaterialList}
        />
      ) : view === "members" ? (
        <Members
          members={members}
          setMembers={setMembers}
          lines={lines}
          setLines={setLines}
        />
      ) : imageFile ? (
        <React.Fragment>
          <InformativeText informativeText={informativeText} />
          <Workspace
            view={view}
            setView={setView}
            imageFile={imageFile}
            cursorMode={cursorMode}
            members={members}
            setMembers={setMembers}
            lines={lines}
            setLines={setLines}
            setInformativeText={setInformativeText}
          />
        </React.Fragment>
      ) : (
        <ImageUpload setImage={setImageFile} />
      )}
    </React.Fragment>
  );
};

export default App;
