/**
 * Pagination Utility for TrekMap
 *
 * This utility provides reusable pagination functions
 * for MongoDB queries using Mongoose.
 */

/**
 * Calculate pagination parameters
 * @param {number} page - Current page number (from query string)
 * @param {number} limit - Items per page (default: 12)
 * @returns {Object} Pagination metadata
 *
 * @example
 * const { skip, limit, page } = getPaginationParams(req.query.page, 12);
 */
const getPaginationParams = (page = 1, limit = 12) => {
    // Ensure page is a positive integer
    const currentPage = Math.max(1, parseInt(page) || 1);

    // Ensure limit is reasonable (between 1 and 100)
    const itemsPerPage = Math.min(100, Math.max(1, parseInt(limit) || 12));

    // Calculate how many documents to skip
    // Page 1: skip 0, Page 2: skip 12, Page 3: skip 24, etc.
    const skip = (currentPage - 1) * itemsPerPage;

    return {
        skip,           // Documents to skip (for MongoDB .skip())
        limit: itemsPerPage,  // Documents to return (for MongoDB .limit())
        page: currentPage     // Current page number (for UI)
    };
};

/**
 * Calculate total pages and pagination metadata
 * @param {number} totalItems - Total count of documents
 * @param {number} currentPage - Current page number
 * @param {number} limit - Items per page
 * @returns {Object} Complete pagination metadata for view
 */
const getPaginationMetadata = (totalItems, currentPage, limit) => {
    const totalPages = Math.ceil(totalItems / limit);

    return {
        currentPage,
        totalPages,
        totalItems,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        prevPage: currentPage > 1 ? currentPage - 1 : null,
        // For displaying page range (e.g., "Showing 13-24 of 100")
        startItem: totalItems === 0 ? 0 : (currentPage - 1) * limit + 1,
        endItem: Math.min(currentPage * limit, totalItems)
    };
};

/**
 * Generate pagination links for view
 * @param {string} baseUrl - Base URL (e.g., '/treks')
 * @param {Object} pagination - Pagination metadata
 * @returns {Object} URLs for navigation
 */
const getPaginationLinks = (baseUrl, pagination) => {
    const { currentPage, totalPages } = pagination;

    return {
        first: `${baseUrl}?page=1`,
        last: `${baseUrl}?page=${totalPages}`,
        next: pagination.hasNext ? `${baseUrl}?page=${currentPage + 1}` : null,
        prev: pagination.hasPrev ? `${baseUrl}?page=${currentPage - 1}` : null
    };
};

module.exports = {
    getPaginationParams,
    getPaginationMetadata,
    getPaginationLinks
};