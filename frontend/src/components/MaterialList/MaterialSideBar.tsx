import { Dropdown } from "react-bootstrap";
import { Material } from "../../utils/Material";

import "./MaterialSideBar.scss";

const MaterialSideBar: React.FC<{
  materials: Material[];
  selectedMaterial: Material | null;
  setSelectedMaterial: React.Dispatch<React.SetStateAction<Material | null>>;
}> = (props: {
  materials: Material[];
  selectedMaterial: Material | null;
  setSelectedMaterial: React.Dispatch<React.SetStateAction<Material | null>>;
}) => {
  return (
    <div className="material-side-bar">
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {props.selectedMaterial
            ? props.selectedMaterial.material +
              "-" +
              props.selectedMaterial.quality
            : "Select Material"}
        </Dropdown.Toggle>

        {props.materials && (
          <Dropdown.Menu>
            {props.materials.map((material, ind) => (
              <Dropdown.Item
                key={`mat_${ind}`}
                onClick={(e) => {
                  e.preventDefault();
                  props.setSelectedMaterial(material);
                }}
              >
                {material.material + "-" + material.quality}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};

export default MaterialSideBar;
