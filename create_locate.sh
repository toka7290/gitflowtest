#!/bin/bash

mkdir -p dist
langfiles=(`find ./locate -type f -name *.lang`)
langages=(`find ./locate -type f -name *.lang -exec basename {} .lang \;`)

# IFS=,; 
# mkdir -p ./dist/${langages[*]}
# str="$(IFS=,; mkdir -p "${langages[*]}")"
# mkdir -p {$str}

target=index.html

cp -r ./icons ./img ./css ./js ./lib ./favicon.ico ./index.html ./dist/

# for lang in ${langages[@]}
for ((i=0;i<${#langages[@]};i++))
do
    echo ${langfiles[i]}
    mkdir -p ./dist/${langages[i]}/${langages[i]}
    cp ./html/$target ./dist/${langages[i]}/$target
    python3 replace.py ./dist/${langages[i]}/ $target ${langfiles[i]}
done