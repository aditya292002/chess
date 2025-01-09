import csv
import json

# Input and output file names
csv_file = 'first_1000_records.csv'  # Replace with your CSV file name
json_file = 'data.js'

# Read CSV and convert to JSON array
data = []
with open(csv_file, mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    for row in reader:
        data.append(row)

# Write JSON array to a .js file
with open(json_file, mode='w', encoding='utf-8') as file:
    file.write('const data = ' + json.dumps(data, indent=4) + ';')

print(f'Data successfully written to {json_file}')
