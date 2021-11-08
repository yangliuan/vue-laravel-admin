#!/bin/sh
#查找 src目录下的所有vue和js文件并自动修复错误
find ./src \( -name "*.vue" -o -name "*.js" \) -exec ./node_modules/.bin/eslint --fix {} \;
