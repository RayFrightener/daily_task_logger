document.getElementById('goalForm').addEventListener('submit', async function(event){
    event.preventDefault();
    const goalName = document.getElementById('goalName').value;

    try {
        const response = await fetch('/api/forms/submitGoal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: goalName }),
        });

        if (response.ok) {
            const newGoal = await response.json();
            const goalsList = document.getElementById('goalsList');
            const newGoalItem = document.createElement('li');
            newGoalItem.textContent = newGoal.name;
            goalsList.appendChild(newGoalItem);
            document.getElementById('goalName').value = '';
        } else {
            console.error('Error saving goal:', response.statusText);
        }
    } catch (error) {
        console.error('Error saving goal:', error);
    }
});