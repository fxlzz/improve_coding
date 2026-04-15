# improve_coding

## 项目介绍

这是一个基于 Node.js 和 Vue.js 的 Web 全栈框架（针对于B端应用）。该项目采用前后端分离架构，后端使用 Koa.js 框架，前端使用 Vue 3 框架，数据库使用 MySQL。项目支持多环境配置（本地开发、测试、生产），并集成了现代化的前端构建工具和后端中间件。

项目核心思想是通过 `app/docs/` 中的 DSL 配置驱动系统行为。该 DSL 负责描述前端页面布局、UI 组件、数据源以及数据字段在界面中的展示方式（如 table、search 等），并且通过字段配置反向生成基础数据库表结构。

### 主要特性

- **后端框架**: 基于 Koa.js，采用 MVC 架构模式
- **前端框架**: Vue 3 + Element Plus UI 组件库
- **数据库**: MySQL + Knex.js / prisma 查询构建器
- **构建工具**: Webpack5 + express hmr
- **状态管理**: Pinia 
- **图表库**: ECharts 5.x
- **鉴权**: JWT
- **日志**: Log4js
- **测试**: Mocha 测试框架

## 项目架构

### 目录结构

```
improve_coding/
├── index.js                    # 项目入口文件
├── package.json               # 项目依赖和脚本配置
├── README.md                  # 项目说明文档
├── app/                       # 应用主目录
│   ├── middleware.js          # 全局中间件入口
│   ├── constant/              # 常量定义
│   ├── controller/            # controller 层 
│   ├── docs/                  # 文档相关
│   │   └── dashboard.document.js # DSL 文档
│   ├── extend/                # 扩展功能
│   ├── middleware/            # 自定义中间件
│   ├── model/                 # DSL 数据模型
│   ├── pages/                 # 前端页面和组件
│   ├── public/                # 公共静态资源
│   ├── router/                # 路由配置
│   ├── router-schema/         # 路由模式配置
│   ├── service/               # service层
│   ├── template/              # 模板文件
│   │   └── index.html
│   ├── utils/                 # 工具函数
│   │── webpack/               # Webpack 配置
├── config/                    # 环境配置文件
├── server-core/               # 服务器核心模块
│   └── loader/                # 全局解析器模块
└── test/                      # 测试文件
```

### 架构说明

#### 后端架构 (server-core)

项目采用自定义的服务器核心框架，基于 Koa.js 构建：

- **Loader 系统**: 自动加载中间件、路由、控制器、服务等模块
- **MVC 模式**: Controller 处理请求，Service 处理业务逻辑，Model 处理数据访问
- **中间件**: 支持自定义中间件，如 API 参数验证、签名验证、错误处理等
- **路由系统**: 支持动态路由配置和路由模式

#### 前端架构

- **组件化**: 采用 Vue 3 组件化开发
- **状态管理**: 使用 Pinia 进行全局状态管理
- **UI 组件**: 集成 Element Plus 组件库
- **构建工具**: 自定义 Webpack 配置，支持开发和生产环境

#### 数据层（暂未实现）

- **ORM**: 使用 Knex.js / prisma 作为 SQL 查询构建器
- **数据库**: MySQL
- **模型**: 按业务模块组织数据模型

## 安装和运行

### 环境要求

- Node.js >= 14.0.0
- MySQL >= 5.7
- npm 或 yarn

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/fxlzz/improve_coding.git
   cd improve_coding
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置数据库**
   
   创建 MySQL 数据库，并修改 `config/config.local.js` 中的数据库配置：
   ```javascript
   module.exports = {
     database: {
       host: 'localhost',
       user: 'your_username',
       password: 'your_password',
       database: 'your_database_name'
     }
   };
   ```

4. **运行项目**

   - **开发环境**:
     ```bash
     npm run dev
     ```
   
   - **构建前端**:
     ```bash
     npm run build:dev  # 开发环境构建
     npm run build:prod # 生产环境构建
     ```
   
   - **生产环境**:
     ```bash
     npm run prod
     ```

5. **运行测试**
   ```bash
   npm test
   ```

### 访问应用

项目启动后，访问 `http://localhost:3003` 查看应用。

## 开发指南

### 代码规范

- 使用 ESLint 进行代码检查: `npm run lint`
- 遵循 Vue 3 组合式 API 最佳实践
- 使用 TypeScript 风格的 JSDoc 注释

### 添加新功能

1. **后端 API**:
   - 在 `app/controller/` 添加控制器
   - 在 `app/service/` 添加业务逻辑
   - 在 `app/model/` 添加页面模型
   - 在 `app/router/` 配置路由
   - 在 `app/test/` 添加接口单元测试

2. **前端页面**:
   - 在 `app/pages/` 添加 Vue 组件
   - 在 `app/stores/` 添加状态管理
   - 在 `app/*/entry.**.js` 配置前端路由
   - 在 `app/router-schema/` 添加接口校验（遵循 json-schema 规范）

### 数据库迁移

项目使用 Knex.js 进行数据库迁移，请参考 Knex.js 官方文档。

## 部署

### 生产环境部署

1. 构建前端资源:
   ```bash
   npm run build:prod
   ```

2. 配置生产环境变量:
   - 设置 `NODE_ENV=production`
   - 配置数据库连接
   - 设置 JWT 密钥等敏感信息

3. 启动服务:
   ```bash
   npm run prod
   ```

### Docker 部署 （暂未实现）

项目支持 Docker 部署，可添加 Dockerfile 和 docker-compose.yml 文件。


> 项目来源：哲玄前端（AI全栈）