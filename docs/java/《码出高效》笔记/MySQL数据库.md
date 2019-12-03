---
title: MySQL数据库
tags: 
 - MySQL
categories: frontEnd
---

## 建表规约
1. <font color=red>[强制]</font> 表达是与否概念的字段，必须使用is_xxx的方式命名，数据类型是 unsigned tinyint 
2. <font color=red>[强制]</font> 表名、字段名必须是小写字母或者数字，禁止出现数字开头，禁止两个下划线之间只出现数字
3. <font color=red>[强制]</font> 表名不使用复数名词
4. <font color=red>[强制]</font> 禁用保留字，如 desc、range、match、delayed 等
5. <font color=red>[强制]</font> 主键索引为pk_字段名，唯一索引为uk_字段名，普通索引为idx_字段名
6. <font color=red>[强制]</font> 小数类型为decimal，禁用float和double
7. <font color=red>[强制]</font> 如果存储的字符串长度几乎相等，使用char定长字符串类型
8. <font color=red>[强制]</font> varchar 是可变长字符串，不预先分配存储空间，长度不要超过 5000，如果存储长 度大于此值，定义字段类型为 text，独立出来一张表，用主键来对应，避免影响其它字段索 引效率 
9. <font color=red>[强制]</font> 表必备三字段：id, gmt_create, gmt_modified
10. <font color=orange>[推荐]</font> 表的名称最好是"业务名称_表的左右"
11. <font color=orange>[推荐]</font> 库名与应用名称尽量一致
12. <font color=orange>[推荐]</font> 如果修改字段含义或对字段表示的状态追加时，需要即使更新字段注释
13. <font color=orange>[推荐]</font> 字段允许适当冗余，以提高查询性能，但必须考虑数据一致。冗余字段应遵循： 
   * 不是频繁修改的字段
   * 不是varchar类型的字段，更不能是text类型的字段
14. <font color=orange>[推荐]</font> 单表行数超过 500 万行或者单表容量超过 2GB，才推荐进行分库分表
15. <font color=green>[参考]</font> 合适的字符存储长度，不但节约数据库表空间、节约索引存储，更重要的是提示检索速度 
        
## 索引规约
1. <font color=red>[强制]</font> 业务上具有唯一特性的字段，即使是多个字段的组合，也必须建成唯一索引
2. <font color=red>[强制]</font> 超过三个表禁止join
3. <font color=red>[强制]</font> 在varchar字段上建立索引时，必须指定索引长度，没必要对全字段建立索引，根据实际文本区分度建立即可
4. <font color=red>[强制]</font> 页面搜索严禁左模糊或者全模糊，如果需要请走搜索引擎来解决
5. <font color=red>[强制]</font> 如果有order by的场景，请注意利用索引的有序性
6. <font color=orange>[推荐]</font> 利用覆盖索引来进行查询操作，避免回表
7. <font color=orange>[推荐]</font> 利用延迟关联或者子查询优化超多分页场景
8. <font color=orange>[推荐]</font> SQL 性能优化的目标：至少要达到 range 级别，要求是 ref 级别，如果可以是 consts 最好
   * consts 单表中最多只有一个匹配行（主键或者唯一索引），在优化阶段即可读取到数据
   * ref 指的是使用普通的索引（normal index）
   * range 对索引进行范围检索。
9. <font color=orange>[推荐]</font> 建组合索引时，区分度最高的在最左边
10. <font color=orange>[推荐]</font> 防止因字段类型不同造成的隐式转换，导致索引失效
11. <font color=green>[参考]</font> 创建索引时避免有如下极端索引
    * 宁滥勿缺。认为一个查询就需要建一个索引
    * 宁缺勿滥。认为索引会消耗空间、严重拖慢更新和新增速度
    * 抵制惟一索引。认为业务的惟一性一律需要在应用层通过“先查后插”方式解决
                  
## SQL语句
1. <font color=red>[强制]</font> 不要使用 count(列名)或 count(常量)来替代 count(*)
2. <font color=red>[强制]</font> count(distinct col) 计算该列除 NULL 之外的不重复行数
3. <font color=red>[强制]</font> 当某一列的值全是 NULL 时，count(col)的返回结果为 0，但 sum(col)的返回结果为 NULL，因此使用 sum()时需注意 NPE 问题
4. <font color=red>[强制]</font> 使用 ISNULL()来判断是否为 NULL 值
5. <font color=red>[强制]</font> 在代码中写分页查询逻辑时，若 count 为 0 应直接返回，避免执行后面的分页语句
6. <font color=red>[强制]</font> 不得使用外键与级联，一切外键概念必须在应用层解决
7. <font color=red>[强制]</font> 禁止使用存储过程，存储过程难以调试和扩展，更没有移植性
8. <font color=red>[强制]</font> 数据订正（特别是删除、修改记录操作）时，要先 select，避免出现误删除，确认 无误才能执行更新语句
9. <font color=orange>[推荐]</font> in 操作能避免则避免，若实在避免不了，需要仔细评估 in 后边的集合元素数量，控 制在 1000 个之内
10. <font color=orange>[推荐]</font> 如果有国际化需要，所有的字符存储与表示，均以 utf-8 编码，注意字符统计函数 的区别
11. <font color=green>[参考]</font> TRUNCATE TABLE 比 DELETE 速度快，且使用的系统和事务日志资源少，但 TRUNCATE 无事务且不触发 trigger，有可能造成事故，故不建议在开发代码中使用此语句
                  
## ORM映射
1. <font color=red>[强制]</font> 在表查询中，一律不要使用 * 作为查询的字段列表，需要哪些字段必须明确写明
2. <font color=red>[强制]</font> POJO 类的布尔属性不能加 is，而数据库字段必须加 is_，要求在 resultMap 中进行 字段与属性之间的映射
3. <font color=red>[强制]</font> 不要用 resultClass 当返回参数，即使所有类属性名与数据库字段一一对应，也需 要定义；反过来，每一个表也必然有一个 POJO 类与之对应
4. <font color=red>[强制]</font> sql.xml 配置参数使用：#{}， #param# 不要使用${} 此种方式容易出现 SQL 注入
5. <font color=red>[强制]</font> iBATIS 自带的 queryForList(String statementName,int start,int size)不推 荐使用
6. <font color=red>[强制]</font> 不允许直接拿 HashMap 与 Hashtable 作为查询结果集的输出
7. <font color=red>[强制]</font> 更新数据表记录时，必须同时更新记录对应的 gmt_modified 字段值为当前时间
8. <font color=orange>[推荐]</font> 不要写一个大而全的数据更新接口
9. <font color=orange>[推荐]</font> @Transactional 事务不要滥用。事务会影响数据库的 QPS，另外使用事务的地方需 要考虑各方面的回滚方案，包括缓存回滚、搜索引擎回滚、消息补偿、统计修正等