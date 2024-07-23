## 挑战



实现高级工具类型 `UnionToIntersection<U>`

例如

```ts
type I = UnionToIntersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
```

## 解答

