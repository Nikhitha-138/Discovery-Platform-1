import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, ChevronLeft, ChevronRight, SquarePenIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import './category.css';

const Category = () => {
  const { user } = useAuth();

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    if (user && user.role === 'Admin') {
      getCategory(1);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="premium-bg" style={{ minHeight: '100vh', padding: '150px 2rem' }}>
        <div className="glass-morphism" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Access Denid</h2>
          <p>Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  if (user.role !== 'Admin') {
    return (
      <div className="premium-bg" style={{ minHeight: '100vh', padding: '150px 2rem' }}>
        <div className="glass-morphism" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Access Denied</h2>
          <p>Admin only access permitted.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.patch(
          `http://localhost:8001/categories/${editingCategory._id}`,
          {
            categoryName,
            description,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        toast.success('Category updated successfully!');
        setEditingCategory(null);
        setCategoryName('');
        setDescription('');
        setStatus('active');
      } else {
        await axios.post(
          'http://localhost:8001/categories',
          {
            categoryName,
            description,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        toast.success('Category added successfully!');
        setCategoryName('');
        setDescription('');
        setStatus('active');
      }
      getCategory(currentPage);
    } catch (err) {
      console.error('Error:', err);
      toast.error(
        editingCategory ? 'Failed to update category' : 'Failed to add category'
      );
    }
  };

  const getCategory = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:8001/categories?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      setCategories(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
      setCurrentPage(res.data.pagination.page);
    } catch (err) {
      console.error('Error fetching categories:', err);
      toast.error('Failed to fetch categories');
    }
  };

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      getCategory(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleDeleteClick = category => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleEditClick = category => {
    setEditingCategory(category);
    setCategoryName(category.categoryName);
    setDescription(category.description);
    setStatus(category.status);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setCategoryName('');
    setDescription('');
    setStatus('active');
  };

  const handleConfirmDelete = async () => {
    if (selectedCategory) {
      try {
        await axios.delete(
          `http://localhost:8001/categories/${selectedCategory._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        toast.success('Category deleted successfully!');
        getCategory(currentPage);
      } catch (err) {
        console.error('Error deleting category:', err);
        toast.error('Failed to delete category');
      }
      setIsModalOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div
      className="category-container premium-bg"
      style={{ minHeight: '100vh', padding: '150px 2rem' }}
    >
      <div className="category-form glass-morphism">
        <h2>Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Category Name"
            value={categoryName}
            onChange={e => setCategoryName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit">
              {editingCategory ? 'Update Category' : 'Add Category'}
            </button>
            {editingCategory && (
              <button type="button" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="categories-table glass-morphism">
        <h2>Categories List</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category._id}>
                <td>{category.categoryName}</td>
                <td>{category.description}</td>
                <td>{category.status}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditClick(category)}
                  >
                    <SquarePenIcon size={16} />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(category)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <ChevronLeft size={16} />
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
          <ChevronRight size={16} />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.categoryName}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default Category;
