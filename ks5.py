import urllib
import json
import hashlib

def isFloat(val):
  try:
    float(val)
    return True
  except:
    return False


response = urllib.urlopen('http://193.63.182.244/api/v1/ks5/?format=json&api_key=d0281bdfcb39ce0d35e9cc954aed8c73e6928289&limit=1000')
json = json.loads(response.read())
students = json["objects"]

f = open('hashes', 'w')

f.write("\n".join([hashlib.md5("".join([key[4:] for key, val in student.iteritems() if key.startswith("KS5") and val != None and not val.isdigit() and not isFloat(val)])).hexdigest() + ":" + ",".join([key[4:] for key, val in student.iteritems() if key.startswith("KS4") and val != None and not val.isdigit() and not isFloat(val)]) for student in students]))

f.close()
