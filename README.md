# web_innovation

a web site for 大创

## Require

* Python 3.6
* Django 2.1
* pymysql 0.9.2
* MySQL 8

## How To Set Up

1. 安装 python 依赖包
2. 使用 `others/` 中提供的 sql 脚本建立 `gelai` 数据库
3. 调整 `web_site/settings.py` 中的数据库设置
4. 在根目录执行 `python manage.py runserver`

如果想要访问 人物时空可视化 页面，需要利用 tomcat 启动 jpkc 项目。\
如有必要，需修改 `frontend/route_map.html` 中 `iframe` 的引用源。

由于版权原因，jpkc 项目未列在本仓库中。

> 孙俊威贡献的代码，在 `others/sjw_handle` 中
