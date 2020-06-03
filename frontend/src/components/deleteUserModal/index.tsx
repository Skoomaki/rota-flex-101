import 'toastr/build/toastr.min.css';

import Button from '@material-ui/core/Button';
import Clear from '@material-ui/icons/Clear';
import React from 'react';
import { useDispatch } from 'react-redux';
import toastr from 'toastr';

import { deleteEmployee } from '../../features/employeeSlice';
import { Employee } from '../../model';
import { useAuth0 } from '../../react-auth0-spa';
import deleteUserModalStyle from './deleteUserModal.module.scss';

interface Props {
  employee: Employee;
  closeModalFunction: () => void;
}

const DeleteModal = ({ employee, closeModalFunction }: Props) => {
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();
  const deleteUser = ({ id, firstName, surname }: Employee) => async () => {
    const accessToken = await getTokenSilently();
    dispatch(deleteEmployee(id.toString(), accessToken));
    closeModalFunction();
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
          onClick={closeModalFunction}>
          <Clear />
        </button>
      </div>
      <hr />
      <span>
        Are you sure you want to delete {employee.firstName} {employee.surname}?
      </span>
      <div className={deleteUserModalStyle.buttons}>
        <Button variant="contained" onClick={closeModalFunction}>
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
