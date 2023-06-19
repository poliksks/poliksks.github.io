const boxes = document.querySelectorAll('.box');
const squares = document.querySelectorAll('.square');

let currentBox = null;

for (let i = 0; i < boxes.length; i++) {
  const box = boxes[i];

  box.addEventListener('dragstart', function() {
    currentBox = this;
    this.classList.add('dragging');
  });
  
  box.addEventListener('dragend', function() {
    this.classList.remove('dragging');
  });
}
for (let i = 0; i < squares.length; i++) {
    const square = squares[i];
  
    square.addEventListener('dragover', function(event) {
      event.preventDefault();
    });
    
    square.addEventListener('dragenter', function() {
      this.classList.add('hovered');
    });
    
    square.addEventListener('dragleave', function() {
      this.classList.remove('hovered');
    });
    
    square.addEventListener('drop', function() {
      if (currentBox) {
        this.appendChild(currentBox);
        currentBox = null;
      }
      this.classList.remove('hovered');
    });
  }
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];
  
    box.addEventListener('click', function() {
      alert(`This box should be moved to the ${i+1}th square.`);
    });
  }