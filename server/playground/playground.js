var axios = require('axios');

var mainAddress = 'https://schoolexercise.herokuapp.com';

 var url = `${mainAddress}/users`;
 console.log('loading user please wait...');
 axios.post(url, {email: "paul12343446@gmail.com", password: "123456", name:"paul"})
 .then((response) => {
    var accessToken = response.headers['x-auth'];
    console.log('got access token ' + accessToken);
    var url = `${mainAddress}/students`;
    console.log('loading student please wait...');
    return axios.post(url, {email: "ringo33663363@gmail.com", first_name: "ringo", last_name:"starr"}, {headers: {"x-auth":accessToken}})
 })
 .then((result) => {
   console.log(result.data);
 })
 .catch((e) => {
   console.log('failed, should not get here, probably you sent the same same email twice ');
   console.log(e.message);
 })
