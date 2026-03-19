import urllib.request
import json
import os

token = ""
try:
    with open('../bak.env') as f:
        for line in f:
            if line.startswith('SUPERADMIN_PASSWORD='):
                pw = line.strip().split('=', 1)[1]
                req = urllib.request.Request("http://localhost:8000/api/auth/login", method="POST")
                req.add_header("Content-Type", "application/json")
                req.add_header("x-nishify-client", "superadmin")
                data = json.dumps({"username": "superadmin", "password": pw}).encode("utf-8")
                resp = urllib.request.urlopen(req, data=data)
                token = json.loads(resp.read())["access_token"]
except Exception as e:
    pass

req = urllib.request.Request("http://localhost:8000/api/invoice/options")
req.add_header("x-nishify-client", "pioneer_dev")
if token:
    req.add_header("Authorization", f"Bearer {token}")

try:
    resp = urllib.request.urlopen(req)
    print(json.dumps(json.loads(resp.read()), indent=2))
except Exception as e:
    print(f"FAILED: {e}")
