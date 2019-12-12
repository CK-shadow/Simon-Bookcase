---
title: JSON的支持
tags: 
 - SpringMVC
 - JSON
categories: frontEnd
---

### JSON的支持
SpringMVC支持java对象自动转换JSON对象（需导入jackson相关jar包）
```
@RequestMapping(value="/index") 
@ResponseBody 
public User getUser(){ 
    User user=new User("Simon"); 
    return user; 
}
```
        
