import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`/api/categories/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (categoryId, categoryName) => {
    setEditingCategoryId(categoryId);
    setEditedCategoryName(categoryName);
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditedCategoryName('');
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`/api/categories/${editingCategoryId}`, { name: editedCategoryName });
      console.log('Response:', response); 
      setEditingCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Categories List</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="flex items-center justify-between py-2 border-b">
            {editingCategoryId === category.id ? (
              <input
                type="text"
                value={editedCategoryName}
                onChange={(e) => setEditedCategoryName(e.target.value)}
                className="border-b-2 border-blue-500 focus:outline-none"
              />
            ) : (
              <span>{category.name}</span>
            )}
            <div>
              {editingCategoryId === category.id ? (
                <>
                  <button
                    onClick={handleSubmit}
                    className="px-3 py-1 bg-green-500 text-white rounded mr-2"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-gray-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleEdit(category.id, category.name)}
                  className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(category.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
