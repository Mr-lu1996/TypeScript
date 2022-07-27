/*
 * @Author: 南山彭于晏
 * @Date: 2022-07-27 16:40:47
 * @LastEditTime: 2022-07-27 22:21:22
 * @FilePath: \TypeScript\01_test\test.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by 南山彭于晏, All Rights Reserved. 
 */
let a: number

a = 10
a = 100

// 声明完变量直接赋值
let b: boolean = true

// 变量和声明同时进行，TS可以自动对变量进行类型检测
let c = false
// c = 123  报错

// 设置参数类型和返回值类型
function sum(a: number, b: number): number {
  return a + b
}