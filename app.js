emailjs.init('6105ej4o8V5uQIoAA');

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) {
    console.error('Contact form element not found');
    return;
  }
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (!submitButton) return;
    
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> Sending...';
    
    // Validate form inputs
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Clear previous errors
    clearErrors();
    
    let isValid = true;
    
    if (!name) {
      showError('name', 'Please enter your name');
      isValid = false;
    }
    
    if (!email) {
      showError('email', 'Please enter your email');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email');
      isValid = false;
    }
    
    if (!subject) {
      showError('subject', 'Please enter a subject');
      isValid = false;
    }
    
    if (!message) {
      showError('message', 'Please enter your message');
      isValid = false;
    }
    
    if (!isValid) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
      return;
    }
    
    // Prepare email data
    const formData = {
      to_email: '2165959782@qq.com',
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    };
    
    // Send email using EmailJS
    emailjs.send('service_lyx16oq', 'template_um5k7dq', formData)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        submitButton.innerHTML = '<i class="fa fa-check mr-2"></i> Message Sent!';
        
        // Reset button after 3 seconds
        setTimeout(function() {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
        }, 3000);
        
        // Reset form
        contactForm.reset();
        
      }).catch(function(error) {
        console.log('FAILED...', error);
        
        // Show error message
        submitButton.innerHTML = '<i class="fa fa-exclamation-circle mr-2"></i> Send Failed';
        submitButton.classList.add('bg-red-500');
        
        // Re-enable button after 3 seconds
        setTimeout(function() {
          submitButton.disabled = false;
          submitButton.innerHTML = originalText;
          submitButton.classList.remove('bg-red-500');
        }, 3000);
      });
  });
  
  // Helper functions for error handling
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    const errorElement = document.createElement('div');
    errorElement.className = 'text-red-500 text-sm mt-1';
    errorElement.id = `${fieldId}-error`;
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
    field.classList.add('border-red-500');
  }
  
  function clearErrors() {
    const errorElements = document.querySelectorAll('[id$="-error"]');
    errorElements.forEach(el => el.remove());
    
    const inputFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    inputFields.forEach(field => field.classList.remove('border-red-500'));
  }
});