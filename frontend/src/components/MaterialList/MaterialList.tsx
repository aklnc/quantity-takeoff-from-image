import { useState } from "react";
import { v4 } from "uuid";
import { Container, Table, Form, Button } from "react-bootstrap";

import { Material, AddMaterial, DeleteMaterial } from "../../utils/Material";

import './MaterialList.scss'

const MaterialList: React.FC<{
  materialList: Material[] | null;
  setMaterialList: React.Dispatch<React.SetStateAction<Material[] | null>>;
}> = (props: {
  materialList: Material[] | null;
  setMaterialList: React.Dispatch<React.SetStateAction<Material[] | null>>;
}) => {
  const [materialInp, setMaterialInp] = useState<string | null>(null);
  const [qualityInp, setQualityInp] = useState<string | null>(null);
  const [unitWeightInp, setUnitWeightInp] = useState<string | null>(null);

  return (
    <Container className="my-3 material-list">
      <h4>Material List</h4>
      <Table striped bordered hover size="sm" className="text-center">
        <thead>
          <tr>
            <th></th>
            <th>Material</th>
            <th>Quality</th>
            <th>Unit Weight (kg/m)</th>
          </tr>
        </thead>
        <tbody>
          {props.materialList &&
            props.materialList.map((material, ind) => (
              <tr key={material.materialId}>
                <td
                  className="text-danger delete-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    DeleteMaterial(
                      ind,
                      props.materialList,
                      props.setMaterialList
                    );
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </td>
                <td>{material.material}</td>
                <td>{material.quality}</td>
                <td>{material.unitWeight}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="create-material-input my-5">
        <h5>Add Material</h5>
        <Form className="row">
          <Form.Group className="mb-3 col-3">
            <Form.Label>Material</Form.Label>
            <Form.Control
              type="text"
              placeholder="L40X40X5 ??"
              value={materialInp ? materialInp : ""}
              onChange={(e) => {
                setMaterialInp(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-3">
            <Form.Label>Quality</Form.Label>
            <Form.Control
              type="text"
              placeholder="S235JR ??"
              value={qualityInp ? qualityInp : ""}
              onChange={(e) => {
                setQualityInp(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-3">
            <Form.Label>Unit Weight</Form.Label>
            <Form.Control
              type="number"
              placeholder="4.45 kg/m ??"
              value={unitWeightInp ? unitWeightInp : ""}
              onChange={(e) => {
                setUnitWeightInp(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-3">
            <Form.Label style={{ display: "block", color: "#fff" }}>
              _
            </Form.Label>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                AddMaterial(
                  {
                    materialId: v4(),
                    material: materialInp ? materialInp : "",
                    quality: qualityInp ? qualityInp : "",
                    unitWeight: unitWeightInp ? +unitWeightInp : 0,
                  },
                  props.materialList,
                  props.setMaterialList
                );
              }}
            >
              Save
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default MaterialList;
