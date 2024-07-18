document.getElementById("currentYear").textContent = new Date().getFullYear();

var softSkills = document.getElementById('softSkills');

var skills = [
  'CURIOSITY-DRIVEN ',
  'HONEST',
  'HOLISTIC VIEW',
  'PROBLEM SOLVER',
];

var typewriter = new Typewriter(softSkills, {
  loop: false,
  delay: 75,
});

// Loop through skills and add them to the typewriter
skills.forEach((skill, index) => {
  if (index < skills.length - 1) {
    typewriter.typeString(`<div class="bg-soft-skills">${skill}</div><p></p>`)
              .pauseFor(300);
  } else {
    typewriter.typeString(`<div class="bg-soft-skills cursor-visible">${skill}</div>`)
              .pauseFor(300);
  }
});

// Start typing
typewriter.start();
