
            function toggleAnswer(element) {
                const answer = element.nextElementSibling;
                const icon = element.querySelector('i');
                
                // Toggle active class
                element.classList.toggle('active');
                
                // Toggle icon
                if (icon.classList.contains('fa-plus')) {
                    icon.classList.replace('fa-plus', 'fa-minus');
                } else {
                    icon.classList.replace('fa-minus', 'fa-plus');
                }
                
                // Toggle answer visibility
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null;
                } else {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            
            }