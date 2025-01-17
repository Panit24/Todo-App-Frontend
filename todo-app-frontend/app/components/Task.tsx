'use client';

import { ITask } from '@/types/tasks';
import React from 'react';
import { useState, FormEventHandler } from 'react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { editTodo, deleteTodo } from '@/api';

interface TaskProps {
  task: ITask;
  idx: number;
}

const Task: React.FC<TaskProps> = ({ task, idx }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskTitleToEdit, setTaskTitleToEdit] = useState<string>(task?.title);
  const [taskDescriptionToEdit, setTaskDescriptionToEdit] = useState<string>(
    task?.description
  );
  const [taskStatusToEdit, setTaskStatusToEdit] = useState<string | undefined>(
    task?.status
  );

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    await editTodo({
      id: String(task?.id),
      title: taskTitleToEdit,
      description: taskDescriptionToEdit,
      status: taskStatusToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={+task?.id} className='hover:bg-gray-100'>
      <td>
        <div className='flex justify-center items-center'>{+idx + 1}</div>
      </td>
      <td className='leading-snug'>{task?.title}</td>
      <td className='leading-snug'>{task?.description}</td>
      <td
        className={`leading-snug ${
          task?.status === 'Ongoing'
            ? 'text-yellow-500'
            : task?.status === 'Completed'
            ? 'text-green-500'
            : task?.status === 'Not Started'
            ? 'text-red-500'
            : ''
        }`}
      >
        {task?.status}
      </td>
      <td className=''>
        <div className='flex gap-2 justify-center items-center'>
          <div className='hover:scale-110 cursor-pointer'>
            <BiEdit
              className='text-info'
              onClick={() => setOpenModalEdit(true)}
            />
          </div>
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className='font-bold text-lg'>Edit task</h3>
              <div className='modal-action flex justify-center items-center flex-col'>
                <div className='flex justify-start items-center w-full'>
                  <input
                    value={taskTitleToEdit}
                    type='text'
                    placeholder='Your task title'
                    className='input input-bordered w-full p-2'
                    onChange={(event) => {
                      setTaskTitleToEdit(event?.target?.value);
                    }}
                  />
                </div>
              </div>
              <div className='modal-action flex justify-center items-center flex-col'>
                <div className='flex justify-start items-center w-full'>
                  <input
                    value={taskDescriptionToEdit}
                    type='text'
                    placeholder='Your task description'
                    className='input input-bordered w-full p-2'
                    onChange={(event) => {
                      setTaskDescriptionToEdit(event?.target?.value);
                    }}
                  />
                </div>
              </div>
              <div className='modal-action flex justify-center items-center flex-col'>
                <div className='flex justify-start items-center w-full'>
                  <select
                    value={taskStatusToEdit}
                    className='select select-bordered w-full p-2'
                    onChange={(event) =>
                      setTaskStatusToEdit(event?.target?.value)
                    }
                  >
                    <option value='' disabled>
                      Select task status
                    </option>
                    <option value='Not Started'>Not Started</option>
                    <option value='Ongoing'>Ongoing</option>
                    <option value='Completed'>Completed</option>
                  </select>
                </div>
              </div>
              <br />
              <div className='flex justify-center items-center'>
                <button
                  type='submit'
                  className='btn btn-info text-white p-2 min-w-[95px]'
                >
                  Submit
                </button>
              </div>
            </form>
          </Modal>
          <div className='hover:scale-110 cursor-pointer'>
            <RiDeleteBin5Line
              color='red'
              onClick={() => {
                setOpenModalDelete(true);
              }}
            />
          </div>
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
            <h3 className='font-bold text-lg'>
              Are sure, you want to delete this task?
            </h3>
            <br />
            <div className='modal-action flex justify-center items-center'>
              <button
                onClick={() => {
                  handleDeleteTask(String(task?.id));
                }}
                className='btn btn-secondary text-white p-2 min-w-[95px]'
              >
                Yes
              </button>
            </div>
          </Modal>
        </div>
      </td>
    </tr>
  );
};

export default Task;
