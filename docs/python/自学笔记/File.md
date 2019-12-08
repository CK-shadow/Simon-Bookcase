---
title: File
tags: 
 - File
categories: frontEnd
---

### 文件File
文件是用于数据存储的单位  
文件通常用来长期存储数据  
文件中的数据是以字节为单位进行顺序存储的
    
**文件的操作流程**  
1.打开文件  
2.读/写文件  
3.关闭文件  
::: tip
注：任何的操作系统，一个应用程序同时打开文件的数量有最大数限制
:::
        
**文件的打开、关闭函数**  
open(file, mode="rt")&emsp;#用于打开一个文件，返回此文件流对象，如果打开文件失败，会触发OSError错误  
F.close()&emsp;# 关闭文件，释放系统资源  
        
**文本文件操作**  
操作模式：  
&emsp;"t"  
说明：  
&emsp;1.默认文件中存储的都是字符数据，在读写过程中会自动进行编解码操作  
&emsp;2.文本文件以行为单位进行分隔，在python内部统一用"\n"作为换行符进行分隔  
&emsp;3.对文本文件的读写操作需要用字符串（str）进行数据操作  
各操作系统换行符：  
&emsp;Linux换行符："\n"  
&emsp;Windows换行符："\r\n"  
&emsp;新的Mac OS换行符："\n"
            
**mode模式字符的含义**  
&emsp;"r"&emsp;以只读方式打开（默认）  
&emsp;"w"&emsp;以只写方式打开，删除原有文件内容（如果文件不存在，则创建该文件并以只写方式打开）  
&emsp;"x"&emsp;创建一个新文件，并以写模式打开这个文件，如果文件存在则产生"FileExitsError"错误  
&emsp;"a"&emsp;以只写方式打开一个文件，如果有原文件则追加到文件末尾  
&emsp;"b"&emsp;用二进制模式打开  
&emsp;"t"&emsp;文本文件模式打开（默认）   
&emsp;"+"&emsp;为更新内容打开一个磁盘文件（可读可写）  
&emsp;--&emsp;缺省模式是"rt"  
&emsp;--&emsp;"w+b"可以实现二进制随机读写，当打开文件时，文件内容会被清零  
&emsp;--&emsp;"r+b"以二进制读和更新模式打开一个文件，打开文件时不会清空文件内容  
&emsp;--&emsp;"r+"以文本模式读和更新模式打开文件，打开文件时不会清空文件内容  
        
**标准输入输出文件**  
sys.stdin&emsp;标准输入文件  
sys.stdout&emsp;标准输出文件  
sys.stderr&emsp;标准错误输出文件  
模块名：sys  
::: tip
注：标准文件不需要打开和关闭就可以使用
:::
        
**二进制文件操作**  
二进制文件操作模式字符："b"  
默认文件中存储的是以字节为单位的数据，通常有人为规定的格式，二进制文件操作需要用字节串进行读写  
        
F.read()/F.readline()/F.readlines返回类型  
&emsp;对于文本文件，F.read()等方法返回字符串（str）  
&emsp;对于二进制文件，F.readline()等方法返回字节串（bytes）
            
**编码注释**  
在python源文件的第一行或第二行写入如下内容：  
```python
# -*- coding:gbk -*-
# 设置源文件编码格式为gbk
或
# -*- coding:utf-8 -*-
# 设置源文件编码格式为utf-8
```
作用：告诉解释执行器，此文件的编码格式
        
**python3中File常用方法**  
file.close()  
&emsp;关闭文件，关闭后不能再进行读写操作  
file.flush()  
&emsp;刷新文件内部缓冲，直接把内部缓冲区数据写入文件，而不是被动的等待输出缓冲区写入  
file.fileno()  
&emsp;返回一个整型的文件描述符，可以用在如os模块的read方法等一些底层操作上  
file.isatty()  
&emsp;如果文件连接到一个终端设备返回True，否则返回False  
file.read([size])  
&emsp;从文件读取指定的字节数，如果未给定或为负数则读取所有  
file.readline()  
&emsp;读取整行，包括换行符  
file.readlines([sizeint])  
&emsp;读取所有行并返回列表，若给定sizeint>0，返回总和大约为sizeint字节的行, 实际读取值可能比 sizeint 较大, 因为需要填充缓冲区  
file.seek(offset[, whence])  
&emsp;设置文件当前位置  
file.tell()  
&emsp;返回文件当前位置  
file.truncate([size])  
&emsp;从文件的首行首字符开始截断，截断文件为 size 个字符，无 size 表示从当前位置截断；截断之后后面的所有字符被删除，其中 Widnows系统下的换行代表2个字符大小  
file.write(str)  
&emsp;将字符串写入文件，返回的是写入的字符长度  
file.writelines(sequence)  
&emsp;向文件写入一个序列字符串列表，如果需要换行则要自己加入每行的换行符  

