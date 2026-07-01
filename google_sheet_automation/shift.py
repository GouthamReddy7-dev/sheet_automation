import gspread
from google.oauth2.service_account import Credentials
import pandas as pd
scopes=["https://www.googleapis.com/auth/spreadsheets"]
creds=Credentials.from_service_account_file("credentials.json",scopes=scopes)
client=gspread.authorize(creds)

sheet_id="1Jgud4gU38mgZ7VHAA4qQKRxNyHr0uB_9ECiURWngw_M"

sheet=client.open_by_key(sheet_id).sheet1

values = sheet.get_all_values()

data = pd.DataFrame(values[4:])

print(data)

mappings={
    "OM": "OA",
    "OA": "ON",
    "ON": "OM"
}
data.iloc[:, 3:25] = data.iloc[:, 3:25].replace(mappings)

sheet.update(
    range_name="A5",
    values=data.values.tolist()
)

print("Shift allocation updated successfully.")