import ax from './axios'

// 获取用户信息
export function getAuth () {
  return ax.get('/auth')
          .then(res => res.data)
}

// 获取网站配置项
export function getOpt () {
  return ax.get('/option')
          .then(res => res.data)
}

// 英雄版列表
export function getHero (params) {
  return ax.get('/message', { params })
          .then(res => res.data)
}

// 增加英雄榜
export function postHero (data) {
  return ax.post('/message', {...data})
          .then(res => res.data)
}

// 标签列表
export function getTag (params) {
  return ax.get('/tag', { params })
          .then(res => res.data)
}

// 获取文章列表
export function getArts (params) {
  return ax.get('/article', { params })
          .then(res => res.data)
}

// 文章归档
export function getallArts (params) {
  return ax.get('/article/all')
          .then(res => res.data)
}

// 获取单个文章
export function getArt (data) {
  return ax.get(`/article/${data.id}`)
          .then(res => res.data)
}

// 文章点赞
export function likeArt (data) {
  return ax.post(`article/like`, data)
          .then(res => res.data)
}

// 获取评价
export function getComment (params) {
  return ax.get('/comment', { params })
          .then(res => res.data)
}

// 提交评价
export function postComment (data) {
  return ax.post('/comment', data)
          .then(res => res.data)
}

// 评论点赞
export function likeComment (data) {
  return ax.post(`/comment/like`, data)
          .then(res => res.data)
}
