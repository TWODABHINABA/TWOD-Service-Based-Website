import React from "react";
import { useState, useEffect } from "react";
import api from "../../components/user-management/api";

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) return;
        const checkAdmin = async () => {
            try {
                const res = await api.get('/admin/me', {
                    headers: {  
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setIsAdmin(res.data.role === 'admin');
            } catch (error) {
                console.error('Failed to check admin status:', error);
                setIsAdmin(false);
            }
        };
        checkAdmin();
    }, [token]);
    const [users, setUsers] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (!isAdmin || !token) return;

        const fetchUsers = async () => {
            try {
                const res = await api.get('/admin/users', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(res.data || []);
            } catch (error) {
                console.error('Failed to fetch users:', error);
                setUsers([]);
            }
        };

        const fetchRequests = async () => {
            try {
                const res = await api.get('/admin/requests', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRequests(res.data || []);
            } catch (error) {
                console.error('Failed to fetch requests:', error);
                setRequests([]);
            }
        };

        fetchUsers();
        fetchRequests();
    }, [isAdmin, token]);

    if (!token) {
        return <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>You must be logged in to view this page.</div>;
    }

    if (!isAdmin) {
        return <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>Only admin has access to this page.</div>;
    }
    

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1>Admin Dashboard</h1>
            <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
                <div
                    style={{
                        flex: 1,
                        background: "#f5f5f5",
                        padding: "1rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        border: activeTab === "users" ? "2px solid #007bff" : "2px solid transparent",
                        textAlign: "center"
                    }}
                    onClick={() => setActiveTab("users")}
                >
                    <h2>Users</h2>
                </div>
                <div
                    style={{
                        flex: 1,
                        background: "#f5f5f5",
                        padding: "1rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        border: activeTab === "requests" ? "2px solid #007bff" : "2px solid transparent",
                        textAlign: "center"
                    }}
                    onClick={() => setActiveTab("requests")}
                >
                    <h2>Requests</h2>
                </div>
            </div>
            <div style={{ marginTop: "2rem" }}>
                {activeTab === "users" && (
                    <div>
                        <h3>Users Data</h3>
                        {users.length === 0 ? (
                            <p>No users found.</p>
                        ) : (
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Email</th>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id || user.id}>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.name}</td>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.email}</td>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{user.role}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
                {activeTab === "requests" && (
                    <div>
                        <h3>Requests Data</h3>
                        {requests.length === 0 ? (
                            <p>No requests found.</p>
                        ) : (
                            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>User</th>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Message</th>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Status</th>
                                        <th style={{ border: "1px solid #ccc", padding: "8px" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map(request => (
                                        <tr key={request._id || request.id}>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{request.user?.name || request.user || "N/A"}</td>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{request.message || "N/A"}</td>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>{request.status || "N/A"}</td>
                                            <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                                                <button
                                                    style={{
                                                        marginRight: "8px",
                                                        padding: "4px 12px",
                                                        background: "#28a745",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={async () => {
                                                        try {
                                                            await api.post(
                                                                `/admin/requests/${request._id || request.id}/accept`,
                                                                {},
                                                                { headers: { Authorization: `Bearer ${token}` } }
                                                            );
                                                            setRequests(prev =>
                                                                prev.map(r =>
                                                                    (r._id || r.id) === (request._id || request.id)
                                                                        ? { ...r, status: "Accepted" }
                                                                        : r
                                                                )
                                                            );
                                                        } catch (err) {
                                                            alert("Failed to accept request.");
                                                        }
                                                    }}
                                                    disabled={request.status === "Accepted"}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    style={{
                                                        padding: "4px 12px",
                                                        background: "#007bff",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "4px",
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        const email = request.user?.email || request.userEmail || "";
                                                        if (email) {
                                                            window.location.href = `mailto:${email}`;
                                                        } else {
                                                            alert("No email found for this user.");
                                                        }
                                                    }}
                                                >
                                                    Contact
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;