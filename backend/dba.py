from django.db import transaction
import backend.models as m
import logging

logger = logging.getLogger(__name__)


def db_get_poet(dynasty=None):
    response = {"poets": []}
    if dynasty:
        with transaction.atomic():
            all_poest = m.Poet.objects.filter(dynasty=dynasty).values('id', 'name', 'intro').order_by("id")
            for poet in all_poest:
                item = {
                    "id": poet["id"],
                    "name": poet["name"],
                    "intro": poet["intro"]
                }
                response["poets"].append(item)
    else:
        logger.warning("WARNING: db_get_poet 参数 dynasty 为 None")

    return response


def db_get_intro(poet_id=None):
    response = {"name": "", "intro": ""}

    if poet_id:
        with transaction.atomic():
            item = m.Poet.objects.get(id=poet_id)
            response["name"] = item.name
            response["intro"] = item.intro
    else:
        logger.warning("WARNING: db_get_intro 参数 poet_id 为 None")

    return response


def db_get_poetry(poet_id=None):
    response = {"poetry": []}

    if poet_id:
        with transaction.atomic():
            all_poetry = m.Poetry.objects.filter(dynasty=poet_id["dynasty"], author=poet_id["author"]).order_by("id")
            for poetry in all_poetry:
                item = {
                    "id": poetry.id,
                    "title": poetry.title,
                    "content": poetry.content
                }
                response["poetry"].append(item)
    else:
        logger.warning("WARNING: db_get_poetry 参数 poet_id 为 None")

    return response


def db_get_xu_all():
    response = {"All": []}

    with transaction.atomic():
        all_poetry = m.TeacherXu.objects.all().order_by("id")
        for poetry in all_poetry:
            item = {
                "id": poetry.id,
                "title_zh": poetry.title_zh,
                "content_zh": poetry.content_zh[0:20],
                "title_en": poetry.title_en,
            }
            response["All"].append(item)

    return response


def db_get_xu_inside(id):
    response = {
        "title_zh": "",
        "content_zh": "",
        "title_en": "",
        "content_en": "",
        "create_time": "",
        "remark": ""
    }
    if id:
        with transaction.atomic():
            thing = m.TeacherXu.objects.get(id=id)
            response["title_zh"] = thing.title_zh
            response["content_zh"] = thing.content_zh
            response["title_en"] = thing.title_en
            response["content_en"] = thing.content_en
            response["create_time"] = thing.create_time
            response["remark"] = thing.remark_content
    else:
        logger.warning("WARNING: db_get_xu_inside 参数 id 为 None")

    return response
