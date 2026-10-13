import './Users.css';
import { useCallback, useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [findUserId, setFindUserId] = useState("");

    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState(null);

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [ordersError, setOrdersError] = useState(null);

    const [creatingUser, setCreatingUser] = useState(false);
    const [createUserError, setCreateUserError] = useState(null);

    const [updateUserId, setUpdateUserId] = useState("");
    const [updatingUser, setUpdatingUser] = useState(false);
    const [updateUserError, setUpdateUserError] = useState(null);

    const [deleteUserId, setDeleteUserId] = useState("");
    const [deletingUser, setDeletingUser] = useState(false);
    const [deleteUserError, setDeleteUserError] = useState(null);

    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(7);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:5000/users?page=${page}&per_page=${itemsPerPage}`
            );

            if (!response.ok) {
                throw new Error("Failed to load users.")
            };

            const data = await response.json();

            setUsers(data);
        } catch (error) {
            console.error(error);
            setError("Unable to connect to server.")
        } finally {
            setLoading(false);
        }
    }, [page, itemsPerPage]);

    const fetchOrdersData = async () => {
        setOrdersLoading(true);
        setOrdersError(null);
        setOrders(null);

        try {
            const ordersResponse = await fetch("http://localhost:5000/orders");

            if (!ordersResponse.ok) {
                throw new Error("Failed to load orders.")
            };

        const ordersData = await ordersResponse.json();

        setOrders(ordersData);

        } catch (error) {
            console.error(error);
            setOrdersError("Unable to connect to server.")
        } finally {
            setOrdersLoading(false);
        };
    };

    useEffect(() => {

        fetchUsers();
    }, [fetchUsers]);

    const findUser = async (id) => {
        setUserLoading(true);
        setUserError(null);

        try {
            const response = await fetch(`http://localhost:5000/users/${id}`);

            if (!response.ok) {
                throw new Error("User not found.")
            }

            const data = await response.json();

            setUser(data);
        } catch (error) {
            console.error(error);
            setUserError("Unable to find user.")
        } finally {
            setUserLoading(false);
        };
    };

    const handleUpdateUserSubmit = (event) => {
        event.preventDefault();

        const createUserFormData = new FormData(event.target);
        const userData = Object.fromEntries(createUserFormData);

        Object.keys(userData).forEach((key) => {
            if (userData[key] === "") {
                delete userData[key];
            }
        });

        userData.id = Number(userData.id);

        updateUser(updateUserId, userData);
    };

    const updateUser = async (id, userData) => {
        setUpdatingUser(true);
        setUpdateUserError(null);

        try {
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Update user failed.");
            }

            const data = await response.json();

            await fetchUsers();

            return data;

        } catch (error) {
            setUpdateUserError(error.message);
        } finally {
            setUpdatingUser(false);
        }
    };

    const handleCreateUserSubmit = (event) => {
        event.preventDefault();

        const userFormData = new FormData(event.target);
        const userData = Object.fromEntries(userFormData);

        createUser(userData);
    };

    const createUser = async (userData) => {
        setCreatingUser(true);
        setCreateUserError(null);

        try {
            const response = await fetch(`http://localhost:5000/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Create user failed.")
            };

            const data = await response.json();

            await fetchUsers();

            return data;
        } catch (error) {
            setCreateUserError(error.message);
        } finally {
            setCreatingUser(false);
        }
    };

    const handleDeleteUserSubmit = (event) => {
        event.preventDefault();

        deleteUser(deleteUserId);
    }

    const deleteUser = async (id) => {
        setDeletingUser(true);
        setDeleteUserError(null);

        try  {
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Delete user failed.")
            };

            const data = await response.json();

            await fetchUsers();

            return data;
        } catch (error) {
            setDeleteUserError(error.message);
        } finally {
            setDeletingUser(false);
        }
    };

    return(
        <div className="users">
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <header className="users-header">
                        <h2>Users</h2>
                    </header>

                    <section className="find-user">
                        <h2>Find User</h2>

                        <p>User ID:</p>

                        <input
                            type="text"
                            value={findUserId}
                            onChange={(event) => setFindUserId(event.target.value)}
                        />

                        <button onClick={() => findUser(findUserId)}>
                            Search
                        </button>

                        <section className="find-user-table">
                            {userLoading ? (
                                <p>User loading...</p>
                            ) : userError ? (
                                <p>{userError}</p>
                            ) : user && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Open Orders</th>
                                            <th>Total Orders</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.open_orders}</td>
                                            <td>{user.total_orders}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </section>

                    </section>

                    <section className="all-users">
                        <h2>All Users</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Open Orders</th>
                                    <th>Total Orders</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.open_orders}</td>
                                            <td>{user.total_orders}</td>
                                        </tr>
                                        ))
                                    ) : (
                                        <tr className="no-data">
                                            <td colSpan="5">No Users Fouund</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>

                        <div className="pagination">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >
                                Previous    
                            </button>
                            
                            <span>Page {page}</span>

                            <button onClick={() => setPage(page + 1)}>
                                Next
                            </button>

                        </div>

                    </section>

                    <section className="create-update-container">

                        <section className="update-user">
                            <h2>Update User</h2>

                            <form onSubmit={handleUpdateUserSubmit}>

                                <label>
                                    User ID:
                                    <input 
                                        type="text"
                                        value={updateUserId}
                                        onChange={(event) => setUpdateUserId(event.target.value)}
                                        required 
                                    />
                                </label>

                                <label>
                                    Name:
                                    <input type="text" name="name" />
                                </label>

                                <label>
                                    Email:
                                    <input type="email" name="email" />
                                </label>

                                <button type="submit">
                                    Update User
                                </button>

                                {updatingUser && <p>Updating user...</p>}
                                {updateUserError && <p>{updateUserError}</p>}
                            </form>
                        </section>

                        <section className="create-user">
                            <h2>Create User</h2>

                            <form onSubmit={handleCreateUserSubmit}>
                                <label>
                                    Name:
                                    <input type="text" name="name" required />
                                </label>

                                <label>
                                    Email:
                                    <input type="email" name="email" required />
                                </label>

                                <button type="submit">
                                    Create User
                                </button>

                                {creatingUser && <p>Creating user...</p>}
                                {createUserError && <p>{createUserError}</p>}
                            </form>
                        </section>

                    </section>

                    <section className="delete-user">
                        <h2>Delete User</h2>

                        <form onSubmit={handleDeleteUserSubmit}>
                            <label>
                                User ID:
                                <input 
                                    type="text"
                                    value={deleteUserId}
                                    onChange={(event) => setDeleteUserId(event.target.value)}
                                    required
                                />
                            </label>

                            <button type="submit">
                                Delete User
                            </button>

                            {deletingUser && <p>Deleting user...</p>}
                            {deleteUserError && <p>{deleteUserError}</p>}
                        </form>
                    </section>
                </>
            )}
        </div>
    )
}

export default Users;