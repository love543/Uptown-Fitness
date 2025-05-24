// Responsive Navbar Toggle for Mobile
document.addEventListener('DOMContentLoaded', function() {
  // Create mobile menu toggle
  const header = document.querySelector('.header');
  if (header) {
    // Create toggle elements if they don't exist
    if (!document.querySelector('.nav-toggle')) {
      const navToggle = document.createElement('input');
      navToggle.type = 'checkbox';
      navToggle.id = 'nav-toggle';
      navToggle.className = 'nav-toggle';
      
      const navToggleLabel = document.createElement('label');
      navToggleLabel.setAttribute('for', 'nav-toggle');
      navToggleLabel.className = 'nav-toggle-label';
      navToggleLabel.innerHTML = '☰';
      
      // Insert toggle before the mid section
      const midSection = header.querySelector('.mid');
      if (midSection) {
        header.insertBefore(navToggle, midSection);
        header.insertBefore(navToggleLabel, midSection);
        
        // Toggle menu on click
        navToggle.addEventListener('change', function() {
          if (this.checked) {
            midSection.style.maxHeight = '400px';
            midSection.style.overflow = 'visible';
            midSection.style.margin = '15px 0';
          } else {
            midSection.style.maxHeight = '0';
            midSection.style.overflow = 'hidden';
            midSection.style.margin = '0';
          }
        });
      }
    }
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle && navToggle.checked) {
          navToggle.checked = false;
          const midSection = document.querySelector('.mid');
          if (midSection) {
            midSection.style.maxHeight = '0';
            midSection.style.overflow = 'hidden';
            midSection.style.margin = '0';
          }
        }
      }
    });
  });
  
  // Add active class to navbar items based on current page
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.navbar a').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || 
        (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Add smooth transition effect when scrolling
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > lastScrollTop && currentScrollTop > 80) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    if (currentScrollTop <= 80) {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScrollTop;
  });
});

// Original form handling code
$('#form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(800);
    
  });
