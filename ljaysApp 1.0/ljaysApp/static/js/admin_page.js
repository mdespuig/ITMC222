function toggleInsertForm() {
    const form = document.getElementById("insertForm");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

function cancelInsert() {
    document.getElementById("insertForm").style.display = "none";
    document.getElementById("insertForm").reset();
}

function toggleSelectAll(source) {
    let checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(cb => cb.checked = source.checked);
}