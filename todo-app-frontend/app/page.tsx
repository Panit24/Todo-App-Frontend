import { getAllTodos } from '@/api';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';

export default async function Home() {
  const tasks = await getAllTodos();
  // console.log('tasks', tasks);
  return (
    <main>
      <div className=' flex  flex-col'>
        <br />
        <div className='flex justify-start px-3'>
          <h1 className='font-bold text-xl text-primary'>To-Do List App</h1>
        </div>
        <TodoList tasks={tasks} />
      </div>
    </main>
  );
}
