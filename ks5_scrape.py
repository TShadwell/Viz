import urllib
import json
import hashlib
import time
import re
import pymongo
from threading import Timer

connection = pymongo.Connection("localhost", 27017)
db = connection.schools_db
collection = db.ks5

def scrape(start_iter, end_iter):
  api_url = 'http://193.63.182.244/api/v1/ks5/?format=json&api_key=d0281bdfcb39ce0d35e9cc954aed8c73e6928289&limit=1000&offset=' + str(start_iter)

  i = start_iter
  while i < end_iter:
    response = urllib.urlopen(api_url)
    try:
      jsonD = json.loads(response.read())
      students = jsonD["objects"]
      collection.insert(students)

      api_url = "http://193.63.182.244" + jsonD["meta"]["next"]
      api_url =  re.sub("limit=1000&limit=1000", "limit=1000", api_url)
      api_url = re.sub("(&?offset=\d*)*&offset=", "&offset=", api_url)
      print str(i) + " out of " + str(end_iter)
      i += 1000
      time.sleep(2)
    except:
      print "ERROR"
      print api_url
      print response.read()
      break

  print "Completed start: " + str(start_iter)

#f = open('options', 'a')
#scrape(0, 1077929)
#f.close()

max_iter = 1077929
Timer(0, lambda: scrape(0, 250000)).start() 
Timer(0, lambda: scrape(250001, 500000)).start()
Timer(0, lambda: scrape(500001, 750000)).start()
Timer(0, lambda: scrape(750001, max_iter)).start()
