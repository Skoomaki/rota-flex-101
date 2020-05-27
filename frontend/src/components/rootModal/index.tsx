import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '@material-ui/core/Modal';

import rootModalSyles from './rootModal.module.scss';

import DeleteUserModal from '../deleteUserModal';
import CreateUserModal from '../createUserModal';
import {
  ModalType,
  ModalState,
  selectModalDetails,
  hideModal,
} from '../../features/modalSlice';

type ModalHash = {
  [key in ModalType]: (arg0: any) => JSX.Element;
};

const MODAL_COMPONENTS: ModalHash = {
  DELETE_USER: DeleteUserModal,
  CREATE_USER: CreateUserModal,
};

const ModalRoot = () => {
  const dispatch = useDispatch();

  const { modalType, modalProps }: ModalState = useSelector(selectModalDetails);
  if (modalType === null) {
    return null;
  }

  const closeModalFunction = () => dispatch(hideModal());
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Modal open onClose={closeModalFunction}>
      <div className={rootModalSyles.content}>
        <SpecificModal
          {...modalProps}
          closeModalFunction={closeModalFunction}
        />
      </div>
    </Modal>
  );
};

export default ModalRoot;