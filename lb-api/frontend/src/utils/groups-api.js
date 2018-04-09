import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export {getUserData, getGroupData};

function getUserData(){
  const url= `${BASE_URL}/api/user_infos`;            // Get list of users
  return axios.get(url).then(response => response.data);
}

function getGroupData(){
  const url= `${BASE_URL}/api/projgroups`;            // Get list og groups
  return axios.get(url).then(response => response.data);
}
