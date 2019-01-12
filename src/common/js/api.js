import {get,get_II, post} from './help'

const getTopic = get('/topics')
const getTopicDetail = get_II('/topic')
const loginAccessToken = post('/accesstoken')
const getUserInfo = get_II('/user')
const createTopics = post('/topics')
const createTopic = post('/topic')
const Ups = post('/reply')

export {
  getTopic,
  getTopicDetail,
  loginAccessToken,
  getUserInfo,
  createTopics,
  createTopic,
  Ups
}