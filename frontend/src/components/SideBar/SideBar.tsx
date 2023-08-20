import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { Member, AddMember } from "../../utils/Member";
import { Line } from "../../utils/Member";
import { Material } from "../../utils/Material";

import "./SideBar.scss";

export type SideBarMode = "select" | "create";

const SideBar: React.FC<{
  mode: SideBarMode;
  currentLine: Line | null;
  selectedMaterial?: Material | null;
  selectedMember: Member | null;
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props: {
  mode: SideBarMode;
  currentLine: Line | null;
  selectedMaterial?: Material | null;
  selectedMember: Member | null;
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [pose, setPose] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);

  const AddMemberHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    AddMember(props.members, props.setMembers, {
      pose: pose ? pose : "",
      quantity: quantity ? quantity : 0,
      materialId: props.selectedMaterial
        ? props.selectedMaterial?.materialId
        : "",
      material: props.selectedMaterial ? props.selectedMaterial.material : "",
      quality: props.selectedMaterial ? props.selectedMaterial.quality : "",
      points: props.currentLine
        ? props.currentLine
        : { first: { x: -1, y: -1 }, second: { x: -1, y: -1 } },
      unitWeight: props.selectedMaterial
        ? props.selectedMaterial.unitWeight
        : 0,
    });

    props.setShowSideBar(false);
  };

  return (
    <div
      className="side-bar d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary"
      style={{ width: "280px" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <span className="fs-5">Member Properties</span>
      </a>
      <hr />
      {props.mode === "create" ? (
        <React.Fragment>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Pose No</Form.Label>
              <Form.Control
                type="text"
                placeholder="AA1015??"
                value={pose ? pose : ""}
                onChange={(e) => {
                  setPose(e.target.value);
                }}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="156??"
                value={quantity ? quantity : ""}
                onChange={(e) => {
                  setQuantity(parseFloat(e.target.value));
                }}
              />
            </Form.Group>
          </Form>
          <hr />
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Material</Form.Label>
              <Form.Control
                type="text"
                disabled
                defaultValue={props.selectedMaterial?.material}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quality</Form.Label>
              <Form.Control
                type="text"
                disabled
                defaultValue={props.selectedMaterial?.quality}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit Weight</Form.Label>
              <Form.Control
                type="number"
                disabled
                defaultValue={props.selectedMaterial?.unitWeight}
              />
            </Form.Group>
            <Button
              onClick={(e) => {
                AddMemberHandler(e);
              }}
            >
              Save Member
            </Button>
          </Form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Form>
            {props.selectedMember && (
              <React.Fragment>
                <Form.Group className="mb-3">
                  <Form.Label>Pose No</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={props.selectedMember.pose}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={props.selectedMember.quantity}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Material</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={props.selectedMember.material}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quality</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={props.selectedMember.quality}
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Unit Weight</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={props.selectedMember.unitWeight}
                    disabled
                  />
                </Form.Group>
              </React.Fragment>
            )}
          </Form>
        </React.Fragment>
      )}
    </div>
  );
};

export default SideBar;
