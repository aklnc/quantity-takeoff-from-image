import React, { useEffect, useState } from "react";

import Navigation from "./components/Navigation/Navigation";
import MaterialList from "./components/MaterialList/MaterialList";
import { Member } from "./utils/Member";
import Members from "./components/Members/Members";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import Workspace from "./components/Workspace/Workspace";
import InformativeText from "./components/InformativeText/InformativeText";

import { Material } from "./utils/Material";

const App: React.FC = () => {
  const [view, setView] = useState<"workspace" | "materialList" | "members">(
    "materialList"
  );

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [cursorMode, setCursorMode] = useState<"select" | "pencil" | "erase">(
    "pencil"
  );

  const [materialList, setMaterialList] = useState<Material[] | null>(null);

  const [members, setMembers] = useState<Member[] | null>(null);

  const [informativeText, setInformativeText] = useState<
    | "Select a member to see its properties."
    | "Click to set first point."
    | "Click to set second point"
    | "Click on a member to delete it."
    | null
  >(null);

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
        setInformativeText = {setInformativeText}
      />
      {view === "materialList" ? (
        <MaterialList
          materialList={materialList}
          setMaterialList={setMaterialList}
        />
      ) : view === "members" ? (
        <Members members={members} setMembers={setMembers} />
      ) : imageFile ? (
        <React.Fragment>
          <InformativeText informativeText={informativeText} />
          <Workspace
            imageFile={imageFile}
            cursorMode={cursorMode}
            setMembers={setMembers}
          />
        </React.Fragment>
      ) : (
        <ImageUpload setImage={setImageFile} />
      )}
    </React.Fragment>
  );
};

export default App;
