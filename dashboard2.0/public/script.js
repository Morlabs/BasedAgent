(function() {
    "use strict";

    document.addEventListener("DOMContentLoaded", function() {
        // Email form submission handling
        const emailForm = document.querySelector('.email-form');
        if (emailForm) {
            emailForm.addEventListener('submit', function(e) {
                e.preventDefault();
                var form = e.target;
                var formData = new FormData(form);
                fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(function(response) {
                    if (response.ok) {
                        // Show the modal
                        var modal = document.getElementById("successModal");
                        if (modal) {
                            modal.style.display = "block";
                            // Close the modal
                            var closeBtn = document.querySelector('.close');
                            if (closeBtn) {
                                closeBtn.onclick = function() {
                                    modal.style.display = "none";
                                };
                            }
                            // Close the modal if the user clicks anywhere outside of the modal
                            window.onclick = function(event) {
                                if (event.target == modal) {
                                    modal.style.display = "none";
                                }
                            };
                        }
                        form.reset();
                    } else {
                        alert('There was a problem with your submission. Please try again.');
                    }
                }).catch(function(error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again later.');
                });
            });
        }

        // JavaScript to create and position dots
        const numberOfDots = 30; // Adjust the number of dots as needed
        const container = document.querySelector('.animation-container');
        if (container) {
            for (let i = 0; i < numberOfDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                positionDot(dot);
                container.appendChild(dot);

                // Randomize animation delay to create a more dynamic effect
                dot.style.animationDelay = `${Math.random() * 5}s`;

                // Reposition the dot at the end of each animation cycle
                dot.addEventListener('animationiteration', function() {
                    positionDot(dot);
                });
            }
        }

        function positionDot(dot) {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            dot.style.left = `${x}%`;
            dot.style.top = `${y}%`;
        }

        // JavaScript for hamburger menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navbarMenu = document.querySelector('.navbar-menu');
        if (hamburger && navbarMenu) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navbarMenu.classList.toggle('active');
            });

            // Close the menu when a menu item is clicked on mobile
            navbarMenu.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navbarMenu.classList.remove('active');
                });
            });
        }
    });
})();