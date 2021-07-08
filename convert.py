f = open("easylist.rst","r")
f_out = open("easy_list_3.json","w")
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
        content = "{"+"\"id\""+":%s,"%(id) + "\"priority\"" + ": 1,"+"\"action\""+": { \"type\": \"block\" }," + "\"condition\"" + ": {\"urlFilter\":" + "\"{}\"".format(data) + ", \"resourceTypes\": [\"sub_frame\",\"image\",\"script\",\"main_frame\"]}}"

        arr.append("".join(content))

        id +=1
    except Exception:
        pass

f_out.write(("["+','.join(arr) + "]"))
f.close()
f_out.close()

"""{
"id": 2,
"priority": 1,
"action": { "type": "block" },
"condition": {"urlFilter":"*googlesyndication.com/*", "resourceTypes": ["main_frame"] }
}"""
