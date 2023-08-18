import "./InformativeText.scss";

const InformativeText: React.FC<{
  informativeText:
    | "Select a member to see its properties."
    | "Click to set first point."
    | "Click to set second point"
    | "Click on a member to delete it."
    | null
}> = (props: {
  informativeText:
    | "Select a member to see its properties."
    | "Click to set first point."
    | "Click to set second point"
    | "Click on a member to delete it."
    | null
}) => {
  return (props.informativeText) ? (<p id="informative-text">{props.informativeText}</p>) : <div></div>
};

export default InformativeText;
