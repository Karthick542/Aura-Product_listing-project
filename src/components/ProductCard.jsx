import React, { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  // Local state to manage the flip state of this card independently
  const [isFlipped, setIsFlipped] = useState(false);

  // Toggle flip state when clicking the card
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Prevent card flipping when clicking interactive buttons or elements
  const handleActionClick = (e, callback) => {
    e.stopPropagation();
    if (callback) callback();
  };

  // Helper to render star rating SVGs based on rating value
  const renderStars = (rate) => {
    const roundedRate = Math.round(rate || 0);
    return (
      <div className="rating-stars" title={`${rate} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={i}
            className={`star-icon ${i < roundedRate ? 'filled' : 'empty'}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={i < roundedRate ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
  };

  // Mock stock status based on product ID
  const getStockStatus = (id) => {
    if (id % 3 === 0) {
      return {
        text: "Only 3 left in stock",
        className: "stock-low"
      };
    }
    return {
      text: "In Stock",
      className: "stock-ok"
    };
  };

  const stock = getStockStatus(product.id);

  return (
    <div className="product-card-container" onClick={handleCardClick}>
      <div className={`product-card-inner ${isFlipped ? 'flipped' : ''}`}>
        
        {/* --- FRONT SIDE --- */}
        <div className="product-card-front">
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
              loading="lazy"
            />
            <div className="product-image-overlay"></div>
            <div className="flip-indicator-icon" title="Click to view details">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
          </div>
          
          <div className="product-info-front">
            <h3 className="product-title" title={product.title}>
              {product.title}
            </h3>
            <span className="product-price">${product.price.toFixed(2)}</span>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div className="product-card-back">
          <div className="product-back-header">
            <span className="product-category-label">{product.category}</span>
            <h3 className="product-title-back" title={product.title}>
              {product.title}
            </h3>
          </div>

          <div className="product-back-body">
            {/* Scrollable Description */}
            <div className="product-description-container">
              <span className="section-title">Description</span>
              <p 
                className="product-description-back" 
                onClick={(e) => e.stopPropagation()} // Allow scrolling description without flipping
              >
                {product.description}
              </p>
            </div>

            {/* Ratings, Price, and Stock Details */}
            <div className="product-meta-details-back">
              <div className="meta-row">
                <span className="meta-label">Rating</span>
                {product.rating ? (
                  <div className="meta-value rating-wrapper">
                    {renderStars(product.rating.rate)}
                    <span className="rating-text-value">{product.rating.rate} ({product.rating.count} reviews)</span>
                  </div>
                ) : (
                  <span className="meta-value text-muted">No reviews yet</span>
                )}
              </div>
              
              <div className="meta-row">
                <span className="meta-label">Stock Status</span>
                <span className={`meta-value stock-badge ${stock.className}`}>
                  {stock.text}
                </span>
              </div>

              <div className="meta-row">
                <span className="meta-label">Price</span>
                <span className="meta-value price-highlight">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="product-back-actions">
            <button 
              className="buy-now-btn" 
              onClick={(e) => handleActionClick(e, () => {
                alert(`Proceeding to checkout with: ${product.title}`);
              })}
            >
              Buy Now
            </button>
            
            <button 
              className="add-btn-back" 
              onClick={(e) => handleActionClick(e, onAddToCart)}
              title="Add to Cart"
            >
              <svg className="btn-cart-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}


