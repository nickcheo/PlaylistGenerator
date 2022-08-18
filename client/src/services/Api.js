import axios from 'axios';

// for hitting back end points
export default () =>
{
    return axios.create({
        baseURL: process.env.NODE_ENV != 'development'  ? 'https://variefy.herokuapp.com/': 'http://localhost:2000/'
    })
}