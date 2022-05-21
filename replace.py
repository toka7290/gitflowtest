import sys
import re


args = sys.argv
if len(args) < 2:
    sys.exit()

source_file = open(args[1], "r", encoding='UTF-8')
lang_file = open(args[2], "r", encoding='UTF-8')

html_source = source_file.read()
source_file.close()

# print(html_source)
datalist = lang_file.readlines()
for data in datalist:
    # data = data.replace('\n', '')
    data = re.sub('\n$', '', data)
    if('=' in data):
        key = data.split("=", 1)
        # print(key[1])
        html_source = html_source.replace("{{"+key[0]+"}}", key[1])


write_file = open(args[1], "w", encoding='UTF-8')
write_file.write(html_source)
write_file.close()

lang_file.close()
