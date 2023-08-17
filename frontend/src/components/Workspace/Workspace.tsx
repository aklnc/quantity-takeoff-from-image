import { useEffect, useState } from "react";

import "./Workspace.scss";

const Workspace: React.FC<{ imageFile: File }> = (props: {
  imageFile: File;
}) => {
  const [image, setImage] = useState<string | null>(null);

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

  const SvgOnClickHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    let svgElement = document.getElementById('workspace-drawing')
    let offsetX = e.pageX - svgElement!.getClientRects()[0].left
    let offsetY = e.pageY - svgElement!.getClientRects()[0].top

    console.log(offsetX, offsetY);
    

  }

  return (
    <div className="workspace">
      <svg id="workspace-drawing" onClick={(e) => {SvgOnClickHandler(e)}}>
        <rect x="0" y="0" width="100%" height="100%" />
      </svg>
      <img src={image!} alt="" />
    </div>
  );
};

export default Workspace;
