---
title: list高级
tags: 
 - Python
 - List
categories: frontEnd
---

### 列表的切片
列表&nbsp;[:]  
列表&nbsp;[::]  
列表的切片取值返回一个列表，规则等同于字符串的切片规则  
    
**列表的切片赋值：**  
作用：可以改变原列表的排列，可以插入和修改数据，可以用切片改变列表对应的元素的值  
语法：列表[切片slice] = 可迭代对象  
说明：赋值运算符的右侧必须是一个可迭代对象  
切片赋值注意事项:  
&nbsp;&nbsp;&nbsp;&nbsp;对于步长不等于1的切片赋值，赋值运算符的右侧的可迭代对象的个数一定要等于切片切出的片数
            
**del语句用于删除列表的元素**    
语法：del 列表[索引]  
&nbsp;&nbsp;&nbsp;&nbsp;del 列表[切片]
              
### Python3中常用的序列相关的函数
序列有5种：str、list、tuple、bytes、bytearray
* len(x)&nbsp;&nbsp;返回序列的长度
* max(x)&nbsp;&nbsp;返回序列中的最大值元素
* min(x)&nbsp;&nbsp;返回序列中的最小值元素
* sum(x)&nbsp;&nbsp;返回序列中所有元素的和（元素必须是数值类型）
* any(x)&nbsp;&nbsp;真值测试，如果列表中其中一个值为真值则返回True
* all(x)&nbsp;&nbsp;真值测试，如果列表中所有值均为真值则返回True
    
 ### Python3list常用方法
list()&nbsp;&nbsp;在list末尾增加一个元素  
insert(index, obj)&nbsp;&nbsp;在指定位置添加元素，如果指定下标不存在，那么就是在末尾添加  
extend(list)&nbsp;&nbsp;合并两个list  
count(obj)&nbsp;&nbsp;查看某个元素在这个列表中的个数，如果该元素不存在，那么返回0  
index(obj)&nbsp;&nbsp;找到这个元素的下标，如果有多个，返回第一个，如果找一个不存在的元素会报错  
pop()&nbsp;&nbsp;删除最后一个元素  
pop(index)&nbsp;&nbsp;指定下标，删除指定的元素，如果删除一个不存在的元素会报错  
remove(obj)&nbsp;&nbsp;删除list里面的一个元素，有多个相同的元素，删除第一个  
::: tip    
注：pop有返回值，remove没有返回值
:::
reserve()&nbsp;&nbsp;将列表反转
sort()&nbsp;&nbsp;排序，默认升序
sort(reserve=True)&nbsp;&nbsp;降序排列
    
 ### 字符串的文本解析方法
**S代表字符串**  
S.split(sep = None)   
&nbsp;&nbsp;&nbsp;&nbsp;将字符串使用sep座位分隔符分割S字符串，返回分割后的字符串列表，当不给定参数时，用空白字符作为分隔符分割  
S.join(iterable)  
&nbsp;&nbsp;&nbsp;&nbsp;用可迭代对象中的字符串，返回一个一个中间用S进行分割的字符串
        
 ### 浅拷贝和深拷贝
浅拷贝&nbsp;shallow&nbsp;copy  
&nbsp;&nbsp;&nbsp;&nbsp;浅拷贝是指在复制过程中，只复制一层变量，不会复制深层变量绑定的对象的复制过程  
深拷贝&nbsp;deep&nbsp;copy  
&nbsp;&nbsp;&nbsp;&nbsp;需导入copy模块  
&nbsp;&nbsp;&nbsp;&nbsp;深拷贝通常只对可变对象进行复制，不可变对象通常不会复制  
        
 ### 列表推导式
列表推导式是用可迭代对象生成列表的表达式  
作用：用简易方法生成列表  
```python
语法：[表达式 for 变量 in 可迭代对象]  
或：[表达式 for 变量 in 可迭代对象 if 真值表达式]
```
说明：for in表达式的if子句可以省略，省略后将对所有的生成对象就行求之处理

