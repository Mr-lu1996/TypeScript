/**
 * 用户接口类型
 */

// 查询框数据类型接口
interface userSearchDataInt {
  username: string, // 用户名
  address: string, // 地址
  page: number, // 页码
  count: number, // 总条数
  pageSize: number, // 每页条数
}

// 用户列表数据类型接口
export interface userListInt {
  userId: number, // 用户Id
  username: string, // 用户名
  email: string, // 用户邮箱
  phone: string, // 手机号
  address: string, // 用户地址
}

// 用户数据类
export class userData {
  // 查询框数据
  userSearchData: userSearchDataInt = {
    username: "",
    address: "",
    page: 1,
    count: 0,
    pageSize: 10
  }
  // 用户列表数据
  userList: userListInt[] = []
}