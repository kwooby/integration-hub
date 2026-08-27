import './Products.css'
import { useEffect, useState } from "react";

function Products() {
    const [products, setProducts] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
}

export default Products