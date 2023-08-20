import { Material } from "./Material";
import { Line, Member } from "./Member";

export const GetMaterialsLS = (): Material[] | null => {
  let tempMaterials = localStorage.getItem("materials");

  if (tempMaterials) {
    return JSON.parse(tempMaterials);
  }

  return null;
};

export const SetMaterialsLS = (materialList: Material[]): void => {
  localStorage.setItem("materials", JSON.stringify(materialList));
};

export const GetLinesLS = (): Line[] | null => {
  let tempMaterials = localStorage.getItem("lines");

  if (tempMaterials) {
    return JSON.parse(tempMaterials);
  }

  return null;
};

export const SetLinesLS = (lines: Line[] | null): void => {
  lines && localStorage.setItem("lines", JSON.stringify(lines));
};

export const DeleteLinesLS = (): void => {
  localStorage.removeItem("lines");
};

export const GetMembersLS = (): Member[] | null => {
  let tempMembers = localStorage.getItem("members");

  if (tempMembers) {
    return JSON.parse(tempMembers);
  }

  return null;
};

export const SetMembersLS = (members: Member[] | null): void => {
    members && localStorage.setItem("members", JSON.stringify(members));
};

export const DeleteMembersLS = (): void => {
  localStorage.removeItem("members");
};
