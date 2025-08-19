import { Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

import Form from "./Form";
import type { Paciente } from "../types";
import MensajeConfirmacion from "./MensajeConfirmacion";

type ModalPros = {
  type: string;
  show: boolean;
  onClose: () => void;
  paciente: Paciente;
  fetchPatients: () => Promise<void>;
};

export default function Modal({ type, show, onClose, paciente, fetchPatients }: ModalPros) {
  return (
    <>
      {/* <div className="fixed right-5 bottom-5 flex items-center justify-center">
        <button
          type="button" 
          onClick={()=> dispatch({ type: 'show-hide-modal' })}
        >
          <PlusCircleIcon className='w-16 h-16 text-blue-600 hover:text-blue-700 rounded-full cursor-pointer' />
        </button>
      </div> */}

      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-black/90  " />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                 {type === "edicion" ? ( <Form paciente={paciente} fetchPatients={fetchPatients} onClose={onClose} /> ) : (<MensajeConfirmacion
                    paciente={paciente}
                    onClose={onClose}
                    fetchPatients={fetchPatients}
                 />)}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
