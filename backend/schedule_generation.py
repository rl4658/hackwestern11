import os
import json
from openai import OpenAI
import time
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def write_to_file():
    """
    Write content of OpenAI files to CSV files in the specified directory
    
    Args:
        base_directory (str): Directory path where CSV files will be saved
    """
    # Ensure the directory exists
    
    # Get the list of files
    file_objects = get_file_list()
    
    # Iterate through the files
    for i, file_object in enumerate(file_objects, 1):
        # Construct the full file path
        file_path = 'possible_schedule_csv/schedule_option_' + str(i) + '.csv'
        
        try:
            # Retrieve the file content
            content = client.files.content(file_object.id).text
            
            # Write the content to the file
            with open(file_path, "w", encoding='utf-8',newline='') as file:
                file.write(content)
            
            print(f"Successfully wrote content to {file_path}")
        
        except Exception as e:
            print(f"Error writing file {file_path}: {e}")

def get_file_list():
    """
    Extract file IDs from the assistant's messages
    """
    file_object_list = client.files.list(
        order="desc",
        limit=5,
    )

    return file_object_list.data



def create_schedule_assistant():
    """
    Create an OpenAI Assistant for schedule management
    """
    file = client.files.create(
        file=open("user_schedule/example_schedule.csv", "rb"),
        purpose='assistants'
    )

    assistant = client.beta.assistants.create(
        name="Schedule Manager",
        instructions=(
            "You are an assistant that helps manage and modify weekly schedules based on user input. "
            "You can generate, read, interpret, update, and always return five different CSV files containing schedule information based solely on user requests, without requerying any external sources. Ensure that the schedules you provide are meaningfully different and provide distinct options for the user to choose from.\n\n"
            "The CSV files will not have headers and will have the following structure:\n"
            "- The first column: Name of the event\n"
            "- The second column: Date (start)\n"
            "- The third column: Date (end)\n"
            "- The fourth column: Location\n"
            "- The fifth column: Notes\n\n"
            "Given a CSV file with current schedule data as well as a user's natural language request, provide five non-overlapping possible schedules based on the request, ensuring variety in the structure of each proposed schedule, so that the user has different options to consider.\n\n"
            "# Steps\n\n"
            "1. Accept the CSV data and read the content.\n"
            "2. Interpret the user's request and think about each individual schedule generate five meaningfully different schedules that do not overlap with existing events.\n"
            "3. Save the generated data into five new modified CSV files named `schedule_option_1.csv`, `schedule_option_2.csv`, `schedule_option_3.csv`, `schedule_option_4.csv`, and `schedule_option_5.csv`.\n"
            "4. Allow the user to download all five updated CSV files.\n\n"
            "# Output Format\n\n"
            "Respond with links to download the five distinct CSV files as follows:\n"
            "- \"schedule_option_1.csv\"\n"
            "- \"schedule_option_2.csv\"\n"
            "- \"schedule_option_3.csv\"\n"
            "- \"schedule_option_4.csv\"\n"
            "- \"schedule_option_5.csv\"\n\n"
            "# Notes\n\n"
            "- Each of the five schedules must be distinct and non-overlapping, providing meaningful options (e.g., different timings, location changes, different arrangements) to the user.\n"
            "- Ensure that the modification process is clearly communicated to the user, and that any errors during manipulation are presented with clear instructions on how to correct them.\n"
            "- Never re-query or retrieve new schedule data from other sources; only use the provided CSV for modifications."
        ),
        tools=[{"type": "code_interpreter"}],
        model="gpt-4-turbo"
    )

    return assistant, file

def process_schedule_request(query):
    """
    Process a schedule modification request and return file IDs
    """
    assistant = None
    input_file = None

    try:
        # Create assistant and input file
        assistant, input_file = create_schedule_assistant()

        # Create a thread
        thread = client.beta.threads.create()

        # Send the message to the thread with the file attached
        message = client.beta.threads.messages.create(
            thread_id=thread.id,
            role="user",
            content=query,
            attachments=[{
                "tools": [{"type": "code_interpreter"}],
                "file_id": input_file.id
            }]
        )

        # Run the assistant
        run = client.beta.threads.runs.create(
            thread_id=thread.id,
            assistant_id=assistant.id
        )

        # Wait for run completion
        while run.status not in ["completed", "failed"]:
            run = client.beta.threads.runs.retrieve(
                thread_id=thread.id,
                run_id=run.id
            )
            time.sleep(1)

        

    except Exception as e:
        print(f"An error occurred: {e}")
        return []

    finally:
        # Clean up resources
        if assistant is not None:
            client.beta.assistants.delete(assistant.id)
        if input_file is not None:
            client.files.delete(input_file.id)

