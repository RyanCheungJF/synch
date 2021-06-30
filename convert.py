f = open("easylist.rst","r")
f_out = open("easy_list.json","w")
arr = []

while 1:
    try:
        content = f.readline()
        if content == "":
            break
        arr.append('\"' + "".join(content) + '\"')
    except Exception:
        pass

f_out.write(("{"+','.join(arr) + "}"))
f.close()
f_out.close()
