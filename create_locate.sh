#!/bin/bash
mkdir -p dist
langfiles=(`find ./locate -type f`)
langages=(`find ./locate -type f -exec basename {} .lang \;`)

IFS=,; 
mkdir -p ${langages[*]}
# str="$(IFS=,; mkdir -p "${langages[*]}")"
# mkdir -p {$str}

target=index.html

# for lang in ${langages[@]}
for ((i=0;i<${#langages[@]};i++))
do
    echo ${langfiles[i]}
    cp ./html/$target ./${langages[i]}/$target
    python3 replace.py ./${langages[i]}/$target ${langfiles[i]}
done