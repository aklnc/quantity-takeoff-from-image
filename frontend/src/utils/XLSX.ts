import { utils, writeFile } from "xlsx";
import { Member } from "./Member";

export const CreateAndDownloadExcel = (members: Member[] | null) => {
  if (members) {
    let memberPropsforExcel: {
      pose: string;
      material: string;
      quantity: number;
      quality: string;
      length: number;
      unitWeight: number;
      pieceWeight: number;
      totalWeight: number;
    }[] = [];

    for (const member of members) {
      memberPropsforExcel.push({
        pose: member.pose,
        material: member.material,
        quantity: member.quantity,
        quality: member.quality,
        length: member.length ? member.length : 0,
        unitWeight: member.unitWeight,
        pieceWeight: member.pieceWeight ? member.pieceWeight : 0,
        totalWeight: member.totalWeight ? member.totalWeight : 0,
      });
    }

    const workSheet = utils.json_to_sheet(memberPropsforExcel);
    const workBook = utils.book_new();

    utils.book_append_sheet(workBook, workSheet, "Members");

    writeFile(workBook, "Image Quantity Takeoff Output.xlsx");
  }
};
