from json import dumps
dic={}
for line in open("quals"):
	fragments=line.split(";")
	if fragments[1] not in dic:
		dic[fragments[1]]={fragments[0]: fragments[1]}
	else:
		if("(" in fragments[2]):
			dic[fragments[1]][fragments[0].split("_")[1]]= \
			(lambda o: o.split("(")[0]+o.split(")")[1])(fragments[2].strip("\n"))
		else:
			dic[fragments[1]][fragments[0].split("_")[1]]= fragments[2].strip("\n")
print(dumps(dic))