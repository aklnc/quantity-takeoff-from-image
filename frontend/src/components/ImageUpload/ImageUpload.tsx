import { Container, Form } from "react-bootstrap";
import "./ImageUpload.scss";

const ImageUpload: React.FC<{
    setImage: React.Dispatch<React.SetStateAction<File | null>>
}> = (props: {
    setImage: React.Dispatch<React.SetStateAction<File | null>>
}) => {

    const FileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file && file.type.substr(0, 5) === "image") {
          props.setImage(file);
          console.log(file);
          
        } else {
            props.setImage(null);
        }
    }

  return (
    <Container>
      <div className="m-5">
        <Form.Group>
          <Form.Label>Select image</Form.Label>
          <input  className="form-control" type="file" onChange={(e) => {FileChangeHandler(e)}} accept="image/*"/>
        </Form.Group>
      </div>
    </Container>
  );
};

export default ImageUpload;
