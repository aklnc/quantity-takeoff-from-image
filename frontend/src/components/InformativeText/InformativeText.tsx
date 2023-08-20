import "./InformativeText.scss";

export type InfoxText =
  | "Select a member to see its properties."
  | "Click to set first point."
  | "Click to set second point"
  | "Click on a member to delete it."
  | "Please select a material to draw!"
  | "Draw the reference line to detect members' length."
  | null;

const InformativeText: React.FC<{
  informativeText: InfoxText;
}> = (props: { informativeText: InfoxText }) => {
  return props.informativeText ? (
    <p id="informative-text">{props.informativeText}</p>
  ) : (
    <div></div>
  );
};

export default InformativeText;
