import { render } from '@testing-library/react';
import TasksList from './components/TasksList';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

it('should display a list of tasks', () => {
  render(<TasksList tasks={[
    { name: 'Task 1', priority: 1, isDone: false },
    { name: 'Task 2', priority: 2, isDone: false },
    { name: 'Task 3', priority: 3, isDone: false },
  ]} />);

  const tasks = document.querySelectorAll('.tasks-item');
  expect(tasks.length).toBe(3);
});

it('should display a task with the given name and priority', () => {
  render(<TasksList tasks={[
    { name: 'My new task', priority: 1, isDone: false },
  ]} />);

  const tasks = document.querySelectorAll('.tasks-item');
  expect(tasks.length).toBe(1);

  const task = tasks[0];
  expect(task.querySelector('.tasks-item__name').textContent).toBe('My new task');
  expect(task.querySelector('.tasks-item__priority').textContent).toBe('Priority: High');
});

it('should allow users to edit a task', async () => {
  render(<TasksList tasks={[
    { name: 'Task 1', priority: 1, isDone: false },
  ]} />);

  const task = document.querySelector('.tasks-item');
  const editButton = task.querySelector('.tasks-item__btn-edit');
  await act(async () => {
    editButton.click();
  });
  const inputBlock = task.querySelector('.tasks-item__input');
  const submitButton = task.querySelector('.tasks-item__btn-submit');
  inputBlock.value = 'Task 2';
  await act(async () => {
    submitButton.click();
  });
  expect(inputBlock.value).toBe('Task 2');
});

it('should allow users to delete a task', async () => {
  const data = (await axios.get('http://localhost:4444/task')).data;
  render(<TasksList tasks={data}/>);
  const tasks = document.querySelectorAll('.tasks-item');
  const task = tasks[0];
  const deleteButton = task.querySelector('.tasks-item__btn-delete');

  await act(async () => {
    deleteButton.click();
  })

  expect(tasks.length).toBe(data.length);
});