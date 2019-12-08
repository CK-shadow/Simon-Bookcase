---
title: Set和函数
tags: 
 - Python
 - set
 - Function
categories: frontEnd
---

### 集合set
1. 集合是可变得容器  
2. 集合内得数据对象都是唯一的（不能重复的）  
3. 集合是无序的存储结构，集合中的数据没有先后关系  
4. 集合内的元素必须是不可变对象  
5. 集合是可迭代对象  
6. 集合相当于只有键没有值的字典  
    
创建空集合  
&nbsp;&nbsp;&nbsp;&nbsp;s = set()  
创建非空集合  
&nbsp;&nbsp;&nbsp;&nbsp;s = {1, "hello", 3.14}  
        
集合的构造函数  
&nbsp;&nbsp;&nbsp;&nbsp;set()&nbsp;创建一个空的集合对象（不能用{}来创建空集合）  
&nbsp;&nbsp;&nbsp;&nbsp;set(iterable)&nbsp;用可迭代对象创建一个新的集合对象  
        
集合的运算  
&nbsp;&nbsp;&nbsp;&nbsp;交集，并集，补集，子集，超集

**生成两个集合的交集 &**
```python
s1 = {1, 2, 3}
s2 = {2, 3, 4}
s3 = s1 & s2    #  s3 = {2, 3}
```

**生成两个集合的并集 |**
```python
s1 = {1, 2, 3}
s2 = {2, 3, 4}
s3 = s1 | s2    #  s3 = {1, 2, 3, 4}
```

**生成一个集合的补集**
```python
s1 = {1, 2, 3}
s2 = {2, 3, 4}
s3 = s1 - s2    #  s3 = {1}
```

**生成两个集合的对称补集 ^**
```python
s1 = {1, 2, 3}
s2 = {2, 3, 4}
s3 = s1 ^ s2 = (s1 - s2) | (s2 - s1)    #  s3 = {1, 4}
```

判断一个集合是否是另一个集合的超集&nbsp;>  
判断一个集合是否是另一个集合的子集&nbsp;<  
判断两个集合是否相同&nbsp;==  
判断两个集合是否不同&nbsp;!=  
    
in/not&nbsp;in&nbsp;运算符  
&nbsp;&nbsp;&nbsp;&nbsp;等同于字典的in/not&nbsp;in    
&nbsp;&nbsp;&nbsp;&nbsp;作用于集合中，判断某个值是否存在于集合中  
        
**Python3中set常用方法**    
S.add(e)&nbsp;&nbsp;在集合中添加一个新的元素e，如果元素已经存在，则不添加  
S.remove(e)&nbsp;&nbsp;从集合中删除一个元素，如果元素不存在于集合中，则会产生一个KeyError的错误  
S.discard(e)&nbsp;&nbsp;从集合中移除一个元素，如果元素不存在则什么都不做  
S.clear()&nbsp;&nbsp;清空集合内的所有元素  
S.copy()&nbsp;&nbsp;将集合进行一次浅拷贝  
S.pop()&nbsp;&nbsp;从集合S中删除一个随机元素，如果集合为空，则引发KeyError异常  
S.update(s2)&nbsp;&nbsp;用S与s2得到的全集更新S  
S.difference(s2)&nbsp;&nbsp;用S-s2，将结果返回给S
        
**集合推导式**  
集合推导式是用可迭代对象生成集合的表达式  
语法：  
&nbsp;&nbsp;&nbsp;&nbsp;{表达式 for 变量 in 可迭代对象 [if 真值表达式]}
            
**固定集合frozenset**  
固定集合是不可变的，无序的，含有唯一元素的集合  
作用：  
&nbsp;&nbsp;&nbsp;&nbsp;固定集合可以作为字典的键，还可以作为集合的值
固定集合的构造函数：  
&nbsp;&nbsp;&nbsp;&nbsp;frozenset()&nbsp;&nbsp;创建一个空的固定集合  
&nbsp;&nbsp;&nbsp;&nbsp;frozenset(iterable)&nbsp;&nbsp;用可迭代对象创建一个空的固定集合
            
### 函数function
函数是可以重复执行的语句块，可以重复调用  
作用：  
&nbsp;&nbsp;&nbsp;&nbsp;1.用于封装语句块，提高代码的重用性  
&nbsp;&nbsp;&nbsp;&nbsp;2.定义用户级别的函数
语法：
```python  
def 函数名(形参列表):
    语句块
```

说明：  
&nbsp;&nbsp;&nbsp;&nbsp;1.函数的名字就是语句块的名字  
&nbsp;&nbsp;&nbsp;&nbsp;2.函数名的名字规则与变量名相同  
&nbsp;&nbsp;&nbsp;&nbsp;3.函数名是一个变量（不要轻易对其赋值）  
&nbsp;&nbsp;&nbsp;&nbsp;4.函数有自己的名字空间，在函数外部不可以访问函数内部的变量，在函数内可以访问函数外部的变量，但不能修改此变量  
&nbsp;&nbsp;&nbsp;&nbsp;5.函数如果不需要传入参数，形参列表可以为空  
&nbsp;&nbsp;&nbsp;&nbsp;6.语句部分不能为空，如果为空需要填充pass
        
**函数调用**  
语法：  
&nbsp;&nbsp;&nbsp;&nbsp;函数名(实参)  
说明：  
&nbsp;&nbsp;&nbsp;&nbsp;1.函数调用是一个表达式    
&nbsp;&nbsp;&nbsp;&nbsp;2.如果函数内部没有return语句，函数调用完毕后返回None对象    
&nbsp;&nbsp;&nbsp;&nbsp;3.如果函数需要返回其他对象需要用到return语句  

