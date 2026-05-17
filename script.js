// ── File input: show selected filename ──
const fileInput = document.getElementById('file-input');
const fileDisplay = document.getElementById('file-name-display');

fileInput.addEventListener('change', function () {
    if (this.files && this.files[0]) {
        fileDisplay.textContent = this.files[0].name;
        fileDisplay.classList.add('visible');
    } else {
        fileDisplay.textContent = '';
        fileDisplay.classList.remove('visible');
    }
});

// ── Form validation + submit ──
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');
const submitBtn = document.getElementById('submit-btn');

function validateField(input, groupId) {
    const group = document.getElementById(groupId);
    if (!group) return true;
    const valid = input.checkValidity() && input.value.trim() !== '';
    group.classList.toggle('has-error', !valid);
    input.classList.toggle('invalid', !valid);
    return valid;
}

// Validate on blur (after user leaves a field)
document.getElementById('name').addEventListener('blur', function () {
    validateField(this, 'group-name');
});
document.getElementById('email').addEventListener('blur', function () {
    validateField(this, 'group-email');
});
document.getElementById('message').addEventListener('blur', function () {
    validateField(this, 'group-message');
});

// Clear error on input
['name', 'email', 'message'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', function () {
        const groupId = 'group-' + id;
        const group = document.getElementById(groupId);
        if (group && this.value.trim() !== '') {
            group.classList.remove('has-error');
            this.classList.remove('invalid');
        }
    });
});

// Submit
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameValid = validateField(document.getElementById('name'), 'group-name');
    const emailValid = validateField(document.getElementById('email'), 'group-email');
    const messageValid = validateField(document.getElementById('message'), 'group-message');

    if (!nameValid || !emailValid || !messageValid) return;

    // ── Swap button to loading state ──
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    // ── TODO: replace this timeout with your actual form submission ──
    // e.g. fetch('/api/contact', { method: 'POST', body: new FormData(form) })
    setTimeout(function () {
        form.style.display = 'none';
        successMsg.classList.add('visible');
    }, 1200);
});
