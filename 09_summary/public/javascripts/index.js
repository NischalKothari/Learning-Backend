function animateCard(card) {
  card.style.transform = "scale(0.95)";
  setTimeout(() => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  }, 150);
}

function changeTheme(theme) {
  const themes = {
    sunset: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
    purple: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    pink: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    blue: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    green: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  };

  document.body.style.background = themes[theme];

  // Add a pulse effect
  document.body.style.transform = "scale(1.02)";
  setTimeout(() => {
    document.body.style.transform = "scale(1)";
  }, 200);
}

function createParticles() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.width = Math.random() * 10 + 5 + "px";
    particle.style.height = particle.style.width;
    particle.style.background = `hsl(${Math.random() * 360}, 70%, 70%)`;
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1000";
    particle.style.animation = `float ${
      Math.random() * 3 + 2
    }s ease-out forwards`;

    document.body.appendChild(particle);

    setTimeout(() => {
      if (document.body.contains(particle)) {
        document.body.removeChild(particle);
      }
    }, 5000);
  }
}

function resetAnimation() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, index) => {
    card.style.animation = "none";
    setTimeout(() => {
      card.style.animation = `slideInCard 0.8s ease-out ${
        index * 0.1
      }s forwards`;
    }, 10);
  });
}

// Add some interactive mouse effects
document.addEventListener("mousemove", (e) => {
  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.02;
    const x = e.clientX * speed;
    const y = e.clientY * speed;
    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    createParticles();
  }
  if (e.key === "r" || e.key === "R") {
    resetAnimation();
  }
});
