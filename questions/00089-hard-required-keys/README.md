## 挑战



实现高级工具类型 `RequiredKeys<T>`，该类型返回 T 中所有必需属性的键组成的一个联合类型。

例如

```ts
type Result = RequiredKeys<{ foo: number; bar?: string }>
// expected to be “foo”
```

## 解答

