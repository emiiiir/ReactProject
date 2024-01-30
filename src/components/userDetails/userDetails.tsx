import React, { FC } from 'react';
import './userDetails.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import usersModel from '../../models/userModel';
import UserList from '../UserList/UserList';
interface UserDetailsProps {
  funcParentAdd: (modal: usersModel) => void

}

const UserDetails: FC<UserDetailsProps> = (props: UserDetailsProps) => {
  const myForm = useFormik({
    initialValues: new usersModel("", "", "", ""),
    onSubmit: (valueForm: usersModel) => {
      myForm.resetForm()
      let userToAdd = new usersModel(valueForm.Id, valueForm.Name, valueForm.UserName, valueForm.Email);
      props.funcParentAdd(userToAdd);


    },

    validationSchema: Yup.object().shape({
      Id: Yup.string().required('ID must have a number'),
      Name: Yup.string().required().min(2, 'Name must be at least 2 characters long'),
      UserName: Yup.string().required().min(2, 'Name must be at least 2 characters long'),
      Email: Yup.string().required().email('Invalid email address')

    })
  })

  return <div className="NewUserForTable">
    <form onSubmit={myForm.handleSubmit} className='col-sm-6 '>


      <div className='form-group mt-3'>
        <label>Id</label>
        <input name='Id' value={myForm.values.Id} onChange={myForm.handleChange} className={myForm.errors.Id ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.Id ? <small>{myForm.errors.Id}</small> : ''}
      </div>
      <div className='form-group mt-3'>
        <label>Name</label>
        <input name='Name' value={myForm.values.Name} onChange={myForm.handleChange} className={myForm.errors.Name ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.Name ? <small>{myForm.errors.Name}</small> : ''}
      </div>

      <div className='form-group mt-3'>
        <label>User-Name</label>
        <input name='UserName' value={myForm.values.UserName} onChange={myForm.handleChange} className={myForm.errors.UserName ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.UserName ? <small>{myForm.errors.UserName}</small> : ''}

      </div>

      <div className='form-group mt-3'>
        <label>Email</label>
        <input name='Email' value={myForm.values.Email} onChange={myForm.handleChange} className={myForm.errors.Email ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.Email ? <small>{myForm.errors.Email}</small> : ''}

      </div>


      <button type='submit' className='btn btn-info mt-5'>Add new User</button>

    </form>

  </div>

};

export default UserDetails;
