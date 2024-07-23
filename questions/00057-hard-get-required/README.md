## 挑战



实现高级工具类型 `GetRequired<T>`，该类型保留所有必需的属性

例如

```ts
type I = GetRequired<{ foo: number, bar?: string }> // expected to be { foo: number }
```

## 解答

