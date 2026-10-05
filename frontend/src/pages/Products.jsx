import './Products.css'
import { useCallback, useEffect, useState } from "react";

function Products() {
    const [products, setProducts] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [product, setProduct] = useState(null);
    const [productLoading, setProductLoading] = useState(false);
    const [productError, setProductError] = useState(null);

    const [inventory, setInventory] = useState([]);
    const [inventoryError, setInventoryError] = useState(null);

    const [findProductId, setFindProductId] = useState("");

    const [creatingProduct, setCreatingProduct] = useState(false);
    const [createProductError, setCreateProductError] = useState(null);

    const [updateProductId, setUpdateProductId] = useState("");
    const [updatingProduct, setUpdatingProduct] = useState(false);
    const [updateProductError, setUpdateProductError] = useState(null);

    const [updatingInventory, setUpdatingInventory] = useState(false);
    const [updateInventoryError, setUpdateInventoryError] =useState(null);

    const [updateProductInventoryId, setUpdateProductInventoryId] = useState("");

    const [deleteProductId, setDeleteProductId] = useState("");
    const [deletingProduct, setDeletingProduct] = useState(false);
    const [deleteProductError, setDeleteProductError] = useState(null);

    const [page, setPage] = useState(1);
    const [itemsPerPage] = useState(7);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        setInventoryError(null);
        setInventory([]);

        try {
            const productsResponse = await fetch(
                `http://localhost:5000/products?page=${page}&per_page=${itemsPerPage}`
            );

            const inventoryResponse = await fetch(`http://localhost:5000/inventory`)

            if (!productsResponse.ok || !inventoryResponse.ok) {
                throw new Error("Unable to fetch products.");
            }

            const productsData = await productsResponse.json();
            const inventoryData = await inventoryResponse.json();

            setProducts(productsData);
            setInventory(inventoryData);

        } catch (error) {
            console.error(error);
            setError("Unable to connect to server.")
        } finally {
            setLoading(false);
        }
    }, [page, itemsPerPage]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const findProduct = async (id) => {
        setProductLoading(true);
        setProductError(null);
        setInventoryError(null);
        setProduct(null);
        setInventory([])

        try {
            const response = await fetch(
                `http://localhost:5000/products/${id}`
            );

            if (!response.ok) {
                throw new Error("Product not found.")
            }

            const data = await response.json();

            setProduct(data.product);
            setInventory(data.inventory);

        } catch (error) {
            console.error(error);

            if (!product) {
                setProductError("Unable to find product.")
            } else {
                setInventoryError("Unable to find inventory.")
            }
        } finally {
            setProductLoading(false);
        };
    };

    const handleCreateProductSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const productData = Object.fromEntries(formData);

        productData.price = Number(productData.price);

        createProduct(productData);
    };

    const createProduct = async (productData) => {
        setCreatingProduct(true);
        setCreateProductError(null);

        try {
            const response = await fetch(`http://localhost:5000/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Create product failed.")
            };

            const data = await response.json();

            await fetchProducts();

            return data;
        } catch (error) {
            setCreateProductError(error.message);
        } finally {
            setCreatingProduct(false);
        }
    };

    const handleUpdateProductSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const productData = Object.fromEntries(formData);

        Object.keys(productData).forEach((key) => {

            if (productData[key] === "") {
                delete productData[key];
            }
        });

        if (productData.price) {
            productData.price = Number(productData.price);
        };

        updateProduct(updateProductId, productData);
    };

    const updateProduct = async (id, productData) => {
        setUpdatingProduct(true);
        setUpdateProductError(null);

        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Update product failed.")
            };

            const data = await response.json();

            await fetchProducts();

            return data;

        } catch (error) {
            setUpdateProductError(error.message);
        } finally {
            setUpdatingProduct(false);
        }
    };

    const handleUpdateInventorySubmit = async (event) => {
        event.preventDefault()

        const inventoryFormData = new FormData(event.target);
        const inventoryData = Object.fromEntries(inventoryFormData);
        
        inventoryData.quantity = Number(inventoryData.quantity);

        await updateInventory(inventoryData.product_id, inventoryData);

        await fetchProducts();
    };
    
    /* 
    const findInventoryByProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/inventory/product/${productId}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Inventory not found")
            };

            const data = await response.json();

            setProductInventory(data);
            setUpdateInventoryId(data.id);

            return data;

        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    */

    const updateInventory = async (id, inventoryData) => {
        setUpdatingInventory(true);
        setUpdateInventoryError(null);

        try {
            const response = await fetch(`http://localhost:5000/inventory/product/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inventoryData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Update inventory failed.")
            }

            const data = await response.json();

            return data;

        } catch (error) {
            setUpdateInventoryError(error.message);
        } finally {
            setUpdatingInventory(false);
        }
    };

    const handleDeleteProductSubmit = async (event) => {

        event.preventDefault();

        deleteProduct(deleteProductId);
    };

    const deleteProduct = async (id) => {
        setDeletingProduct(true);
        setDeleteProductError(null);

        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Delete product failed.")
            }

            const data = await response.json();
            await fetchProducts();

            return data

        } catch (error) {
            setDeleteProductError(error.message);
        } finally {
            setDeletingProduct(false);
        }
    };

    return(
        <div className="products">
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <header className="products-header">
                        <h2>Products</h2>
                    </header>

                    <section className="find-product">
                        <h2>Find Product</h2>

                        <p>Product ID:</p>
                            
                        <input 
                            type="text"
                            value={findProductId}
                            onChange={(event) => setFindProductId(event.target.value)}
                        />

                        <button onClick={() => findProduct(findProductId)}>
                            Search
                        </button>

                        <section className="find-product-table">
                            {productLoading ? (
                                <p>Product loading...</p>
                            ) : productError ? (
                                <p>{productError}</p>
                            ) : inventoryError ? (
                                <p>{inventoryError}</p>
                            ) : product && inventory && (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Product ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>SKU</th>
                                            <th>Inventory</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>{product.id}</td>
                                            <td>{product.product_name}</td>
                                            <td>{product.price}</td>
                                            <td>{product.sku}</td>
                                            <td>{inventory[0]?.quantity}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </section>
                    </section>

                    <section className="all-products">
                        <h2>All Products</h2>

                        <table>
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>SKU</th>
                                    <th>Inventory</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.product_name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.sku}</td>
                                            <td>
                                                {inventory.find((item) => 
                                                    item.product_id === product.id)?.quantity ?? 0
                                                }
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="no-data">
                                        <td colSpan="5">No products found.</td>
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

                            <button
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </section>

                    <section className="create-product">
                        <h2>Create Product</h2>

                        <form onSubmit={handleCreateProductSubmit}>
                        
                            <label>
                                Product Name:
                                <input type="text" name="product_name" required />
                            </label>

                            <label>
                                Price:
                                <input type="number" step="0.01" name="price" required />
                            </label>

                            <button type="submit">
                                Create Product
                            </button>
                        </form>

                        {creatingProduct && <p>Creating product...</p>}
                        {createProductError && <p>{createProductError}</p>}
                    </section>

                    <section className="update-product-and-inventory">

                        <section className="update-product">
                            <h2>Update Product</h2>

                            <form onSubmit={handleUpdateProductSubmit}>
                                <label>
                                    Product ID:
                                    <input
                                        type="number"
                                        value={updateProductId}
                                        onChange={(event) => setUpdateProductId(event.target.value)}
                                        required
                                    />
                                </label>

                                <label>
                                    Product Name:
                                    <input type="text" name="product_name" />
                                </label>

                                <label>
                                    Price:
                                    <input type="number" step="0.01" name="price" />
                                </label>

                                <div class="update-product-button">
                                    <button type="submit">
                                        Update Product
                                    </button>
                                </div>

                            </form>

                            {updatingProduct && <p>Updating product...</p>}
                            {updateProductError && <p>{updateProductError}</p>}
                        </section>

                        <section className="update-inventory">
                            <h2>Update Product Inventory</h2>

                            <form onSubmit={handleUpdateInventorySubmit}>
                                <label>
                                    Product ID:
                                    <input 
                                        type="number"
                                        name="product_id"
                                        value={updateProductInventoryId}
                                        onChange={(event) => setUpdateProductInventoryId(event.target.value)}
                                        required
                                    />
                                </label>

                                <label>
                                    Quantity:
                                    <input type="number" name="quantity" required />
                                </label>

                                <div className="update-inventory-button">
                                    <button type="submit">
                                        Update Inventory
                                    </button>            
                                </div>

                                {updatingInventory && <p>Updating inventory...</p>}
                                {updateInventoryError && <p>{updateInventoryError}</p>}
                            </form>
                        </section>

                    </section>

                    <section className="delete-product">
                        <h2>Delete Product</h2>

                        <form onSubmit={handleDeleteProductSubmit}>
                            <label>
                                Product ID:
                                <input 
                                    type="text"
                                    value={deleteProductId}
                                    onChange={(event) => setDeleteProductId(event.target.value)}
                                    required
                                />
                            </label>

                            <button type="submit">
                                Delete Product
                            </button>

                            {deletingProduct && <p>Deleting product...</p>}
                            {deleteProductError && <p>{deleteProductError}</p>}
                        </form>
                    </section>
                </>
            )
            }
        </div>
    )
}

export default Products