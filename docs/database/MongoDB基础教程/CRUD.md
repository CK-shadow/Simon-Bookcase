---
title: CRUD
tags: 
 - CRUD
categories: frontEnd
---

**插入  db.集合名称.insert(document)**  
插入文档时，如果不指定_id参数，MongoDB会为文档分配一个唯一的ObjectId
* 例1.db.example.insert({name:"Simon", age:23})
          
**简单查询 db.集合名称.find()**  
    
**更新 db.集合名称.update([query], [update], {multi : [boolean]})**
* 参数query：查询条件，类似于sql语句中的where部分被
* 参数update：更新操作符，类似于sql语句中的set部分
* 参数multi：默认值为false表示只更新查询到的第一条数据，true表示全文档更新
    * 例1.   全文档更新 
      * db.example.update({name : "Simon", name : "CK"})
    * 例2.   指定属性更新通过操作符$set
      * db.example.insert({name : "TY", age : 23})
      * db.example.update({name : "TY"}, {$set:{name : "LL"}})
    * 例3.   修改多条匹配到的数据
      * db.example.update({age : 23}, {$set : {address : "HG"}}, {multi : true})
    
**保存 db.集合名称.save(document)**  
如果文档的_id已经存在则修改，如果文档的_id不存在则是添加
          
**删除 db.集合名称.remove([query], {justOne : [boolean})**  
参数query可选，删除的文档的条件  
参数justOne可选，如果设为true或者1，则只删除一条，默认是false删除多条

