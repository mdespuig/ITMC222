function enableEdit() {
    document.getElementById('display-section').style.display = 'none';
    document.getElementById('edit-form').style.display = 'block';
    togglePositionField();
}

function cancelEdit() {
    window.location.reload();
}

function togglePositionField() {
    const userType = document.getElementById('user_type').value;
    const positionField = document.getElementById('position');
    positionField.disabled = (userType === 'customer');
}