import pymongo
import hashlib

def isFloat(value):
  try:
    float(value)
    return True
  except:
    return False

def a_level_hash(student):
  return hashlib.md5(a_level_string(student)).hexdigest()

def a_level_string(student):
  return "".join(key[4:] for (key, value) in student.iteritems() if value != None and key.startswith("KS5") and not value.isdigit() and not isFloat(value) and key != "KS5_GENDER" and not key.startswith("KS5_GAS"))

def gcse_string(student):
  return ",".join(key[4:] for (key, value) in student.iteritems() if value != None and key.startswith("KS4") and not value.isdigit() and not isFloat(value))

connection = pymongo.Connection('localhost', 27017)

db = connection.schools_db
collection = db.ks5

students = collection.find()

f = open("hashes", "w")
f.write("\n".join(a_level_hash(student) + ":" + gcse_string(student) for student in students))
f.write("\n")
