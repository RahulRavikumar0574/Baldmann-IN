import React, { useState } from 'react';
import Folder from './Folder';

/**
 * Example usage of the Folder component
 * This demonstrates how to use the Folder component in your project
 */
const FolderExample = () => {
  const [folders, setFolders] = useState([
    { id: 1, name: "Documents", isOpen: false, color: "blue" },
    { id: 2, name: "Images", isOpen: false, color: "yellow" },
    { id: 3, name: "Projects", isOpen: false, color: "green" },
    { id: 4, name: "Videos", isOpen: false, color: "purple" },
  ]);

  const handleFolderClick = (id) => {
    setFolders(folders.map(folder => 
      folder.id === id 
        ? { ...folder, isOpen: !folder.isOpen }
        : folder
    ));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Folder Component Examples</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            name={folder.name}
            isOpen={folder.isOpen}
            onClick={() => handleFolderClick(folder.id)}
            color={folder.color}
            size="md"
          />
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Different Sizes</h2>
        <div className="flex items-end gap-6">
          <Folder name="Small" size="sm" color="blue" />
          <Folder name="Medium" size="md" color="green" />
          <Folder name="Large" size="lg" color="purple" />
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Different Colors</h2>
        <div className="flex gap-6">
          <Folder name="Blue" color="blue" />
          <Folder name="Yellow" color="yellow" />
          <Folder name="Green" color="green" />
          <Folder name="Purple" color="purple" />
          <Folder name="Pink" color="pink" />
          <Folder name="Orange" color="orange" />
        </div>
      </div>
    </div>
  );
};

export default FolderExample;

