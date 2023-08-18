import { Container, Table } from "react-bootstrap";

import { Member } from "../../utils/Member";

import "./Members.scss";

const Members: React.FC<{
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
}> = (props: {
  members: Member[] | null;
  setMembers: React.Dispatch<React.SetStateAction<Member[] | null>>;
}) => {
  const MEMBERS: Member[] = [
    {
      pose: "AA01",
      materialId: "mid01",
      material: "L40X40X4",
      quantity: 5,
      quality: "S275JR",
      length: 800,
      unitWeight: 4.55,
      pieceWeight: 4.64,
      totalWeight: 23.2,
    },
    {
      pose: "AA01",
      materialId: "mid02",
      material: "L40X40X4",
      quantity: 5,
      quality: "S275JR",
      length: 800,
      unitWeight: 4.55,
      pieceWeight: 4.64,
      totalWeight: 23.2,
    },
    {
      pose: "AA01",
      materialId: "mid03",
      material: "L40X40X4",
      quantity: 5,
      quality: "S275JR",
      length: 800,
      unitWeight: 4.55,
      pieceWeight: 4.64,
      totalWeight: 23.2,
    },
  ];

  return (
    <Container className="my-3">
      <h4>Members</h4>
      <Table striped bordered hover size="sm" className="text-center">
        <thead>
          <tr>
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
          {MEMBERS.map((member) => (
            <tr key={member.materialId}>
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
    </Container>
  );
};

export default Members;
