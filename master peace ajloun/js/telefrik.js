let counter = 1;
setInterval(() => {
  document.getElementById('radio1-' + counter).checked = true;
  document.getElementById('radio2-' + counter).checked = true;
  document.getElementById('radio3-' + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 2000); // Change image every 5 seconds
document.getElementById('open-popup').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'block';
});

document.getElementById('close-popup').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
});


document.querySelectorAll('.bookingForm').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const service = this.dataset.service;
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const date = this.querySelector('input[type="date"]').value;
    const guests = this.querySelector('input[type="number"]').value;

    // Show loading indicator
    document.getElementById('loadingIndicator').style.display = 'block';

    // Simulate API call
    setTimeout(() => {
      // Hide loading indicator
      document.getElementById('loadingIndicator').style.display = 'none';

      // Display summary
      const summaryContent = `
                        <div class="summary-item"><strong>Service:</strong> ${service.replace('_', ' ').toUpperCase()}</div>
                        <div class="summary-item"><strong>Name:</strong> ${name}</div>
                        <div class="summary-item"><strong>Email:</strong> ${email}</div>
                        <div class="summary-item"><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</div>
                        <div class="summary-item"><strong>Guests:</strong> ${guests}</div>
                    `;
      document.getElementById('summaryContent').innerHTML = summaryContent;
      document.getElementById('summarySection').style.display = 'block';

      // Reset form
      this.reset();
    }, 2000); // Simulating a 2-second delay
  });
});

// Dynamic date validation
document.querySelectorAll('input[type="date"]').forEach(dateInput => {
  dateInput.addEventListener('input', function () {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(this.value);
    if (selectedDate < today) {
      this.setCustomValidity('Please select a future date');
    } else {
      this.setCustomValidity('');
    }
  });
});

// Dynamic guest number validation
document.querySelectorAll('input[type="number"]').forEach(guestInput => {
  guestInput.addEventListener('input', function () {
    const maxGuests = 10;
    if (this.value > maxGuests) {
      this.setCustomValidity(`Maximum ${maxGuests} guests allowed`);
    } else {
      this.setCustomValidity('');
    }
  });
});
