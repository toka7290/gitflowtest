#!/bin/bash

mkdir -p dist
langfiles=(`find ./locate -type f -name *.lang`)
langages=(`find ./locate -type f -name *.lang -exec basename {} .lang \;`)

# IFS=,; 
# mkdir -p ./dist/${langages[*]}
# str="$(IFS=,; mkdir -p "${langages[*]}")"
# mkdir -p {$str}

target=index.html

cp -r ./icons ./img ./css ./js ./lib ./favicon.ico ./dist/


# for lang in ${langages[@]}
for ((i=0;i<${#langages[@]};i++))
do
    langages[i]=${langages[i],,}
    echo ${langfiles[i]}
    mkdir -p ./dist/${langages[i]}/
    cp ./html/$target ./dist/${langages[i]}/$target
    cp ./serviceworker.js ./dist/${langages[i]}/serviceworker.js
    cp ./json/webapp.webmanifest ./dist/${langages[i]}/webapp.webmanifest
    python3 replace.py ${langfiles[i]} ./dist/${langages[i]}/ $target webapp.webmanifest
done