from flask import Flask, request, jsonify
from flask_cors import CORS
from UserQuery import UserQuery
from schedule_generation import process_schedule_request, write_to_file
from convert_csv_json import csv_to_json
import os

app = Flask(__name__)
CORS(app)

@app.route('/process_query', methods=['POST'])
def process_query():
    data = request.get_json()
    query_string = data.get('query')

    if not query_string:
        return jsonify({'error': 'No query provided'}), 400

    # Create UserQuery object and process the query
    user_query = UserQuery()
    user_query.add_query(query_string)
    query = user_query.to_string()

    # Process the query to generate schedule CSVs
    process_schedule_request(query)

    write_to_file()

    # Directory where the CSVs are saved
    csv_directory = 'possible_schedule_csv'

    # Ensure the CSV directory exists
    if not os.path.exists(csv_directory):
        return jsonify({'error': 'CSV directory not found'}), 500

    # Convert the generated CSV files to JSON and collect them
    schedule_jsons = []
    for i in range(1, 6):
        csv_file = os.path.join(csv_directory, f'schedule_option_{i}.csv')
        json_file = os.path.join('temp_json', f'schedule_option_{i}.json')

        # Ensure the CSV file exists
        if not os.path.exists(csv_file):
            return jsonify({'error': f'{csv_file} not found'}), 500

        # Convert CSV to JSON
        tasks = csv_to_json(csv_file, json_file)
        schedule_jsons.append(tasks)

    # Return the array of tasks as JSON
    return jsonify({'schedules': schedule_jsons})

if __name__ == '__main__':
    app.run(debug=True)
