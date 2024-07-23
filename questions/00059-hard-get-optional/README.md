## 挑战



实现高级工具类型 `GetOptional<T>`，该类型保留所有可选属性

例如

```ts
type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }
```

## 解答

