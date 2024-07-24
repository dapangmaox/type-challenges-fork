# ReturnType

## 挑战

不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

例如：

```ts
const fn = (v: boolean) => {
  if (v) return 1
  else return 2
}

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
```

## 解答

要提取函数类型 `T` 的返回类型，可以使用**条件类型**加**类型推断**。

```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never
```

首先使用 `extends` 检查 `T` 是否为函数类型，如果是函数类型，会匹配模式 `(...args: any[]) => R`，`R` 就是我们要获取的返回类型。

接下来使用 `infer` 关键字在条件类型中声明一个类型变量 `R`。如果 `T` 是函数类型，条件类型会解析为 `R`，否则解析为 `never`。

## 参考

1. [Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
2. [Inferring Within Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types)
