"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const IdeasList = () => {
    const [ideas, setIdeas] = useState([]);
    const [sort, setSort] = useState("-published_at");
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalIdeas, setTotalIdeas] = useState(0);

    useEffect(() => {
        const storedSort = localStorage.getItem("sort");
        const storedPageSize = localStorage.getItem("pageSize");
        const storedCurrentPage = localStorage.getItem("currentPage");

        if (storedSort) setSort(storedSort);
        if (storedPageSize) setPageSize(parseInt(storedPageSize, 10));
        if (storedCurrentPage) setCurrentPage(parseInt(storedCurrentPage, 10));
    }, []);

    useEffect(() => {
        fetchIdeas();
    }, [sort, pageSize, currentPage]);

    const fetchIdeas = async () => {
        try {
            const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
                params: {
                    'page[number]': currentPage,
                    'page[size]': pageSize,
                    'append[]': ['small_image', 'medium_image'],  // Kirim sebagai array
                    sort: sort,
                },
            });
            console.log('API Response:', response.data);
            setIdeas(response.data.data);
            setTotalIdeas(response.data.meta.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSortChange = (newSort) => {
        setSort(newSort);
        localStorage.setItem("sort", newSort);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        localStorage.setItem("pageSize", newPageSize);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        localStorage.setItem("currentPage", newPage);
    };

    const start = (currentPage - 1) * pageSize + 1;
    const end = Math.min(currentPage * pageSize, totalIdeas);

    const totalPages = Math.ceil(totalIdeas / pageSize);
    const pageNumbers = [];

    // Generate page numbers (e.g., 1, 2, 3, 4, 5)
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <section className="bg-white">
            <div className="bg-white px-4 text-gray-900 md:px-14 mt-[50px] mb-12">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p>
                            Showing {start} - {end} of {totalIdeas}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div>
                            <label htmlFor="pageSize" className="mr-2">
                                Show per page:
                            </label>
                            <select
                                id="pageSize"
                                value={pageSize}
                                onChange={(e) => handlePageSizeChange(e.target.value)}
                                className="border rounded-lg p-1"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sort" className="mr-2">
                                Sort by:
                            </label>
                            <select
                                id="sort"
                                value={sort}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="border rounded-lg p-1"
                            >
                                <option value="-published_at">Newest</option>
                                <option value="published_at">Oldest</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {ideas.map((idea) => (
                        <div key={idea.id} className="border rounded-lg mx-w-sm p-4">
                            {idea.small_image && (
                                <img
                                    src={idea.small_image.url}
                                    alt={idea.title}
                                    className="mb-2"
                                    onError={(e) => e.target.src = '/placeholder.jpg'} // fallback image
                                />
                            )}
                            <h3 className="text-lg font-bold mb-2">{idea.title}</h3>
                            <p>{idea.summary}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex justify-center space-x-1">
                    <button
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                        className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'} hover:text-orange-500`}
                    >
                        «
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-black'} hover:text-orange-500`}
                    >
                        ‹
                    </button>
                    {pageNumbers.slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2)).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`p-2 ${page === currentPage ? 'bg-orange-500 text-white' : 'text-black'} rounded-lg hover:bg-orange-500 hover:text-white`}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage * pageSize >= totalIdeas}
                        className={`p-2 ${currentPage * pageSize >= totalIdeas ? 'text-gray-400 cursor-not-allowed' : 'text-black'} hover:text-orange-500`}
                    >
                        ›
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage * pageSize >= totalIdeas}
                        className={`p-2 ${currentPage * pageSize >= totalIdeas ? 'text-gray-400 cursor-not-allowed' : 'text-black'} hover:text-orange-500`}
                    >
                        »
                    </button>
                </div>
            </div>
        </section>
    );
};

export default IdeasList;
