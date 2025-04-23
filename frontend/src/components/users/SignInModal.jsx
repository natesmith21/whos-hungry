import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function SignInModal({modal, toggle}) {

  return ( 
  <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            Sign In to Save a Recipe! (Link) Don't have an Account? Create one (link)
        </ModalBody>
    <ModalFooter>
    <Button color="primary" onClick={toggle}>
        Do Something
    </Button>{' '}
    <Button color="secondary" onClick={toggle}>
        Cancel
    </Button>
    </ModalFooter>
    </Modal>
  )
}

export default SignInModal