/**
 * 对请求接口进行封装
 */
import service from '.'

interface loginData {
  username: string,
  password: string
}

// 登录
export function login(data: loginData) {
  return service({
    url: "/login",
    method: "post",
    data: {
      username: data.username,
      password: data.password
    }
  })
}

// 获取商品列表
export function getGoodsList() {
  return service({
    url: "/getGoodsList",
    method: "get"
  })
}

// 获取用户列表
export function getUserList() {
  return service({
    url: "/getUserList",
    method: "get"
  })
}

//  获取角色列表
export function getRoleList() {
  return service({
    url: "/getRoleList",
    method: "get"
  })
}