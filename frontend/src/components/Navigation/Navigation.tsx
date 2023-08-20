import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

import { View } from "../../App";
import { InfoxText } from "../InformativeText/InformativeText";

import "./Navigation.scss";

export type CursorMode = "select" | "pencil" | "erase" | "ruler";

const Navigation: React.FC<{
  view: View;
  setView: React.Dispatch<
    React.SetStateAction<View>
  >;
  cursorMode: CursorMode;
  setCursorMode: React.Dispatch<React.SetStateAction<CursorMode>>;
  setInformativeText: React.Dispatch<React.SetStateAction<InfoxText>>;
}> = (props: {
  view: View;
  setView: React.Dispatch<
    React.SetStateAction<View>
  >;
  cursorMode: CursorMode;
  setCursorMode: React.Dispatch<React.SetStateAction<CursorMode>>;
  setInformativeText: React.Dispatch<React.SetStateAction<InfoxText>>;
}) => {
  return (
    <Navbar className="navigation bg-body-tertiary text-center">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Nav className="me-auto">
          {props.view === "workspace" && (
            <React.Fragment>
              <Nav.Link
                className={props.cursorMode === "select" ? "text-success" : ""}
                onClick={(e) => {
                  props.setCursorMode("select");
                  props.setInformativeText(
                    "Select a member to see its properties."
                  );
                  setTimeout(() => {
                    props.setInformativeText(null);
                  }, 2500);
                }}
              >
                <i className="fa-solid fa-arrow-pointer"></i>Select
              </Nav.Link>
              <Nav.Link
                className={props.cursorMode === "pencil" ? "text-success" : ""}
                onClick={() => {
                  props.setCursorMode("pencil");
                  props.setInformativeText("Click to set first point.");
                  setTimeout(() => {
                    props.setInformativeText(null);
                  }, 2500);
                }}
              >
                <i className="fa-solid fa-pencil"></i> Pencil
              </Nav.Link>
              <Nav.Link
                className={props.cursorMode === "erase" ? "text-success" : ""}
                onClick={() => {
                  props.setCursorMode("erase");
                  props.setInformativeText("Click on a member to delete it.");
                  setTimeout(() => {
                    props.setInformativeText(null);
                  }, 2500);
                }}
              >
                <i className="fa-solid fa-eraser"></i> Eraser
              </Nav.Link>
              <Nav.Link
                className={
                  props.cursorMode === "ruler" ? "text-success" : ""
                }
                onClick={() => {
                  props.setCursorMode("ruler");
                  props.setInformativeText(
                    "Draw the reference line to detect members' length."
                  );
                  setTimeout(() => {
                    props.setInformativeText(null);
                  }, 2500);
                }}
              >
                <i className="fa-solid fa-ruler"></i> Ref. Length
              </Nav.Link>
            </React.Fragment>
          )}
        </Nav>
        <Nav>
          <NavDropdown title="View">
            <NavDropdown.Item
              onClick={() => {
                props.setView("materialList");
              }}
            >
              {" "}
              <i className="fa-solid fa-file-pen"></i> Material List
            </NavDropdown.Item>

            <NavDropdown.Item
              onClick={() => {
                props.setView("members");
              }}
            >
              <i className="fa-solid fa-file-pen"></i> Members
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                props.setView("workspace");
              }}
            >
              <i className="fa-solid fa-file-pen"></i> Workspace
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>
            <i className="fa-solid fa-floppy-disk"></i> Save
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
