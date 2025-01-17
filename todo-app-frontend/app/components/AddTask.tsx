'use client';

import { FaPlusCircle } from 'react-icons/fa';
import Modal from './Modal';
import { FormEventHandler, useState } from 'react';
import { addTodo, getAllTodos } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const tasks = await getAllTodos();
    await addTodo({
      id: String(uuidv4()),
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'Not Started',
    });
    // console.log('newTaskTitle', newTaskTitle);
    // console.log('newTaskDescription', newTaskDescription);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setModalOpen(false);
    router.refresh();
  };
  return (
    <div>
      <div className='flex items-center justify-center'>
        <button
          className='btn btn-primary hover:scale-105 cursor-pointer'
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <p>Add New Task</p>
          <FaPlusCircle color='white' />
        </button>
      </div>
      <div className='flex items-center justify-center'>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={handleSubmitNewTodo}>
            <h3 className='font-bold text-lg'>Add new task</h3>
            <div className='modal-action flex justify-center items-center flex-col'>
              <div className='flex justify-start items-center w-full'>
                <input
                  value={newTaskTitle}
                  type='text'
                  placeholder='Your task title'
                  className='input input-bordered w-full p-2'
                  onChange={(event) => {
                    setNewTaskTitle(event?.target?.value);
                  }}
                />
              </div>
            </div>
            <div className='modal-action flex justify-center items-center flex-col'>
              <div className='flex justify-start items-center w-full'>
                <input
                  value={newTaskDescription}
                  type='text'
                  placeholder='Your task description'
                  className='input input-bordered w-full p-2'
                  onChange={(event) => {
                    setNewTaskDescription(event?.target?.value);
                  }}
                />
              </div>
            </div>
            <br />
            <div className='flex justify-center items-center'>
              <button
                type='submit'
                className='btn btn-primary text-white p-2 min-w-[95px]'
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AddTask;
