/**
 * 商品列表数据接口
 */

// 列表数据属性及类型
export interface goodsListInt {
  userId: number, // 用户 id
  id: number, // 商品 id
  title: string, // 商品名称
  introduce: string // 商品介绍
}

// 搜索框数据属性及类型
interface selectDataInt {
  title: string, // 标题
  introduce: string, // 详情
  page: number, // 页码
  count: number, // 总条数
  pageSize: number, // 默认每页显示的条数
}

// 数据类
export class InitData {
  // 搜索框数据初始化
  selectData: selectDataInt = {
    title: "",
    introduce: "",
    page: 1,
    count: 0,
    pageSize: 10
  }
  // 商品列表数据初始化
  list: goodsListInt[] = [] // 展示的内容数据,接收后台返回的数据
}
