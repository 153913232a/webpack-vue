import {get,get_II, post} from './help'

const getTopic = get('/topics')
const getTopicDetail = get_II('/topic')
const loginAccessToken = post('/accesstoken')
const getUserInfo = get_II('/user')
const createTopics = post('/topics')
const createTopic = post('/topic')
const Ups = post('/reply')
const getMessage = get_II('/messages')
const markOneMessage = post('/message/mark_one')

export {
  getTopic,
  getTopicDetail,
  loginAccessToken,
  getUserInfo,
  createTopics,
  createTopic,
  Ups,
  getMessage,
  markOneMessage
}