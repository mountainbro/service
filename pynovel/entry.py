# _*_ coding: utf-8 _*_
import requests
import urllib
# from urllib import urlencode 这是 python2 的写法
from urllib.parse import urlencode


word=input('请输入搜索词')
url='http://www.baidu.com.cn/s?wd='+urllib.parse.quote(word)+'&pn=0'
print(url)

response = urllib.request.urlopen(url)

page = response.read()
print(page)
