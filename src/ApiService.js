import Axios from 'axios';

//create axios instance
let instanceAxios = Axios.create({
  baseURL: 'https://api.github.com',
});

//specify endpoint API function
export default {
  //get list of user repo
  getUserRepos(username) {
    return instanceAxios.get(`/users/${username}/repos`);
  },
  getProjectReadme(username, project) {
    // get project readme using custom header
    return instanceAxios.get(`/repos/${username}/${project}/readme`, {
      headers: { 'Accept': 'application/vnd.github.VERSION.html' },
    });
  },
};