import { Button, Container, Table } from "react-bootstrap";

import { CreateAndDownloadExcel } from "../../utils/XLSX";

import { Member, DeleteMember } from "../../utils/Member";
import { Line } from "../../utils/Member";

import "./Members.scss";

const Members: React.FC<{
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
  lines: Line[] | null;
  setLines: React.Dispatch<React.SetStateAction<Line[] | null>>;
}> = (props: {
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
  lines: Line[] | null;
  setLines: React.Dispatch<React.SetStateAction<Line[] | null>>;
}) => {
  return (
    <Container className="my-3 members">
      <h4>Members</h4>
      <Table striped bordered hover size="sm" className="text-center">
        <thead>
          <tr>
            <th></th>
            <th>Pose</th>
            <th>Material</th>
            <th>Quantity</th>
            <th>Quality</th>
            <th>Length</th>
            <th>Unit Weight</th>
            <th>Piece Weight</th>
            <th>Total Weight</th>
          </tr>
        </thead>
        <tbody>
          {props.members &&
            props.members.map((member, ind) => (
              <tr key={`member_${ind}`}>
                <td
                  className="text-danger delete-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    DeleteMember(
                      ind,
                      props.members,
                      props.setMembers,
                      props.lines,
                      props.setLines
                    );
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </td>
                <td>{member.pose}</td>
                <td>{member.material}</td>
                <td>{member.quantity}</td>
                <td>{member.quality}</td>
                <td>{member.length}</td>
                <td>{member.unitWeight}</td>
                <td>{member.pieceWeight}</td>
                <td>{member.totalWeight}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="text-center my-5">
        <Button
          variant="warning"
          onClick={(e) => {
            e.preventDefault();
            CreateAndDownloadExcel(props.members);
          }}
        >
          Export Table as XLSX
        </Button>
      </div>
    </Container>
  );
};

export default Members;
