let tasks = document.querySelectorAll('.task');
let taskSections = document.querySelectorAll('.task-section');
let task = null;

// Drag start and Drag end events for the draggable task elements.
tasks.forEach(task => {
  task.addEventListener('dragstart', dragStart);
  task.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
  console.log('drag start', this);
  task = this;
  this.className += ' hold';
  setTimeout(() => {
    this.className = 'invisible';
  }, 0);
}

function dragEnd(e) {
  console.log('drag end');
  this.className = 'task';
}

// Drag over, Drag enter, Drag leave and Drop events for the task sections.
taskSections.forEach(section => {
  section.addEventListener('dragover', dragOver);
  section.addEventListener('dragenter', dragEnter);
  section.addEventListener('dragleave', dragLeave);
  section.addEventListener('drop', dragDrop);
});

function dragOver(e) {
  e.preventDefault();
  console.log('drag over');
}

function dragEnter(e) {
  e.preventDefault();
  console.log('drag enter');
  this.className += ' hovered';
}

function dragLeave() {
  console.log('drag leave');
  this.className = 'task-section';
}

function dragDrop() {
  console.log('drop');
  this.className = 'task-section';
  this.appendChild(task);
}