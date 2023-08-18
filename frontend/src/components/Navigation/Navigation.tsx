import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";

import "./Navigation.scss";

const Navigation: React.FC<{
  view: "workspace" | "materialList" | "members";
  setView: React.Dispatch<
    React.SetStateAction<"workspace" | "materialList" | "members">
  >;
  cursorMode: "select" | "pencil" | "erase";
  setCursorMode: React.Dispatch<
    React.SetStateAction<"select" | "pencil" | "erase">
  >;
  setInformativeText: React.Dispatch<
    React.SetStateAction<
      | "Select a member to see its properties."
      | "Click to set first point."
      | "Click to set second point"
      | "Click on a member to delete it."
      | null
    >
  >;
}> = (props: {
  view: "workspace" | "materialList" | "members";
  setView: React.Dispatch<
    React.SetStateAction<"workspace" | "materialList" | "members">
  >;
  cursorMode: "select" | "pencil" | "erase";
  setCursorMode: React.Dispatch<
    React.SetStateAction<"select" | "pencil" | "erase">
  >;
  setInformativeText: React.Dispatch<
    React.SetStateAction<
      | "Select a member to see its properties."
      | "Click to set first point."
      | "Click to set second point"
      | "Click on a member to delete it."
      | null
    >
  >;
}) => {
  return (
    <Navbar className="bg-body-tertiary text-center">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="me-auto">
          {props.view === "workspace" && (
            <React.Fragment>
              <Nav.Link
                className={props.cursorMode === "select" ? "text-success" : ""}
                onClick={(e) => {
                  props.setCursorMode("select");
                  props.setInformativeText('Select a member to see its properties.')
                  setTimeout(() => {
                    props.setInformativeText(null)
                  }, 2500)
                }}
              >
                <i className="fa-solid fa-arrow-pointer"></i>Select
              </Nav.Link>
              <Nav.Link
                className={props.cursorMode === "pencil" ? "text-success" : ""}
                onClick={() => {
                  props.setCursorMode("pencil");
                  props.setInformativeText('Click to set first point.')
                  setTimeout(() => {
                    props.setInformativeText(null)
                  }, 2500)
                }}
              >
                <i className="fa-solid fa-pencil"></i> Pencil
              </Nav.Link>
              <Nav.Link
                className={props.cursorMode === "erase" ? "text-success" : ""}
                onClick={() => {
                  props.setCursorMode("erase");
                  props.setInformativeText('Click on a member to delete it.')
                  setTimeout(() => {
                    props.setInformativeText(null)
                  }, 2500)
                }}
              >
                <i className="fa-solid fa-eraser"></i> Eraser
              </Nav.Link>
            </React.Fragment>
          )}
        </Nav>
        <Nav>
          <Nav.Link
            className="mx-4"
            onClick={() => {
              props.setView("materialList");
            }}
          >
            <i className="fa-solid fa-file-pen"></i> Material List
          </Nav.Link>
          <Nav.Link
            className="mx-4"
            onClick={() => {
              props.setView("members");
            }}
          >
            <i className="fa-solid fa-file-pen"></i> Members
          </Nav.Link>
          <Nav.Link
            className="mx-4"
            onClick={() => {
              props.setView("workspace");
            }}
          >
            <i className="fa-solid fa-file-pen"></i> Workspace
          </Nav.Link>
          <Nav.Link>
            <i className="fa-solid fa-floppy-disk"></i> Save
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
