#!/bin/sh

# --------------------
echo '>>> 定义变量'
# --------------------
APP_PORT=4005
APP_NAME=ddyy-common-business-react


# --------------------
echo '>>> 部署应用'
# --------------------
NODE_ENV=dev yarn

yarn build
[ $? -ne 0 ] && echo '编译失败，退出' && exit

pm2 ls | grep $APP_NAME
if [ $? -eq 0 ]; then
    pm2 reload $APP_NAME
else
    NODE_ENV=production pm2 start --name $APP_NAME  --log-date-format 'YYYY-MM-DD HH:mm:ss' ./node_modules/.bin/next -- start -p $APP_PORT
fi


# --------------------
echo '>>> 测试一下'
# --------------------
sleep 3 #待待服务启动或重启完成
curl https://api.diandianyy.com/ddyy-common-business-react/
