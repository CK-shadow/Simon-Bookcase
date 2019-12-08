---
title: for循环与list
tags: 
 - Python
 - for
 - list
categories: frontEnd
---

### for语句
作用：用来遍历可可迭代对象的数据元素
    
可迭代对象是指能能依次获取数据元素的对象  
可迭代的对象包括：
&nbsp;&nbsp;&nbsp;&nbsp;字符串&nbsp;str
&nbsp;&nbsp;&nbsp;&nbsp;列表&nbsp;list
&nbsp;&nbsp;&nbsp;&nbsp;元组&nbsp;tuple
&nbsp;&nbsp;&nbsp;&nbsp;字典&nbsp;dict
&nbsp;&nbsp;&nbsp;&nbsp;...
        
for语法：
```python
for 变量列表 in 可迭代对象：
    语句块1
else
    语句块2
```
::: tip 
说明：当循环内部用break语句终止循环时，else子句部分的语句不会执行
:::
    
**range函数**  
* 格式：range（stop）
&nbsp;&nbsp;&nbsp;&nbsp;从零开始，每次生成一个整数后加1操作，直到stop为止（不包含stop）
* range（start, stop, [step]）
&nbsp;&nbsp;&nbsp;&nbsp;从start开始，每次生成一个整数后移动step，直到stop为止（不包含step，且step可以是负数）
* 作用：用来创建一个生成一系列整数的可迭代对象（也叫整数序列生成器）  
* 说明：range函数调用返回的对象可用于for语句来进行依次迭代取出其中的整数
        
### continue语句
* 作用：用于循环语句中（while，for语句），不再执行此次循环内continue之后的语句，重新开始依次新的循环  
* 说明：在while语句中执行continue语句，将会直接跳转到while语句的真值表达式处重新判定循环条件
&nbsp;&nbsp;&nbsp;在for语句中，执行continue语句，将会从可迭代对象中取一下元素绑定变量后再次进行循环
          
### 列表list
列表的定义：
  1. 列表是一种容器（通常用来存储计算机的数据对象）
  2. 列表时可以被改变的序列
  3. 列表是一系列特定元素组成的，元素与元素之间可能没有任何的关联关系，但他们之间有先后顺序关系
        
**创建空列表的字面值方式**
```python
L = []    # L绑定空列表
```
    
**创建非空列表的字面值方式**
```python
L = [1, 2, 3, 4]
L = ['北京', '上海', '广州', '深圳']
L = [1, 'two', 3.14, '四']
L = [1, 2, [3, 4, 5], 6]
```
        
**列表的构造函数**  
&nbsp;&nbsp;&nbsp;&nbsp;list()&nbsp;&nbsp;生成一个空的列表，等同于[]  
&nbsp;&nbsp;&nbsp;&nbsp;list(iterable)&nbsp;&nbsp;用可迭代对象创建一个列表
示例：
```python
L = list()    # L = []
L = list("hello")    # L = ['h', 'e', 'l', 'l', 'o']
L = list(range(5, 10, 2))    # L = [5, 7, 9]
```
        
### 列表的运算
**运算符**  
+&nbsp;+=&nbsp;* &nbsp;*=  
+&nbsp;用于拼接列表  
*&nbsp;用于生成重复的列表  
        
**列表的比较运算**  
运算符：  
&nbsp;&nbsp;&nbsp;&nbsp;<&nbsp;<=&nbsp;>&nbsp;>=&nbsp;==&nbsp;!=  
比较规则：  
&nbsp;&nbsp;&nbsp;&nbsp;同字符串比较规则完全相同  
            
**列表的in/not in运算符：**    
判断一个元素是否存在于列表中，如果存在返回True，否则返回False    
in和not in的返回值相反    

