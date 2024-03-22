import { useState, useEffect } from 'react';
import axios from 'axios';
import { host } from '../constant';

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const url=host+'/data/users'
  console.log('data fetching request received from front end');

  
//   fetchUsers();
  useEffect(() => {
    const fetchUsers = async () => {
        console.log('fecthuser inside hook called')
        try {
          const response = await axios.get(url);
          setUsers(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
    console.log('useeffect inside hook called')
    fetchUsers();
  },[url]);
  console.log('user data in hook',users,"errrrrrrrrrrrrr",error);
  return { users, loading, error };
};

export default useGetAllUsers;
