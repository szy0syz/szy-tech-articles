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

1. [VS]: 安装插件 `GraphQL for VSCode`
2. [ATOM]: 安装packages `atom-graphql`
3. [WebStrom]: 自带
4. `npm init`: 初始化
5. `yarn add babel-cli -D` yarn安装开发依赖项 bable
6. `yarn add babel-preset-es2015 babel-preset-stage-0`
7. 修改package.json中"script"的值：`{ "start": "babel-node ./server.js" }`
8. 配置babel的`.babelrc`文件 ` { "presets": ["es2015", "stage-0"], "plugins": [] }`
9. 编写代码后启动: `yarn start`
10. 安装graphql: `yarn add graphql express-graphql`

## 第一例 使用schema

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





  [1]: https://www.lynda.com/GraphQL-tutorials/GraphQL-Data-Fetching-Relay/595829-2.html