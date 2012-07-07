import urllib
import json
import re

def parse_qual_details(qual_name, help_text):
  matched = re.match("Grade achieved (in|at)( Full)? (GCE )?(GCSE|AS Level|A Level) (.*)\.", help_text)
  if matched == None: return None
  else: return ";".join([qual_name, matched.group(4), matched.group(5)])


api_url = "http://193.63.182.244/api/v1/ks5/schema/?format=json&api_key=d0281bdfcb39ce0d35e9cc954aed8c73e6928289"

response = urllib.urlopen(api_url)

jsonD = json.loads(response.read())
quals = jsonD["fields"]

print "\n".join([parse_qual_details(qual_name, qual_info["help_text"]) for qual_name, qual_info in quals.iteritems() if parse_qual_details(qual_name, qual_info["help_text"]) != None])
