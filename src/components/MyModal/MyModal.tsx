import React, { FC,ReactNode ,useState} from 'react';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


interface MyModalProps {
  title:string
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
  
}

const MyModal: FC<MyModalProps> =(props:MyModalProps) => {
  
  
  const [show, setShow] = useState(true)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  return <div className="MyModal">
    <div className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        {props.children}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>Cancle</Button>
          <Button variant="primary" onClick={props.onConfirm}>Delete anyway</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  
}




export default MyModal;
