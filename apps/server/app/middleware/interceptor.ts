import * as Koa from 'koa'
import Auth from '../utils/auth'

export = async (ctx: Koa.Context, next: Function) => {
  // 拦截器
  const allowedOrigins = [
    'https://blog.spiritree.me',
    'https://admin.spiritree.me',
    'file://'
  ]
  const origin = ctx.request.headers.origin || ''
  if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
    ctx.set('Access-Control-Allow-Origin', origin)
  }

  ctx.set({
    'Access-Control-Allow-Headers':
      'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
    'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '1728000',
    'Content-Type': 'application/json;charset=utf-8',
    'X-Powered-By': 'Koa'
  })

  // OPTIONS
  if (ctx.request.method == 'OPTIONS') {
    ctx.status = 200
    return false
  }

  // 如果是生产环境，需要验证用户来源渠道，防止非正常请求
  if (Object.is(process.env.NODE_ENV, 'production')) {
    const { origin, referer } = ctx.request.headers
    if (origin !== 'file://') {
      const originVerified =
        (!origin || origin.includes('')) && (!referer || referer.includes(''))
      if (!originVerified) {
        ctx.throw(403, { code: 0, message: '身份验证失败！' })
        return false
      }
    }
  }

  // 排除auth的post请求 && 评论的post请求 && like请求 && hero post
  const isArticleLike =
    Object.is(ctx.request.url, '/api/article/like') &&
    Object.is(ctx.request.method, 'POST')
  const isCommentLike =
    Object.is(ctx.request.url, '/api/comment/like') &&
    Object.is(ctx.request.method, 'POST')
  const isLogin =
    Object.is(ctx.request.url, '/api/auth/login') &&
    Object.is(ctx.request.method, 'POST')
  const isHero =
    Object.is(ctx.request.url, '/api/hero') &&
    Object.is(ctx.request.method, 'POST')
  const isPostComment =
    Object.is(ctx.request.url, '/api/comment') &&
    Object.is(ctx.request.method, 'POST')
  if (isArticleLike || isCommentLike || isPostComment || isLogin || isHero) {
    await next()
    return false
  }

  // 拦截所有非管理员的非get请求
  if (
    !Auth.authIsVerified(ctx.request) &&
    !Object.is(ctx.request.method, 'GET')
  ) {
    ctx.status = 401
    ctx.body = {
      code: -2,
      message: '身份验证失败'
    }
    return false
  }

  await next()
}
