import {get, post} from './help'

const getTopic = get('/api/v1/topics')
const getTopicDetail = get('/api/v1/topic')
const loginAccessToken = post('/api/v1/accesstoken')
const getUserInfo = get('/api/v1/user')
const createTopics = post('/api/v1/topics')
const createTopic = post('/api/v1/topic')
const Ups = post('/api/v1/reply')
const getMessage = get('/api/v1/messages')
const markOneMessage = post('/api/v1/message/mark_one')

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