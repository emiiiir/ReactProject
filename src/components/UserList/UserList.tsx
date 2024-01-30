import React, { Children, FC, useEffect, useRef, useState } from 'react';
import './UserList.scss';
import apiService from '../../services/api.service';
import usersModel from '../../models/userModel';
import Loadder from '../loadder/loadder';
import UserDetails from '../userDetails/userDetails';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyModal from '../MyModal/MyModal';

interface UserListProps { }

const UserList: FC<UserListProps> = () => {
  const filteredUsersRef = useRef<any>()
  let [userList, setUserList] = useState<usersModel[]>([])
  const [display, setDisplay] = useState<usersModel[]>([])
  const [isLoadding, setisLoadding] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);




  useEffect(() => {
    loadItems();
  }, []);


  const loadItems = () => {
    setisLoadding(true)
    apiService.getListApi().then((res) => {

      userList = res.data.map((user: any) => {
        return new usersModel(user.id, user.name, user.username, user.email);

      })
      setUserList([...userList])
      setDisplay([...userList])
    }).finally(() => {
      setisLoadding(false)
    })
  };

  const fillterUsers = () => {
    const SerchValue = filteredUsersRef.current?.value.toLowerCase() || '';
    const filteredList = userList.filter(user => user.Name.toLowerCase().includes(SerchValue));
    setDisplay([...filteredList]);
  }

  const addNewUser = (user: usersModel) => {
    userList.push(user);
    setUserList([...userList])
    setDisplay([...userList])

  }

  const confirmDelete = async () => {
    if (selectedUserId != null) {
      try {
        await apiService.deleteUser(selectedUserId).then(() => {
          setUserList(prevList => prevList.filter(user => user.Id !== selectedUserId));
          setDisplay(prevList => prevList.filter(user => user.Id !== selectedUserId));
          setShowModal(false);
        })

      
      } catch (error) {
        alert('Error deleting user with id: ' + selectedUserId)

      }
    }
  }

  const canceleDelete = () => {
    setShowModal(false)

  }

  const deleteUser = (userId: string) => {
    setShowModal(true)
    setSelectedUserId(userId)
  }




  return <div className="NewUserForTable" >

    <div className='row'>
      <div className='col-md-6 mr-5 form'>
        <UserDetails funcParentAdd={addNewUser} ></UserDetails>
      </div>
      <div className='col-md-6 ml-5'>
        {isLoadding ? <Loadder ></Loadder> : ''}
        <label> חפש משתמש </label>
        <input onChange={fillterUsers} type="text" ref={filteredUsersRef} className="form-control"></input>





        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">User name</th>
              <th scope="col">Email</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {display.map((user, index) => (
              <tr key={user.Id}>
                <th>{user.Id}</th>
                <td>{user.Name}</td>
                <td>{user.UserName}</td>
                <td>{user.Email}</td>
                <td><button onClick={() => deleteUser(user.Id)} className='btn btn-info '>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {showModal ?
          <MyModal
            title='are you sure you want to delete this user?'
            onClose={canceleDelete}
            onConfirm={confirmDelete}>
            {selectedUserId && <p>Deleting user with ID: {selectedUserId}</p>}
          </MyModal> : null}

      </div>
    </div>
  </div>



};




export default UserList;
