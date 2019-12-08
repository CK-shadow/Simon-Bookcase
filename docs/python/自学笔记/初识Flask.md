---
title: 初始Flask
tags: 
 - Flask
categories: frontEnd
---

### Web前端与后端
* Web前端：
  * 网页：包含HTML、CSS、JS
  * 静态网页：不能与服务器进行交互的网页
  * 动态网页：能够与服务器进行交互的网页
* Web后端：
  * Flask，Django
  * Ajax技术
        
### 服务器
* 服务器
  * 为用户提供服务的计算机，将数据抽象成URL，以供用户访问
* 组成
  * 硬件
    * 主机
  * 软件
    * 能够处理用户请求的程序
    * Apache
    * Tomcat
    * IIS (Internet Information Service)
    * Nginx
* 作用
  * 存储Web相关数据
  * 处理请求和响应
  * 具备安全性
        
### 框架
* 框架
  * 为了解决一些开放性、重复性问题而产生的程序结构
* 框架模式
  * MVC
    * M：模型层Model，与数据库打交道
    * V：视图层View
    * C：控制层Controller，处理请求与响应
  * MTV（Flask）
    * M：模型层Model
    * T：Template模板（HTML模板）
    * V：View视图层，处理请求与响应
        	
### Flask的使用
Flask是一个基于Python并依赖于Jinja2模板引擎和WerkZeug WSGI服务的框架  
WSGI：Web Server Gateway Interface.Web服务网关接口，提供处理网络请求相关的功能

**Flask的路由**  
路由是为了匹配用户的请求地址，会自动执行视图函数，视图函数中必须有返回值，返回字符串显示到相应的页面中  
    	
**使用：**
```python
定义路由及视图函数
    @app.route('/地址')
    def funcName():
        return "" #响应到页面中的内容
    		
定义带参数的路由
    变量：<变量名>
    @app.route("/login/<name>/<age>")
    def login(name,age):
    	return "%s,%s" % (name,age)
    注意：路径中的参数变量永远是字符串类型

类型转换器
    分类：
    缺省	字符串，不能包含'/'
    int:	转换整数
    float:	转换小数
    path:	字符串，允许包含'/'
    使用：
    	@app.route('/show/<int:num>')

多个URL执行同一个视图函数
    例：
    @app.route('/')
    @app.route('/index')
    def index():
   		return "首页"
```
   						
### 模板 
模板是一种特殊的HTML文件，Python+html网页结构，允许在模板文件中使用变量  
导入render_template  
项目中创建“templates”文件夹，存放模板文件

