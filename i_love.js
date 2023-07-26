const interactiveText = document.getElementById('interactive-text');
const imageCenterToggle = document.getElementById('image-center-toggle');
const imageLinkToggle = document.getElementById('image-link-toggle');
const imageSwitch = document.getElementById('image-switch');

// Event listener for the image switch
imageSwitch.addEventListener('change', () => {
  if (imageSwitch.checked) {
    // Use the black image and change text color to white
    imageCenterToggle.src = 'i_love-black.png';
    interactiveText.style.color = 'white';
    document.body.style.backgroundColor = 'rgb(18, 18, 18)'; // Change background color to dark blue
  } else {
    // Use the white image and change text color back to black
    imageCenterToggle.src = 'i_love-white.png';
    interactiveText.style.color = 'black';
    document.body.style.backgroundColor = 'rgb(236, 236, 236)'; // Change background color back to light gray
  }
});

// Event listeners for the clickable image link
imageLinkToggle.addEventListener('mouseenter', () => {
  imageLinkToggle.src = '2-back.png';
});

imageLinkToggle.addEventListener('mouseleave', () => {
  imageLinkToggle.src = '1-back.png';
});

// Event listener for clicking the top-left image
const topImageLink = document.getElementById('image-link');
topImageLink.addEventListener('click', () => {
    window.open('https://www.uberfordert.com', '_blank');
});


const buyButton = document.querySelector('.buy-button button');
buyButton.addEventListener('click', () => {
  // Replace the URL below with the actual PayPal page link
  window.open('https://www.paypal.com/your_paypal_link_here', '_blank');
});

paypal.Buttons({
  style: {
    shape: 'pill',
    color: 'gold',
    layout: 'horizontal',
    label: 'paypal',
  },
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: '10.00', // Replace this with the actual purchase amount
        },
      }],
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      // Implement the success behavior here (e.g., redirect to a success page, show a success message, etc.)
      console.log('Payment successful');
    });
  }
}).render('#paypal-button-container');