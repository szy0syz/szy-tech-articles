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


  [1]: https://www.lynda.com/GraphQL-tutorials/GraphQL-Data-Fetching-Relay/595829-2.html