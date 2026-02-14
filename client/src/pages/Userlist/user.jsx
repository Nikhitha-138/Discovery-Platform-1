import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './user.css';

const User = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(10);

    const getUsersList = async (page = 1) => {
        try {
            if (!user?.accessToken) return;
            setLoading(true);
            const res = await axios.get(`http://localhost:8001/users?page=${page}&limit=${limit}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setUsers(res.data.data);
            setTotalPages(res.data.pagination.totalPages);
            setCurrentPage(res.data.pagination.page);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            getUsersList(1);
        }
    }, [user]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            getUsersList(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            getUsersList(currentPage + 1);
        }
    };

    if (!user || user.role !== 'Admin') {
        return (
            <div className="premium-bg" style={{ minHeight: '100vh', padding: '150px 2rem' }}>
                <div className="glass-morphism" style={{ padding: '2rem', textAlign: 'center' }}>
                    <h2>Access Denied</h2>
                    <p>Admin only access permitted.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='user-list-container premium-bg' style={{ minHeight: '100vh', padding: '150px 2rem' }}>
            <div className='user-list glass-morphism'>
                <h1>User Management</h1>
                {loading ? (
                    <div className="loading-state">
                        <p>Loading users...</p>
                    </div>
                ) : (
                    <>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((u) => (
                                            <tr key={u._id}>
                                                <td>{u.name}</td>
                                                <td>{u.email}</td>
                                                <td>{u.phonenumber || 'N/A'}</td>
                                                <td>
                                                    <span className={`role-badge ${u.role?.toLowerCase()}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {totalPages > 1 && (
                            <div className="pagination" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="pagination-btn"
                                >
                                    <ChevronLeft size={16} />
                                    Previous
                                </button>
                                <span className="page-info">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="pagination-btn"
                                >
                                    Next
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default User;

