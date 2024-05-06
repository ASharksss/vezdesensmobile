import React from 'react';
import './modal.css'

const ModalTemplate = ({activeModal, children, setActiveModal, touched=true}) => {
  return (
      <div className={activeModal ? 'modal activeModal' : 'modal'} onClick={() => touched ? setActiveModal(false) : {}}>
        <div onClick={e => e.stopPropagation()}
          className={activeModal ? 'modal_content activeModal' : 'modal_content'}>
          {children}
        </div>
      </div>
  );
};

export default ModalTemplate;