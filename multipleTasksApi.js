
(async function () {
  let taskSections = document.querySelectorAll('.task-section');

  let data = await fetch('data.json').then(response => response.json());
  // console.log(data);
  if (data && data.data && data.data.tasks && data.data.tasks.length) {
    console.log(data.data.tasks);
    let tasksArray = data.data.tasks;
    tasksArray.forEach(task => {
      let taskElement = document.createElement('div');
      taskElement.draggable = true;
      taskElement.textContent = task.name;
      taskElement.className = 'task';
      switch (task.status) {
        case 'todo':
          taskSections[0].appendChild(taskElement);
          break;
        case 'inprogress':
          taskSections[1].appendChild(taskElement);
          break;
        case 'qa':
          taskSections[2].appendChild(taskElement);
          break;
        case 'done':
          taskSections[3].appendChild(taskElement);
          break;
      }
    });


    let tasks = document.querySelectorAll('.task');
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
  }
})();
