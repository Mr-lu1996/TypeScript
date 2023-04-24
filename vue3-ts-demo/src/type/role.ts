/**
 * 角色列表数据类型定义
 */

// 角色列表
export interface ListInt {
  roleId: number
  roleName: string,
  authority: number[]
}

// 添加角色数据接口
interface AddRoleInt {
  roleName: string,
  authority: number[]
}

// 数据类
export class InitData {
  roleList: ListInt[] = [] // 接收角色列表数据
  isShow = false
  addRoleData: AddRoleInt = {
    roleName: "",
    authority: []
  }
}