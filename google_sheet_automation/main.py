import gspread
from google.oauth2.service_account import Credentials

scopes=["https://www.googleapis.com/auth/spreadsheets"]
creds=Credentials.from_service_account_file("credentials.json",scopes=scopes)
client=gspread.authorize(creds)

sheet_id="1SBj6p6g0U4iZ77r20hqkyflaTIVMEsGguq3ufjQRaHk"

sheet=client.open_by_key(sheet_id).sheet1

values=sheet.get_all_values()
headers=values[0]
name="harsha"
date="14-Jul-2026"
leave_type="SL"
try:
    col=headers.index(name)+1
except ValueError:
    print("Employee not found")


row=None

for i,record in enumerate(values[1:],start=2):
    if record[0]==date:
        row=i
        break

if row is None:
    print("No date found")


sheet.update_cell(row,col,leave_type)

print("Done Successful")
print(values)