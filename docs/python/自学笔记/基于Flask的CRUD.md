---
title: 基于Flask的CRUD
tags: 
 - Flask
 - CRUD
categories: frontEnd
---

### 增加--C
1. 创建实体类对象，并为实体类对象赋值
```
user = Users()
```
2. 将实体对象保存进数据库
```
db.session.add(user)  # 增加数据
db.session.commit()  # 提交事务
```
          
### 查询--R
**基于sessuin进行查询**
1. db.session.query()
   * 参数：要查询的列，如果查询多个列的话使用,隔开，如果要查询所有的列，参数为实体类名
   * 返回值：返回一个Query对象，类型为BaseQuery
2. 查询执行函数
   * 作用：在query的基础上得到最终的查询结果
   * 语法：db.session.query(XXX).查询执行函数()
   * 函数：
     * all()&emsp;以列表方式返回所有数据
     * first()&emsp;以实体对象的方式返回第一条数据，没有查询到的数据则返回None
     * first_or_404()&emsp;效果同上，没有查询到结果则返回404
     * count()&emsp;返回查询结果的数量
3. 查询过滤器函数
   * 作用：在db.session.query()追加条件
   * 语法：db.session.query(XX).过滤器函数().执行函数()
   * 函数：
     * filter()&emsp;各种各样的查询条件均可实现
     * filter_by()&emsp;只做等值条件判断
     * limit()&emsp;获取限定行数
     * offset()&emsp;指定结果的偏移量
     * order_by()&emsp;排序
4. 聚合查询
   * 基本的聚合查询
```python
from sqlalchemy import func  # 提供了所有的聚合函数
聚合函数
    sum() : func.sum()
    count() :
    max() :
    ...
语法
    db.session.query(func.聚合函数(实体类.属性)).all()
```
   * 分组聚合查询
```python
db.session.query(查询列, 聚合列)
    .filter(查询条件)  # 分组前数据筛选--where
    .group_by(分组列名)
    .having(条件)        
```
   * 基于实体类进行查询
```python
语法：实体类.query.查询过滤器函数().查询执行函数()
示例:
    1.查询Users实体中所有的数据
        Users.query.all()
    2.查询Users实体中isActive为True的数据
        Users.query.filter_by(isActive=True).all()
        Users.query.filter(Users.isActive==True).all()
```
            			
### 修改--U
1. 查,查询出要修改的实体对象
2. 改,通过 对象.属性=值 修改数据
3. 保存,db.session.add(对象)
   
### 删除--D
1. 查,查询出要修改的实体对象
2. 删,db.session.delete(对象)

