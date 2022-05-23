import sys
import re
import json


args = sys.argv
if len(args) < 4:
    sys.exit()

lang_root = args[2]

# load lang file
lang_path = args[1]
lang_file = open(lang_path, "r", encoding='UTF-8')
data_list = [re.sub('\n$', '', dat)
             for dat in lang_file.readlines() if ('=' in dat)]
lang_file.close()

# load index.html
index_path = lang_root+args[3]
source_file = open(index_path, "r", encoding='UTF-8')
html_source = source_file.read()
source_file.close()

manifest_path = lang_root+args[4]
manifest_file = open(manifest_path, "r", encoding='UTF-8')
manifest_source = manifest_file.read()
manifest_file.close()

# locate.json content
json_data = {}


def setJson(json_dat, key_name, index=0, data=""):
    if index < len(key_name)-1:
        if(key_name[index] in json_dat):
            res = json_dat[key_name[index]]
        else:
            res = {}
        setJson(res, key_name, index+1, data)
        json_dat[key_name[index]] = res
    else:
        json_dat[key_name[index]] = data


# replace lang key
for data in data_list:
    # split key and text
    key = data.split("=", 1)
    # replace html source
    html_source = html_source.replace("{{"+key[0]+"}}", key[1])
    # set locate.json content
    if("script." in data):
        # split key
        tree = re.sub('^script\.', '', key[0]).split(".")
        # set json data
        setJson(json_data, tree, 0, key[1].replace('\\"', "\""))
    # set webmanifest content
    if("webmanifest." in data):
        # replace manifest source
        manifest_source = manifest_source.replace("{{"+key[0]+"}}", key[1])

# write lang.json
with open(lang_root+"lang.json", "w") as f:
    json.dump(json_data, f, ensure_ascii=False)

# write index.html
write_file = open(index_path, "w", encoding='UTF-8')
write_file.write(html_source)
write_file.close()

# write index.html
write_file = open(manifest_path, "w", encoding='UTF-8')
write_file.write(manifest_source)
write_file.close()
