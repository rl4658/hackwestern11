import csv
import json

def csv_to_json(csv_file, json_file):
    """
    Converts a CSV file (without headers) to a JSON file of tasks.
    CSV format: TaskName, TaskStartTime, TaskEndTime, TaskLocation, TaskDescription
    """
    tasks = []
    with open(csv_file, mode='r') as file:
        reader = csv.reader(file)
        for row in reader:
            task = {
                "TaskName": row[0],
                "TaskStartTime": row[1],
                "TaskEndTime": row[2],
                "TaskLocation": None if row[3] == "None" else row[3],
                "TaskDescription": None if row[4] == "None" else row[4]
            }
            tasks.append(task)


    with open(json_file, mode='w') as file:
        json.dump(tasks, file, indent=2)
    print(f"Successfully converted {csv_file} to {json_file}")


def json_to_csv(json_file, csv_file):
    """
    Converts a JSON file of tasks to a CSV file (without headers).
    """
    with open(json_file, mode='r') as file:
        tasks = json.load(file)

    with open(csv_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        for task in tasks:
            writer.writerow([
                task.get("TaskName", "None"),
                task.get("TaskStartTime", "None"),
                task.get("TaskEndTime", "None"),
                task.get("TaskLocation", "None") if task.get("TaskLocation") is not None else "None",
                task.get("TaskDescription", "None") if task.get("TaskDescription") is not None else "None"
            ])
    print(f"Successfully converted {json_file} to {csv_file}")


# Example Usage:
if __name__ == "__main__":
    # Convert CSV to JSON
    print
    csv_to_json('user_schedule_csv/example_schedule.csv', 'test/test.json')
    # Convert JSON to CSV
    

