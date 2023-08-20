import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FindLengths } from "../../utils/Member";

import { View } from "../../App";
import { Line, Member } from "../../utils/Member";

import "./RefLength.scss";

const RefLength: React.FC<{
  setView: React.Dispatch<React.SetStateAction<View>>;
  setShowRefLengthInput: React.Dispatch<React.SetStateAction<boolean>>;
  currentLine: Line | null;
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
}> = (props: {
  setView: React.Dispatch<React.SetStateAction<View>>;
  setShowRefLengthInput: React.Dispatch<React.SetStateAction<boolean>>;
  currentLine: Line | null;
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
}) => {
  const [refLength, setRefLength] = useState<number | null>(null);
  const GetMaterialsLengthHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    FindLengths(props.currentLine, refLength, props.members, props.setMembers);
    props.setShowRefLengthInput(false);
    props.setView("members");
  };

  return (
    <div className="ref-length-inp-div text-center">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Reference Dimension</Form.Label>
          <Form.Control
            type="number"
            placeholder="1263 mm"
            value={refLength ? refLength : 0}
            onChange={(e) => {
              setRefLength(parseFloat(e.target.value));
            }}
          />
        </Form.Group>
        <Button
          variant="success"
          className="mx-3"
          onClick={(e) => {
            GetMaterialsLengthHandler(e);
          }}
        >
          Get Materials' Length
        </Button>
        <Button
          variant="danger"
          className="mx-3"
          onClick={() => {
            props.setShowRefLengthInput(false);
          }}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default RefLength;
