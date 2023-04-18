/**
 * 登录页面类型接口
 */
export interface LoginFormInt {
  username: string
  password: string
}

// 创建一个登录属性的类
export class LoginData {
  ruleForm: LoginFormInt = {
    username: "",
    password: ""
  }
}