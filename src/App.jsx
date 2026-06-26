import React, { useState, useEffect } from 'react';
import './App.css';
import ProductCard from './components/ProductCard';

// Fallback data in case the public API is down
const MOCK_PRODUCTS = [
  {
    id: 101,
    title: "Aura Wireless Headphones",
    price: 129.99,
    description: "Premium headphones with active noise cancellation and 40-hour battery life.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 102,
    title: "Minimalist Leather Backpack",
    price: 89.50,
    description: "Water-resistant leather backpack with a padded laptop sleeve.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 103,
    title: "Smart Fitness Watch",
    price: 249.00,
    description: "Smartwatch with heart rate monitoring and titanium casing.",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 104,
    title: "Polarized Wood Sunglasses",
    price: 55.00,
    description: "Handcrafted sunglasses made from sustainable wood.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 105,
    title: "Ergonomic Wool Sneakers",
    price: 110.00,
    description: "Light sneakers made from breathable merino wool.",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 106,
    title: "Classic Silver Mesh Watch",
    price: 175.00,
    description: "Quartz movement watch with a stainless steel strap.",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  // Load store data on mount
  useEffect(() => {
    const fetchStoreData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.warn('API error, using mock data:', err.message);
        setProducts(MOCK_PRODUCTS);
        // Extract unique categories from mock data
        const mockCategories = [...new Set(MOCK_PRODUCTS.map(p => p.category))];
        setCategories(mockCategories);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  // Filter products based on search and category selection
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  return (
    <div className="app-container">
      {/* Sticky Header Bar */}
      <header className="header">
        <div className="logo-container">
          <div className="logo-icon-wrapper">
            <svg className="logo-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1>Aura Shop</h1>
        </div>
        <div className="cart-widget" onClick={() => alert(`Proceeding to checkout with ${cartCount} items.`)}>
          <div className="cart-icon-wrapper">
            <svg className="cart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="cart-badge animate-pop">{cartCount}</span>
            )}
          </div>
          <span className="cart-label">Cart</span>
        </div>
      </header>

      {/* Hero Showcase Section */}
      <section className="hero-section">
        <div className="hero-glow-orb"></div>
        <div className="hero-content">
          <span className="hero-tag">New Season Curations</span>
          <h2 className="hero-title">Experience the Aura of Fine Design</h2>
          <p className="hero-subtitle">
            Explore our meticulously selected lifestyle essentials. Engineered for maximum simplicity, elegance, and utility.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="search-filter-section">
        <div className="search-input-wrapper">
          <div className="search-icon-container">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search our catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')} title="Clear Search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className="categories-wrapper">
          <div className="categories-list">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Display Area */}
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <div className="loading-text">Curating catalog...</div>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <svg className="no-results-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              <p>No products found matching "{searchQuery}"</p>
              <span>Try checking your spelling or adjusting your filters.</span>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-icon-wrapper mini">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span>Aura Shop</span>
          </div>
          <p className="footer-copyright">&copy; 2026 Aura Shop. High-fidelity goods for a modern workspace.</p>
          <div className="footer-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms</a>
            <a href="#contact" onClick={(e) => e.preventDefault()}>Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
