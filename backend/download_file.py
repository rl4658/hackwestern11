from flask import Flask, send_file, request, jsonify

FILE_PATH = "user_schedule_csv/example_schedule.csv"

def download_file():
    """
    API endpoint to handle file downloads.
    Expects a POST request. Returns the file for download.
    """
    try:
        # Serve the file as an attachment
        return send_file(FILE_PATH, as_attachment=True)
    except FileNotFoundError:
        return jsonify({"error": "File not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


