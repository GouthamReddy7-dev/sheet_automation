import gspread
from google.oauth2.service_account import Credentials

scopes=["https://www.googleapis.com/auth/spreadsheets"]
creds=Credentials.from_service_account_file("credentials.json",scopes=scopes)
client=gspread.authorize(creds)

sheet_id="1TnRWR6mbanxiUvSlOOPJ38CI8EUQpAytZE3C3JgQGVM"

sheet=client.open_by_key(sheet_id).sheet1

values=sheet.get_all_values()
headers=values[1]
print(headers)
#print(values)

name="Ashok Sadhu"
date="29-Jul-26"
leave_type="PL"
#list(map(lambda x:x.lower(),headers))
try:
    col=headers.index(name)+1
except ValueError:
    print("Employee Not Found")  

row=None

for i,record in enumerate(values[5:],start=6):
    if record[1]==date:
        row=i
        break

if row is None:
    print("Date is Not Found")
else:
    sheet.update_cell(row,col,leave_type)
print("Done")