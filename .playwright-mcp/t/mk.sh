#!/bin/bash
cd /home/user/Claude/.playwright-mcp/t && python3 -c 'import json,sys;t=open("tpl2.js").read();print(t.replace("__MSGS__",json.dumps(sys.argv[1:],ensure_ascii=False)))' "$@" > x.js
