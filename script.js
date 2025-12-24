particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#4A90E2', '#7EB4E8', '#2C5AA0']
        },
        shape: {
            type: ['circle', 'triangle'],
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.3,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#4A90E2',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

function createSnowflake() {
    const snowContainer = document.getElementById('snow-container');
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';
    
    snowflake.style.left = Math.random() * 100 + '%';
    const size = Math.random() * 0.5 + 0.5;
    snowflake.style.fontSize = size + 'em';
    snowflake.style.opacity = Math.random() * 0.6 + 0.3;
    const duration = Math.random() * 10 + 10;
    snowflake.style.animationDuration = duration + 's';
    
    snowContainer.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

setInterval(createSnowflake, 200);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
        hero.style.opacity = 1 - scrolled / 700;
    }
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.info-card, .stat-card, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});


const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const x = e.pageX - button.offsetLeft;
        const y = e.pageY - button.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});


const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const style = document.createElement('style');
style.textContent = '.cursor-glow { position: fixed; width: 20px; height: 20px; border-radius: 50%; background: radial-gradient(circle, rgba(74, 144, 226, 0.5), transparent); pointer-events: none; transform: translate(-50%, -50%); transition: width 0.3s, height 0.3s; z-index: 9999; }';
document.head.appendChild(style);


const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            const value = parseInt(number.textContent);
            if (!isNaN(value)) {
                animateCounter(number, value);
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});


document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.info-card, .stat-card, .contact-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;
            
            card.style.transform = 'perspective(1000px) rotateY(' + xPercent + 'deg) rotateX(' + (-yPercent) + 'deg) translateZ(10px)';
        }
    });
});

document.querySelectorAll('.info-card, .stat-card, .contact-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});


const footer = document.querySelector('footer p');
if (footer) {
    const year = new Date().getFullYear();
    footer.innerHTML = '&copy; ' + year + ' Cloud Developer. Все права защищены.';
}

console.log('%c👋 Привет! Я Cloud Developer', 'font-size: 20px; font-weight: bold; color: #4A90E2;');
console.log('%cЕсли ты видишь это, значит ты разбираешься в коде 😉', 'font-size: 14px; color: #7EB4E8;');
console.log('%cДавай работать вместе!', 'font-size: 16px; font-weight: bold; color: #2C5AA0;');
