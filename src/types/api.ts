
//eslintrc.cjs     '@typescript-eslint/no-namespace': 'off' 就可以让我们这里定义namespace不报错了
export namespace LoginType {
  export interface params {
    username: string;
    password: string;
  }
}


export interface IResponse<T = any> {
  code: number | string,
  msg: string,
  data: TemplateStringsArray
}
