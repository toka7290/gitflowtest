import sys
import re
import json


args = sys.argv
if len(args) < 2:
    sys.exit()

source_file = open(args[1]+args[2], "r", encoding='UTF-8')
lang_file = open(args[3], "r", encoding='UTF-8')

html_source = source_file.read()
source_file.close()

json_data = {}


def setJson(json_dat, key_name, index=0, data=""):
    if index < len(key_name)-1:
        # print(key_name[index] in json_dat)
        if(key_name[index] in json_dat):
            res = json_dat[key_name[index]]
        else:
            res = {}
        setJson(res, key_name, index+1, data)
        json_dat[key_name[index]] = res
    else:
        json_dat[key_name[index]] = data
    # return json_dat


# print(html_source)
# for
# datalist = lang_file.readlines()
for data in lang_file:
    # data = data.replace('\n', '')
    # print(repr(data))
    data = re.sub('\n$', '', data)
    if('=' in data):
        key = data.split("=", 1)
        # print(key[1])
        html_source = html_source.replace("{{"+key[0]+"}}", key[1])
        if("script." in data):
            key = data.split("=", 1)
            key[0] = re.sub('^script\.', '', key[0])
            tree = key[0].split(".")
            # print(tree)
            # print(repr(key[1].replace('\\"', "\"")))
            setJson(json_data, tree, 0, key[1].replace('\\"', "\""))

# print(r's"')
# print(json_data)
with open(args[1]+"lang.json", "w") as f:
    json.dump(json_data, f, ensure_ascii=False)

write_file = open(args[1]+args[2], "w", encoding='UTF-8')
write_file.write(html_source)
write_file.close()

lang_file.close()
