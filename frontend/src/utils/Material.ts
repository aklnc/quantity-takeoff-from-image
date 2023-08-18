export interface Material {
  materialId: string;
  material: string;
  quality: string;
  unitWeight: number;
}

export const AddMaterial = (
  material: Material,
  materialList: Material[] | null,
  setMaterialList: React.Dispatch<React.SetStateAction<Material[] | null>>
): void => {
  if (materialList) {
    let tempMaterialList: Material[] = [...materialList];

    tempMaterialList.push(material);

    setMaterialList(tempMaterialList);
    localStorage.setItem("materials", JSON.stringify(tempMaterialList))
  } else {
    setMaterialList([material]);
    localStorage.setItem("materials", JSON.stringify([material]))
  }
  console.log(material);

  return;
};

export const DeleteMaterial = (
  index: number,
  materialList: Material[] | null,
  setMaterialList: React.Dispatch<React.SetStateAction<Material[] | null>>
) => {
  if (materialList) {
    let tempMaterialList = [...materialList];

    tempMaterialList.splice(index, 1);

    setMaterialList(tempMaterialList);
    localStorage.setItem("materials", JSON.stringify(tempMaterialList))
  }
  return
};
