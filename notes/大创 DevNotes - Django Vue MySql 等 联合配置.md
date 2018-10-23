# 大创之 - Django、Vue、MySql… 联合配置 - 开发笔记

written by *Jason Zhang*

> 经过长时间学习 Vue（npm工程化开发），发现在缺乏前端工程化经验的前提下，学习Vue的成本过高。\
> 经过综合考量，本大创的重点在于数据分析，而非前端工程。
>
> 故决定放弃前端 npm管理Vue项目 的方案，转为传统前端 html、css、js 开发。
>
> 2018.10.21

## 2018.10.15 开发笔记

### 关于：前端数据可视化

数据可视化找到了两款工具，ECharts 和 Highcharts，查阅[知乎相关问题](https://www.zhihu.com/question/21438840)发现：ECharts 的 Bug 较多，文档不友好（百度系通病），而 Highcharts 稳定性、文档、上手更友好，并且[非商用用途免费](https://highcharts.com.cn/license)。

故决定，使用 Highcharts 进行开发。

> [Highcharts 中文官网](https://www.hcharts.cn/)

### 关于 Django2 的教程

可以参考官方中文文档

> [Django2 教程-中文](https://docs.djangoproject.com/zh-hans/2.1/intro/)

## 2019.10.20 开发笔记

### 联调记录

#### 创建**项目**：

```
django-admin startproject test_web
```

#### 启动服务器：

```
py manage.py runserver
```

> 会自动重新加载的服务器 runserver
> 
> 用于开发的服务器在需要的情况下会对每一次的访问请求重新载入一遍 Python 代码。所以你不需要为了让修改的代码生效而频繁的重新启动服务器。然而，一些动作，比如添加新文件，将不会触发自动重新加载，这时你得自己手动重启服务器。

#### 创建**应用**：

```
py manage.py startapp vue_app1
```

#### **天坑！Django 2.X + MySql 8.x 连接问题！！！**

首先django连接mysql，需要python包mysqlclient，直接pip装大概率失败，可以使用.whl安装（Windows系统）

> [.whl自行下载](https://www.lfd.uci.edu/~gohlke/pythonlibs/)

其次，mysql8默认的密码方式django2不认识，需要进行修改，修改只可以使用脚本如下（不能直接用GUI客户端修改）：

```sql
# 选择mysql库
USE mysql;
# 修改加密方式
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'zhangyun';
# 刷新数据库
FLUSH PRIVILEGES;
```

django设置：
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'test',
        'USER': 'root',
        'PASSWORD': 'zhangyun',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

> 参考链接：[Django2.x连接MySQL8.x方法与各种错误解析](https://blog.csdn.net/w18211679321/article/details/82709460)
> 
> 注：此链接中SQL脚本不正确，正确脚本见本dev_note中所述

#### 需要事先 migrate 默认django表

```
python manage.py migrate
```

#### 创建网站管理的admin

```
py manage.py createsuperuser
```

修改 `settings.py` 中的

```python
LANGUAGE_CODE = 'zh-hans'
```

可配置为中文

#### 进行 vue + django 配置

踩坑非常多，多到怀疑人生……\
最终成功结合了两者

工具说明：
* Python 3.6.6
* Django 2.1
* Vue-Cli 3

配置说明：

1. django生成项目，并生成应用 `backend`

2. 在django项目目录下，使用vue-cli进行生成应用`frontend`，配置为使用vue router以及vuex，其他模块默认（带babel，eslint）

3. 在vue工程下，新建文件`vue.config.js`，内容为
    ```js
    // vue.config.js
    module.exports = {
        // 选项...
        assetsDir: 'static/',
    }
    ```
    这样做是因为，vuecli默认把静态资源打包到`dist/`下，django要想寻找到则困难无比。\
    为了django能够寻找到静态资源，这样的配置为必须（妥协）

4. 在django应用的`settings.py`里，找到TEMPLATES，更改其dir项为\
    `[os.path.join(BASE_DIR, 'frontend/dist')]`   \
    并设置其资源配置：
    ```python
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static')

    STATICFILES_DIRS = [
        os.path.join(BASE_DIR, 'frontend/dist/static/'),
    ]
    ```
5. 进入`urls.py`，编写django应用的路由逻辑，让ip直接跳转到单页面应用上
    ```python
    from backend import views as v

    urlpatterns = [
        path('admin/', admin.site.urls),
        path('', v.page_index),
    ]
    ```

6. 进入`backend`应用下的`views.py`编写响应逻辑
    ```python
    def page_index(request):
        return render(request, 'index.html')
    ```

7. vue可使用vue ui在线打包，打包后启动django即可正常访问页面，页面内vue路由正常，可以将icon放入`static\img`下，并在`index.html`中手动更改路径，解决网页图标显示问题。
