import { ITask } from '@/types/tasks';
import Task from './Task';
import AddTask from './AddTask';

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className='p-2 flex flex-col overflow-y-auto justify-center border rounded-md border-gray-200 m-4'>
      <div className='flex py-3 justify-center'>
        <AddTask />
      </div>
      <div className='flex justify-center'>
        <table className='table text-[9px] max-h-[720px] sm:text-sm w-[375px] sm:w-auto border-2 rounded-md border-gray-200'>
          <thead>
            <tr className='bg-gray-200 text-[9px] sm:text-sm text-black'>
              <th className=''>ลำดับ</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th className=''>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks?.map((task, idx) => (
              <Task key={task?.id} task={task} idx={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
