import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, ChevronLeft, ChevronRight, SquarePenIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import Modal from '../../components/Modal';
import './addproduct.css';

const AddProduct = () => {
  const { user } = useAuth();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [category, setCategory] = useState('');
  const [THC, setTHC] = useState('');
  const [CBD, setCBD] = useState('');
  const [price, setPrice] = useState('');
  const [effect, setEffect] = useState('');
  const [usageType, setUsageType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const getCategories = async () => {
    try {
      console.log('Fetching categories from:', `http://localhost:8001/categories?limit=1000`);
      console.log('Token being used:', user?.accessToken);
      const res = await axios.get('http://localhost:8001/categories?limit=1000', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setCategoriesList(res.data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      if (err.response) {
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
      }
      toast.error('Failed to fetch categories');
    }
  };

  useEffect(() => {
    if (user) {
      getProducts(1);
      getCategories();
    }
  }, [user]);

  if (!user) {
    return <div>Please log in to access this page.</div>;
  }

  if (user.role !== 'Admin') {
    return <div>Access denied. Admin only.</div>;
  }

  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:8001/products?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      setProducts(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
      setCurrentPage(res.data.pagination.page);
    } catch (err) {
      console.error('Error fetching products:', err);
      toast.error('Failed to fetch products');
    }
  };

  const addeditProduct = async e => {
    e.preventDefault();
    console.log('addeditProduct triggered');
    console.log('Editing Product ID:', editingCategory?._id);
    console.log('Data to send:', {
      productName,
      description,
      status,
      THC,
      CBD,
      price,
      category: selectedCategoryId,
      effect,
      usageType,
    });
    const dataToSend = {
      productName,
      description,
      status,
      THC: Number(THC),
      CBD: Number(CBD),
      price: Number(price),
      category: selectedCategoryId,
      effect,
      usageType,
    };
    console.log('Final data to send:', dataToSend);

    try {
      if (editingCategory) {
        console.log('Performing Patch Request to:', `http://localhost:8001/products/${editingCategory._id}`);
        const res = await axios.patch(
          `http://localhost:8001/products/${editingCategory._id}`,
          dataToSend,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        console.log('Update Response:', res.data);
        toast.success('Product updated successfully!');
      } else {
        console.log('Performing Post Request');
        const res = await axios.post(
          'http://localhost:8001/products',
          dataToSend,
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        );
        console.log('Add Response:', res.data);
        toast.success('Product added successfully!');
      }
      getProducts(currentPage);
      setIsModalOpen(false);
      setEditingCategory(null);
      setProductName('');
      setDescription('');
      setStatus('active');
      setTHC('');
      setCBD('');
      setPrice('');
      setEffect('');
      setUsageType('');
      setSelectedCategoryId('');
    } catch (err) {
      console.error('Error adding/updating product:', err);
      toast.error('Failed to add/update product. Please try again.');
    }
  };

  const handleEditClick = product => {
    console.log('handleEditClick called for:', product.productName);
    setEditingCategory(product);
    setProductName(product.productName);
    setDescription(product.description || '');
    setStatus(product.status || 'active');
    setTHC(product.THC || '');
    setCBD(product.CBD || '');
    setPrice(product.price || '');
    setEffect(product.effect || '');
    setUsageType(product.usageType || '');

    const categoryId = (product.category && typeof product.category === 'object')
      ? product.category._id
      : (product.category || '');
    console.log('Setting selectedCategoryId to:', categoryId);
    setSelectedCategoryId(categoryId || '');
    setIsModalOpen(true);
  };

  const handleDeleteClick = product => {
    setSelectedCategory(product);
    setIsModalOpen(true);
  };

  const handlePageChange = page => {
    if (page >= 1 && page <= totalPages) {
      getProducts(page);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedCategory) {
      try {
        await axios.delete(
          `http://localhost:8001/products/${selectedCategory._id}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        toast.success('Product deleted successfully!');
        getProducts(currentPage);
      } catch (err) {
        console.error('Error deleting product:', err);
        toast.error('Failed to delete product');
      }
      setIsModalOpen(false);
      setSelectedCategory(null);
    }
  };

  return (
    <div
      className="add-product-container premium-bg"
      style={{ minHeight: '100vh', padding: '150px 2rem' }}
    >
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn-primary"
        style={{ padding: '10px 20px', marginBottom: '20px' }}
      >
        Add Product
      </button>
      <div className="products-table glass-morphism">
        <h2>Products List</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>THC</th>
                <th>CBD</th>
                <th>Price</th>
                <th>Effect</th>
                <th>Usage Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  <td>{product.category?.categoryName || 'No Category'}</td>
                  <td>{product.description}</td>
                  <td>{product.THC}%</td>
                  <td>{product.CBD}%</td>
                  <td>${product.price}</td>
                  <td>{product.effect}</td>
                  <td>{product.usageType}</td>
                  <td>{product.status}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingCategory(product);
                        setProductName(product.productName);
                        setDescription(product.description);
                        setStatus(product.status);
                        setTHC(product.THC);
                        setCBD(product.CBD);
                        setPrice(product.price);
                        setEffect(product.effect || '');
                        setUsageType(product.usageType || '');
                        setSelectedCategoryId(product.category?._id || '');
                        setIsModalOpen(true);
                      }}
                    >
                      <SquarePenIcon size={16} />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteClick(product)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        isOpen={isModalOpen && !selectedCategory}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
          setProductName('');
          setDescription('');
          setStatus('active');
          setTHC('');
          setCBD('');
          setPrice('');
          setEffect('');
          setUsageType('');
          setSelectedCategoryId('');
        }}
        title={editingCategory ? 'Edit Product' : 'Add Product'}
      >
        <form onSubmit={addeditProduct} className="modal-form">
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={selectedCategoryId}
            onChange={e => setSelectedCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            {categoriesList && categoriesList.length > 0 ? (
              categoriesList.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>
          <input
            type="number"
            placeholder="THC (%)"
            value={THC}
            onChange={e => setTHC(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="CBD (%)"
            value={CBD}
            onChange={e => setCBD(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Effect (e.g., Relaxing, Creative)"
            value={effect}
            onChange={e => setEffect(e.target.value)}
          />
          <input
            type="text"
            placeholder="Usage Type (e.g., Smoking, Edible)"
            value={usageType}
            onChange={e => setUsageType(e.target.value)}
          />
          <button type="submit">
            {editingCategory ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </Modal>
      <Modal
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedCategory?.productName}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default AddProduct;
