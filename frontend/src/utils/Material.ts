import { SetMaterialsLS } from "./LocalStorage";

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
    SetMaterialsLS(tempMaterialList)
  } else {
    setMaterialList([material]);
    SetMaterialsLS([material])
  }

  return;
};

export const DeleteMaterial = (
  index: number,
  materialList: Material[] | null,
  setMaterialList: React.Dispatch<React.SetStateAction<Material[] | null>>
): void => {
  if (materialList) {
    let tempMaterialList = [...materialList];

    tempMaterialList.splice(index, 1);

    setMaterialList(tempMaterialList);
    SetMaterialsLS(tempMaterialList)
  }
  return
};
