import pandas as pd
import json


df = pd.read_csv("2025 Spring CSE Routine _ Consultation v1.0 [forStudent] - Tabular.csv")
columns_to_drop = ['Unnamed: 1','Unnamed: 2','Unnamed: 10', 'Unnamed: 11', 'Unnamed: 12']
df = df.drop(columns_to_drop, axis=1)

df = df.rename(columns={
  "IF YOU FIND ANY MISMATCH, FOLLOW USIS.":"Course-Section",
  "Unnamed: 3":"Initial",
  "Unnamed: 4":"Theory-Day",
  "Unnamed: 5":"Theory-Start-Time",
  "Unnamed: 6":"Theory-Room",
  "Unnamed: 7":"Lab-Day",
  "Unnamed: 8":"Lab-Time",
  "Unnamed: 9":"Lab-Room"
})
df=df.iloc[1:].reset_index(drop=True)

df_cleaned = df.where(pd.notna(df), None)

result2 = df_cleaned.groupby('Course-Section').apply(lambda x: x.drop('Course-Section', axis=1).to_dict(orient='records')[0]).to_dict()
json_output2 = json.dumps(result2, indent=4)
print(json_output2)

with open('routine.json', 'w') as f:
    json.dump(result2, f, indent=4)