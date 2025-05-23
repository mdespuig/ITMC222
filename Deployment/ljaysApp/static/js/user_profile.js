function enableEdit() {
    document.getElementById('display-section').style.display = 'none';
    document.getElementById('edit-form').style.display = 'block';
}

function cancelEdit() {
    window.location.reload();
}