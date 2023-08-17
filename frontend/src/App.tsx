import React, { useState } from "react";

import Navigation from "./components/Navigation/Navigation";
import MaterialList from "./components/MaterialList/MaterialList";
import ImageUpload from "./components/ImageUpload/ImageUpload";
import Workspace from "./components/Workspace/Workspace";

const App: React.FC = () => {
  const [showMaterialList, setShowMaterialList] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <React.Fragment>
      <Navigation
        showMaterialList={showMaterialList}
        setShowMaterialList={setShowMaterialList}
      />
      {showMaterialList ? (
        <MaterialList />
      ) : imageFile ? (
        <Workspace imageFile={imageFile} />
      ) : (
        <ImageUpload setImage={setImageFile} />
      )}
    </React.Fragment>
  );
};

export default App;
