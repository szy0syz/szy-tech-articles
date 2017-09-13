# GraphQL: Data Fetching with Relay


## overview

- [link][1]
- Released: 8/3/2017
- Topics include:
    - Setting up GraphQL
    - Running queries
    - Updating schema and solvers
    - Adding data
    - Adding Relay entry components
    - Coding GraphQL fragments

## 环境搭建

1. VSCode: 安装插件 `GraphQL for VSCode`
2. ATOM: 安装packages `atom-graphql`
3. WebStrom: 自带
4. `npm init`: 初始化
5. `yarn add babel-cli -D` yarn安装开发依赖项 bable
6. `yarn add babel-preset-es2015 babel-preset-stage-0`
7. 修改package.json中"script"的值：`{ "start": "babel-node ./server.js" }`
8. 配置babel的`.babelrc`文件 ` { "presets": ["es2015", "stage-0"], "plugins": [] }`
9. 编写代码后启动: `yarn start`
10. 安装graphql: `yarn add graphql express-graphql`

## 第1例 使用schema

```js
//////// schema.js
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

export default schema;
```

```js
//////// server.js
import express from 'express';
import graphqlHTTP from 'express-graphql'
import schema from './schema';

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL & Relay modern is cool!!!');
});

const root = {hello: () => "Hi, I'm Jerry."};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // 开启后会有graphql专享界面，否者直接返回rootValue的值
}));

app.listen(8080, () => console.log('Running server on localhost:8080/graphql'));
```

----------

## 第2例 自定义schema

- https://github.com/sogko/graphql-schema-language-cheat-sheet

```js
////// schema.js
import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Friend {
    id: ID
    firstName: String
    lastName: String
    gender: String
    language: String
    email: String
  }

  type Query {
    friend: Friend
  }
`);

export default schema;
```

```js
////// server.js
const root = { friend: () => {
  return {
      "id": 9527,
      "firstName": "Jerry",
      "lastName": "Shi",
      "gender": "Male",
      "language": "Chinese",
      "email": "szy0syz@gmail.com",
  }
}};
```

----------

## 第3例 带参数的查询

- 在schema的Query中定义哪些参数是必填字段，加`!`为必填

```js
////  schema.js
const schema = buildSchema(`
  type Friend {
    id: ID
    firstName: String
    lastName: String
    gender: String
    language: String
    email: String
    IDTyped: String
  }

  type Query {
    friend (id: ID!): Friend
  }
`);
```

- 在root中可以获取传来的过滤参数

```js
const root = { friend: (args) => {
  return {
      "id": 9527,
      "firstName": "Jerry",
      "lastName": "Shi",
      "gender": "Male",
      "language": "Chinese",
      "email": "szy0syz@gmail.com",
      "IDTyped": args.id
  }
}};
```

----------

## 第4例 update muation

- 首先更新schema.js
  - 定义input输入接口类 FriendInput
  - 定义Mutaion类，里面有两个方法
  - `createFriend(input: FrinedInput): Friend` 定义输入为FrinedInput类，输出为Friend类
  - `updateFriend(id: ID!, input: FriendInput): Friend` 定义id参数必须传

```js
const schema = buildSchema(`
  input FriendInput {
    id: ID
    firstName: String
    lastName: String
    gender: String
    language: String
    email: String
  }

  type Friend {
    id: ID
    firstName: String
    lastName: String
    gender: String
    language: String
    email: String
  }

  type Query {
    getFriend (id: ID!): Friend
  }

  type Mutaion {
    createFriend(input: FriendInput): Friend
    updateFriend(id: ID!, input: FriendInput): Friend
  }
`);
```

> vsc检查到语法错误后，你再撸代码，它就抖你，我靠，我还以为是屏幕坏了，怎么就抖得我心慌啊。😂

- 更新schema后更新服务端
  1. 增加`Friend`类
  2. 2
  3. 

```js
class Friend {
  // es6解构语法
  constructor(id, { firstName, lastName, gender, language, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.language = language;
    this.email = email;
  }
}
```

- 创建、查询、修改
  - 感觉好像清晰一点了

```js
mutation{
  createFriend (input: {
    firstName: "jerry"
    lastName: "shi"
    gender: "male"
    language: "Chinese"
    email: "szy0syz@gmail.com"
  }) {
    id
  }
}

query {
  getFriend(id: "d1c4a53f8cc9f2564fe6"){
    firstName
    lastName
    email
  }
}

mutation{
  updateFriend(id: "d1c4a53f8cc9f2564fe6", input: {
    firstName: "zhenyu"
    lastName: "shi"
    gender: "female"
    language: "english"
    email: "szy0syz@gmail.com"
  }) {
    firstName
    gender
    email
  }
}
```


  [1]: https://www.lynda.com/GraphQL-tutorials/GraphQL-Data-Fetching-Relay/595829-2.html