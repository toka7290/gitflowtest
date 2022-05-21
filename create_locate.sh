#!/bin/bash

mkdir -p dist
langfiles=(`find ./locate -type f`)
langages=(`find ./locate -type f -exec basename {} .lang \;`)

# IFS=,; 
# mkdir -p ./dist/${langages[*]}
# str="$(IFS=,; mkdir -p "${langages[*]}")"
# mkdir -p {$str}

target=index.html

# for lang in ${langages[@]}
for ((i=0;i<${#langages[@]};i++))
do
    echo ${langfiles[i]}
    mkdir -p ./dist/${langages[i]}
    cp ./html/$target ./dist/${langages[i]}/$target
    python3 replace.py ./dist/${langages[i]}/$target ${langfiles[i]}
done