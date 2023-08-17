import { Nav, Navbar, Container } from "react-bootstrap";

import "./Navigation.scss";

const Navigation: React.FC<{
  showMaterialList: boolean;
  setShowMaterialList: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props: {
  showMaterialList: boolean;
  setShowMaterialList: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link
            className="mx-4"
            onClick={() => {
              props.setShowMaterialList(!props.showMaterialList);
            }}
          >
            <i className="fa-solid fa-file-pen"></i> Edit Material List
          </Nav.Link>
          <Nav.Link>
            <i className="fa-solid fa-pencil"></i> Pencil
          </Nav.Link>
          <Nav.Link>
            <i className="fa-solid fa-eraser"></i> Eraser
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link>
            <i className="fa-solid fa-floppy-disk"></i> Save
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
