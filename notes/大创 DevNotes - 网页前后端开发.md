# 大创 DevNotes - 网页前后端开发

written by *Jason Zhang*

## 工程相关

### django 相关指令

* 创建工程：`django-admin startproject web_site`
* 创建后端应用：`python manage.py startapp backend`
* 启动本地服务器：`python manage.py runserver localhost:1234`

### django 全局设置

`settings.py`：
```python
ALLOWED_HOSTS = ['*']

TEMPLATES = [
    {
        'DIRS': ['frontend/'],
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'USER': 'root',
        'PASSWORD': 'zhangyun',
        'HOST': 'localhost',
        'PORT': '3306',
        'NAME': 'test',
    }
}

LANGUAGE_CODE = 'zh-hans'

TIME_ZONE = 'Asia/Shanghai'

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/static')
]
```

### url 路由逻辑

工程主要分为前端和后端部分，后端 django 管理前端路由，通过在 `urls.python` 中编写路由逻辑，将对应的 url 转发到 backend 应用下 `view.py` 的对应函数，进行页面渲染返回。

url -> urls.python下的path -> backend中view.py对应函数 -> 返回渲染的页面。

## 开发日记

### 2018.10.22 记录

* 初步配置了 django 工程
* 下载了第三方 Bootstrap 模板 Regna.zip
* 修改 Regna 模板，使其支持了被 django 启动
* 改变 Regna 模板的团队部分为5人

### 2018.10.23 记录

* 初步修改主页内容
* 搜寻次级页面的模板