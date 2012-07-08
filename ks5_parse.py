import pymongo
import hashlib

def isFloat(value):
  try:
    float(value)
    return True
  except:
    return False

def a_level_string(keys):
  return "".join(key[4:] for key in keys if key.startswith("KS5") and not key.startswith("KS5_GAS") and key != "KS5_GENDER")

def gcse_string(keys):
  return ",".join(key[4:] for key in keys if key.startswith("KS4"))

def exam_string(student):
  keys = [key for (key, value) in student.iteritems() if value != None and not str(value).isdigit() and not isFloat(value)]
  if keys == []: return ""
  keys.sort()

  a_s = a_level_string(keys)

  if a_s == "": return ""
  
  g_s = gcse_string(keys)
  a_h = hashlib.md5(a_s).hexdigest()

  return a_h + ":" + g_s

connection = pymongo.Connection('localhost', 27017)

db = connection.schools_db
collection = db.ks5

students = collection.find(limit=50)

f = open("hashes", "w")
f.write("\n".join(filter(lambda x: x != "", (exam_string(student) for student in students if a_level_string(student) != ""))))
f.write("\n")
