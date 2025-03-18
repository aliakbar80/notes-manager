import { Trash } from "lucide-react";
import React from "react";

interface NoteCardProps {
  title: string;
  description: string;
  creationDate: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  title,
  description,
  creationDate,
  onEditClick,
  onDeleteClick
}) => {
  return (
    <div className="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
      <div>
        <h3 className="text-gray-800 dark:text-gray-100 leading-7 font-semibold text-xl w-11/12">
          {title}
        </h3>
        <p className="font-[300] dark:text-white">{description}</p>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-800">
          <p className="dark:text-gray-100 text-sm">{creationDate}</p>
          <div className="flex items-center gap-2">
            <button
              onClick={onDeleteClick}
              className="cursor-pointer w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              aria-label="edit note"
              role="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m18 9l-.84 8.398c-.127 1.273-.19 1.909-.48 2.39a2.5 2.5 0 0 1-1.075.973C15.098 21 14.46 21 13.18 21h-2.36c-1.279 0-1.918 0-2.425-.24a2.5 2.5 0 0 1-1.076-.973c-.288-.48-.352-1.116-.48-2.389L6 9m7.5 6.5v-5m-3 5v-5m-6-4h4.615m0 0l.386-2.672c.112-.486.516-.828.98-.828h3.038c.464 0 .867.342.98.828l.386 2.672m-5.77 0h5.77m0 0H19.5"/></svg>
            </button>
            <button
              onClick={onEditClick}
              className="cursor-pointer w-8 h-8 rounded-full dark:bg-gray-100 dark:text-gray-800 bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              aria-label="edit note"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-pencil"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
