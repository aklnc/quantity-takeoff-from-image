import { Form } from "react-bootstrap";

import "./SideBar.scss";

const SideBar: React.FC<{
  setMembers: React.Dispatch<
    React.SetStateAction<
      | {
          pose: string;
          materialId: string;
          material: string;
          quantity: number;
          quality: string;
          length?: number | undefined;
          unitWeight: number;
          pieceWeight?: number | undefined;
          totalWeight?: number | undefined;
        }[]
      | null
    >
  >;
}> = (props: {
  setMembers: React.Dispatch<
    React.SetStateAction<
      | {
          pose: string;
          materialId: string;
          material: string;
          quantity: number;
          quality: string;
          length?: number | undefined;
          unitWeight: number;
          pieceWeight?: number | undefined;
          totalWeight?: number | undefined;
        }[]
      | null
    >
  >;
}) => {
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
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Pose No</Form.Label>
          <Form.Control type="text" placeholder="AA1015??" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" placeholder="156??" />
        </Form.Group>
      </Form>
      <hr />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Material</Form.Label>
          <Form.Control type="text" disabled/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Quality</Form.Label>
          <Form.Control type="text" disabled/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Unit Weight</Form.Label>
          <Form.Control type="number" disabled/>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SideBar;
