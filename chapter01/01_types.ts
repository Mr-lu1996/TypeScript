/*
 * @Author: 南山彭于晏
 * @Date: 2022-07-27 22:28:22
 * @LastEditTime: 2022-07-27 22:39:30
 * @FilePath: \TypeScript\chapter01\01_types.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by 南山彭于晏, All Rights Reserved. 
 */

// 也可以直接使用字面量进行类型声明
let a1: 10
// a1 = 11 报错，不能再赋值了，只能是 10

// 使用 | 来连接多个类型(联合类型)
let a2: 'male' | 'female'
a2 = 'male'
a2 = 'female'

// any表示任意类型，一个变量设置类型为any后相当于该变量关闭了TS的类型检测
let a3: any  // 它可以赋值给任意变量

// unknown表示未知变量，不能直接赋值给其他变量
let a4: unknown

let s: string
// s = a3

