/**
 * 用户列表和角色列表类型接口定义
 */

// 用户列表类型接口
export interface UserListInt {
  id: number
  nickName: string
  role: RoleInt[]
  userName: string
}

// 角色类型接口
export interface RoleInt {
  role: number
  roleName: string
}

// 角色列表类型接口
interface RoleListInt {
  authority: number[]
  roleId: number
  roleName: string
}

// 搜索框数据类型接口
interface SelectDataInt {
  role: number
  nickName: string
}

// 对话框数据接口
interface ActiveInt {
  id: number
  nickName: string
  role: number[]
  userName: string
}

// 用户数据类
export class InitData {
  selectData: SelectDataInt = {
    role: 0,
    nickName: "",
  }
  userlist: UserListInt[] = []  // 接收用户信息的列表
  roleList: RoleListInt[] = []  // 接收角色信息的列表
  isShow = false // 对话框是否显示
  activeData: ActiveInt = { // 选中的对象
    id: 0,
    nickName: "",
    role: [],
    userName: ""
  }
}