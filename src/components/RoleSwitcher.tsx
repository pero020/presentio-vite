import React from 'react';

type Props = {
  currentRole: string | undefined;
  setCurrentRole: React.Dispatch<React.SetStateAction<string>>;
};

export default function RoleSwitcher({ currentRole, setCurrentRole }: Props) {
  const toggleRole = (role: string) => {
    setCurrentRole(role);
  };

  return (
    <div className="flex items-center">
      <button
        className={`py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline ${
          currentRole === 'student' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'
        }`}
        onClick={() => toggleRole('student')}
      >
        Student
      </button>
      <button
        className={`ml-4 py-2 px-4 rounded font-bold focus:outline-none focus:shadow-outline ${
          currentRole === 'presenter' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'
        }`}
        onClick={() => toggleRole('presenter')}
      >
        Presenter
      </button>
    </div>
  );
}
