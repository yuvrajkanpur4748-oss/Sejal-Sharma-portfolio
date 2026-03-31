document.addEventListener('DOMContentLoaded', () => {
    // Typing Animation
    const typingText = document.getElementById('typing-text');
    const text = "Turning Logic into Code";
    let index = 0;

    function type() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    type();

    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;
    const speed = 0.1;

    function animateCursor() {
        const distX = mouseX - ballX;
        const distY = mouseY - ballY;
        
        ballX = ballX + (distX * speed);
        ballY = ballY + (distY * speed);
        
        cursorGlow.style.left = ballX + 'px';
        cursorGlow.style.top = ballY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Intersection Observer for Scroll Reveal
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove if you want it to re-animate when scrolling back up
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(section => {
        revealObserver.observe(section);
    });

    // Intersection Observer for Skills Progress Bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const progress = entry.target.querySelector('.progress');
            if (entry.isIntersecting) {
                const targetWidth = progress.getAttribute('data-width');
                progress.style.width = targetWidth;
            } else {
                progress.style.width = '0';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-item').forEach(item => {
        skillObserver.observe(item);
    });

    // Smooth Scrolling with Offset
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            window.scrollTo({
                top: targetElement.offsetTop - navHeight,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
                document.querySelector('.burger').classList.remove('toggle');
            }
        });
    });

    // Mobile Menu Toggle
    const burger = document.createElement('div');
    burger.classList.add('burger');
    burger.innerHTML = `
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
    `;
    document.querySelector('.nav-container').appendChild(burger);

    burger.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('mobile-active');
        burger.classList.toggle('toggle');
    });
});
