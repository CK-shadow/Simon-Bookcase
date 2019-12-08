---
title: Python爬虫
tags: 
 - Spider
categories: frontEnd
---

### 爬虫的概念、工具和HTTP
什么是爬虫  
&emsp;爬虫就是模拟客户端（浏览器）发送网络请求，获取响应，按照规则提取数据的程序
        
### requests模块
```python
模块安装
pip install requests
        
发送get、post请求，获取响应
    response = request.get(url) # 发送get请求
    response = request.post(url, data = (请求体的字典)) # 发送post请求
        
response的方法
    response.text
        该方式往往会出现乱码，出现乱码使用response.encoding = "UTF-8"
    response.content.decode()
        把响应的二进制字节流转换为str类型
            
获取的网页源码通过以下三种方式一定能够正确打开
    response.content.decode()
    response.content.decode("GBK")
    response.text
        
header
    如果响应无法获取具体内容，可考虑带上header中的其它参数
        
使用超时参数
    request.get(url, headers=headers, timeout=3) # 3秒内必须返回相应，否则会报错
```
        
### retrying模块
模块安装
```python
pip install retrying
```

### 处理cookie相关的请求
```
直接携带cookie请求url地址
    1.cookie放在header中
        headers = {"User-Agent":"...", "Cookie":"cookie字符串"}
    2.cookie字典传给cookie参数
        request.get(url, Cookies=cookie_dict)
            
发送post请求，获取cookie，带上cookie请求登录后的页面
    1.session = requests.session() # session具有的方法和requests一样
    2.session.post(url, data, headers) # 服务器设置在本地的cookie会存在session
    3.session.get(url) # 带上之前保存在session中的cookie，就能访问成功
```
        
### 数据处理方法
```
json.loads(json字符串)
    把json字符串转换为python类型
json.dumps
    把python类型转换为json类型
    json.dumps(ret1, ensure_ascii=False, indent=2)
    ensure_ascii：让中文显示成中文
    indent：能够让下一行在上一行的基础上空格
```
        