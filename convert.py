f = open("easylist.rst","r")
f_out = open("easy_list_4.json","w")
arr = []
id = 1

while 1:
    try:
        data = f.readline()
        
        if data == "":
            break
        if "\\" in data:
            data = data.replace("\\","\\\\")
        if "\"" in data:
            data = data.replace("\"","\\\"")
        if "@@||" in data:
            data = data.replace("@@||","")
        if "@@" in data:
            data=data.replace("@@","")
        if "{" and "}" in data:
            data = data.replace("{","")
            data = data.replace("}","")
        content = "{"+"\"id\""+":%s,"%(id) + "\"priority\""+": 1,"+"\"action\""+": { \"type\": \"block\" },"+"\"condition\""+":{\"urlFilter\":" + "\"%s\", \"resourceTypes\": [\"sub_frame\",\"image\"]}}\n"%(data.strip('\n'))
        if "https://" in data:
            data = data.replace("https://"," ")
        arr.append(content)

        id +=1
    except Exception:
        pass

f_out.write(("["+','.join(arr) + "]").strip('\n'))
f.close()
f_out.close()

"""{
"id": 2,
"priority": 1,
"action": { "type": "block" },
"condition": {"urlFilter":"*googlesyndication.com/*", "resourceTypes": ["main_frame"] }
}"""
