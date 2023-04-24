export interface ListInt {
  name: string,
  roleId: number,
  roleList?: ListInt[],  // roleList ? 表示可选属性
  viewRole?: string
}

export class InitData {
  id: number
  authority: number[]
  constructor(id:number, authority: number[]) {
    this.id = id
    this.authority = authority
  }
  list: ListInt[] = []
  treeRef: any
}