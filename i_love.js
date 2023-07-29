const interactiveText = document.getElementById('interactive-text');
const imageCenterToggle = document.getElementById('image-center-toggle');
const imageLinkToggle = document.getElementById('image-link-toggle');
const imageSwitch = document.getElementById('image-switch');

imageSwitch.addEventListener('change', () => {
  if (imageSwitch.checked) {
    imageCenterToggle.src = 'i_love-black.png';
    interactiveText.style.color = 'white';
    document.body.style.backgroundColor = 'rgb(18, 18, 18)';
  } else {
    imageCenterToggle.src = 'i_love-white.png';
    interactiveText.style.color = 'black';
    document.body.style.backgroundColor = 'rgb(236, 236, 236)';
  }
});

imageLinkToggle.addEventListener('mouseenter', () => {
  imageLinkToggle.src = '2-back.png';
});

imageLinkToggle.addEventListener('mouseleave', () => {
  imageLinkToggle.src = '1-back.png';
});

const buyButton = document.querySelector('.buy-button button');
buyButton.addEventListener('click', () => {
  window.open('https://www.paypal.com/sdk/js?client-id=Adqe_kZLmfknC3FVKQ9rME3Rwa3q-99Y7OtNht9MY2UMRy_sp8owMH1r0GQ2GbSSOXR_xx-_GvrSa5Rq&currency=EUR', '_blank');
});

// Create the PayPal button and render it in the 'paypal-button-container' div
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
          value: '10.00',
        },
      }],
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      console.log('Payment successful');
    });
  }
}).render('#paypal-button-container');
