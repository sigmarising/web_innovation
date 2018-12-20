from langconv import *
import sqlite3
import pymysql
import networkx as nx
import matplotlib.pyplot as plt
import json

def simple2tradition(line):
    return Converter("zh-hant").convert(line)


def tradition2simple(line):
    return Converter("zh-hans").convert(line)


def is_chinese(line):
    for ch in line:
        if ch < '\u4e00' or ch > '\u9fff':
            return False
    return True

def get_degree(d):
    count = 0
    for key in d:
        if d[key] > 0:
            count += 1
    return count

# db = sqlite3.connect("CBDB_aw_20180831_sqlite.db")
# cur = db.cursor()

# query = "SELECT biog_main.c_personid, biog_main.c_birthyear, biog_main.c_deathyear, c_name_chn, c_alt_name, c_alt_name_chn FROM biog_main LEFT JOIN altname_data ON biog_main.c_personid = altname_data.c_personid"
# cur.execute(query)
# data = cur.fetchall()
# for record in data:
#     temp = []
#     for index in range(len(record)):
#         if isinstance(record[index], int):
#             temp.append(record[index])
#             continue
#         if (index == 1 or index == 2) and record[index] is None:
#             temp.append(0)
#             continue
#         if record[index] is None or not is_chinese(record[index]):
#             temp.append("")
#         else:
#             temp.append(tradition2simple(record[index]))
#     query = "INSERT INTO result_original VALUES (%d, '%s', '%s', '%s', '%s', '%s')" % tuple(temp)
#     cur.execute(query)
#
# db.commit()

# query = "SELECT c_personid, c_birthyear, c_deathyear, c_name_chn, GROUP_CONCAT(c_alt_name), GROUP_CONCAT(c_alt_name_chn) FROM result_original GROUP BY c_personid"
# cur.execute(query)
# data = cur.fetchall()
# for record in data:
#     temp = []
#     temp.append(record[0])
#     temp.append(record[1])
#     temp.append(record[2])
#     c_name_chn = record[3]
#     c_alt_name = record[4].lstrip(",").rstrip(",")
#     c_alt_name_chn = record[5].lstrip(",").rstrip(",")
#     c_names = c_name_chn
#     if c_alt_name != "":
#         c_names = c_names + "," + c_alt_name
#     if c_alt_name_chn != "":
#         c_names = c_names + "," + c_alt_name_chn
#     c_names = c_names.lstrip(",").rstrip(",")
#     if c_names == "":
#         continue
#     temp.append(c_names)
#     temp.append(c_name_chn)
#     if c_name_chn == "" or len(c_name_chn) <= 1:
#         continue
#     query = "INSERT INTO result VALUES (%d, %d, %d, '%s', '%s')" % tuple(temp)
#     cur.execute(query)
# db.commit()

# query = "SELECT * FROM result"
# cur.execute(query)
# data = cur.fetchall()
#
# names = {}
# for record in data:
#     c_personid = record[0]
#     c_birthyear = record[1]
#     c_deathyear = record[2]
#     c_names = record[3]
#     c_name_chn = record[4]
#     if c_name_chn in names:
#         names[c_name_chn].append([c_personid, c_birthyear, c_deathyear, c_names, c_name_chn])
#     else:
#         names[c_name_chn] = [[c_personid, c_birthyear, c_deathyear, c_names, c_name_chn]]
#
# for key in names:
#     record_list = sorted(names[key], key=lambda record: len(record[3]), reverse=True)
#     insert_record = record_list[0]
#     query = "INSERT INTO result_final VALUES (%d, %d, %d ,'%s', '%s')" % tuple(insert_record)
#     cur.execute(query)
# db.commit()
# cur.close()
# db.close()

db = pymysql.connect(host="localhost", user="root", password="sunjunwei1996", db="poem")
cur = db.cursor()
query = "SELECT DISTINCT author FROM poetry"
cur.execute(query)
authors = [record[0] for record in cur.fetchall()]

query = "SELECT GROUP_CONCAT(title), GROUP_CONCAT(content), author FROM poetry GROUP BY author"
cur.execute(query)
data = {record[2]:{"text": record[0] + record[1], "friends": {}} for record in cur.fetchall()}
for key in data:
    for author in authors:
        if author == key:
            data[key]["friends"][author] = 0
            continue
        data[key]["friends"][author] = data[key]["text"].count(author)

edges = []
for key in data:
    friends = data[key]["friends"]
    for friend in friends:
        weight = friends[friend]
        if weight > 0:
            edges.append((key, friend, weight))

g = nx.Graph()
g.add_nodes_from(authors)
g.add_weighted_edges_from(edges)
nodes = []
for node in g:
    if g.degree(node) < 10:
        nodes.append(node)
for node in nodes:
    g.remove_node(node)
temp = sorted(data.items(), key=lambda item:get_degree(item[1]["friends"]), reverse=True)
nx.draw_random(g, node_size=10, width=0.1)
plt.show()

n = {"nodes":[]}
e = {"edges":[]}

# for key in data:
#     friends = data[key]["friends"]
#     degree = get_degree(friends)
#     node = {}
#     node["name"] = key
#     node["value"] = degree
#     node["symbolSize"] = degree
#     node["label"] = {"show":True}
#     node["itemStyle"] = {"color":""}
#     n["nodes"].append(node)
#     for friend in friends:
#         if friends[friend] == 0:
#             continue
#         edge = {}
#         edge["source"] = key
#         edge["target"] = friend
#         edge["value"] = friends[friend]
#         edge["lineStyle"] = {"color":"source"}
#         e["edges"].append(edge)
degrees = []
for node in g.nodes:
    degrees.append(g.degree(node))

MAX = max(degrees)
MIN = min(degrees)
k = 59 / (MAX - MIN)
b = 1 - k * MIN


for node in g.nodes:
    point = {}
    point["name"] = node
    point["value"] = g.degree(node)
    point["symbolSize"] = k * g.degree(node) + b
    point["label"] = {"show": True}
    point["itemStyle"] = {"color": ""}
    n["nodes"].append(point)
for edge in g.edges:
    line = {}
    line["source"] = edge[0]
    line["target"] = edge[1]
    line["value"] = g.get_edge_data(edge[0], edge[1])["weight"]
    line["lineStyle"] = {"color": "source"}
    e["edges"].append(line)

f = open("nodes.json", "w", encoding="utf-8")
json.dump(n, f, ensure_ascii=False, indent=4)
f.close()

f = open("edges.json", "w", encoding="utf-8")
json.dump(e, f, ensure_ascii=False, indent=4)
f.close()