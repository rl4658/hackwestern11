// src/components/Schedule/utils/ScheduleUtils.js

export function parseJsonSchedule(jsonString) {
    try {
        const data = JSON.parse(jsonString);
        if (data.schedules && Array.isArray(data.schedules)) {
            // Convert each schedule's tasks into the format expected by your components
            return data.schedules.map((scheduleTasks) => convertTasksToSchedule(scheduleTasks));
        } else {
            console.error('Invalid JSON structure: schedules array not found');
            return null;
        }
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

// Helper function to convert tasks into schedule format
// src/components/Schedule/utils/ScheduleUtils.js

export function convertTasksToSchedule(tasks) {
    const schedule = {};
    tasks.forEach((task) => {
        const startDate = new Date(task.TaskStartTime);
        const endDate = new Date(task.TaskEndTime);
        const day = startDate.toLocaleDateString('en-US', { weekday: 'long' });
        const startHour = startDate.getHours();
        const endHour = endDate.getHours();

        if (!schedule[day]) {
            schedule[day] = {};
        }

        // Fill in all hours between start and end time
        for (let hour = startHour; hour <= endHour; hour++) {
            schedule[day][hour] = task.TaskName;
        }
    });
    return schedule;
}




export function generateScheduleFromPrompt(prompt) {
    // TODO: Implement logic to generate a schedule from a text prompt
    // This could involve natural language processing or a more structured input format
    return {};
}

export function generateUniqueSchedules(count, existingSchedules = []) {
    // TODO: Implement logic to generate unique schedules
    // This could involve randomization and checking against existing schedules
    return Array(count).fill().map(() => ({}));
}

