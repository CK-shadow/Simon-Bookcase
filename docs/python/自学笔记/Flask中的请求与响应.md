---
title: Flask中的请求与响应
tags: 
 - Flask
 - Request
 - Response
categories: frontEnd
---

### Flask中的请求与响应
**请求对象request**  
在request对象中封装了所有跟当前请求相关的信息  

使用  
&emsp;引入：from&emsp;flask&emsp;import&emsp;request  
&emsp;使用：在视图函数中获取request对象内部的信息

request对象的常用属性  
&emsp;scheme：获取此次请求使用的协议  
&emsp;method：获取请求方式，默认为GET  
&emsp;args：获取GET方式提交的数据  
&emsp;from：获取POST方式提交的数据  
&emsp;cookies：获取浏览器cookies中保存的数据  
&emsp;file：获取上传的文件  
&emsp;path：获取请求的资源路径（不带参数）  
&emsp;full_path：获取请求的资源路径（带参数）  
&emsp;url：获取完整的请求地址  
&emsp;headers：获取请求消息头，使用key:value保存信息

### 获取请求中的数据
**获取GET请求中的数据**
1. request.args["key"]
2. request.args.get["key", 默认值]
3. request.args.getlist["key"]    使用于一个key对应多个值的情况（复选框）
::: tip
注：如果key当时未携带数据，在视图函数中直接读取request.args[""]数据，报400错误
:::
            
**获取POST请求中的数据**
request.from 获取字典数据
1. request.args["key"]
2. request.args.get["key"]
3. request.args.getlist["key"]
::: tip
注：POST方式即使未携带数据，直接获取字典中的值，返回为空
:::
            
**页面重定向**  
由服务器通知浏览器重新向新的地址发请求  
使用：  
&emsp;引入redirect  
&emsp;使用函数redirect("重定向地址')  
&emsp;视图函数中返回  
&emsp;&emsp;return refirect("重定向地址")

页面源  
&emsp;当前的请求时从哪个源地址发起的  
&emsp;保存在请求头消息中("Referer":"")

**文件上传**  
使用表单控件type="file"向服务器发送文件，因为文件，图片，音视频等都是二进制数据，必须设置表单的提交方式和编码类型
```python
<form action="" method="post" enctype="multipart/form-data">
```
                
服务器端使用request.files获取上传的文件,返回字典  
例：
```python
f = request.files["key"]
#将文件保存至指定的文件夹下
f.save(保存路径)
```

