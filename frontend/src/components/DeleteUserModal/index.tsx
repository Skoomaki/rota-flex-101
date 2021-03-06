import 'toastr/build/toastr.min.css';

import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import React from 'react';
import { useDispatch } from 'react-redux';
import toastr from 'toastr';

import { Employee, ModalProps } from '../../model';
import { deleteEmployee } from '../../store/employeeSlice';
import deleteUserModalStyle from './deleteUserModal.module.scss';

export interface DeleteUserConfiguration {
  employee: Employee;
}

type Props = DeleteUserConfiguration & ModalProps;

const DeleteModal = ({ employee, onClose }: Props) => {
  const dispatch = useDispatch();
  const deleteUser = ({ id, firstName, surname }: Employee) => async () => {
    dispatch(deleteEmployee(id.toString()));
    onClose();
    new Audio('http://nooooooooooooooo.com/nooo.mp4').play();
    toastr.info(`User ${firstName} ${surname} deleted`);
  };

  return (
    <>
      <div className={deleteUserModalStyle.header}>
        <h4>Delete</h4>
        <button
          type="button"
          aria-label="closeButton"
          className={deleteUserModalStyle.xButton}
          onClick={onClose}>
          <Clear />
        </button>
      </div>
      <hr />
      <span>
        Are you sure you want to delete {employee.firstName} {employee.surname}?
      </span>
      <div className={deleteUserModalStyle.buttons}>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={deleteUser(employee)}>
          DELETE
        </Button>
      </div>
    </>
  );
};

export default DeleteModal;
