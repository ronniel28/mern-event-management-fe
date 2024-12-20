const DashboardSummary = () => {
    const summary = [
        { title: "events", count: 5, description: "in next 180 days" },
        { title: "booked", count: 27, description: "in past 365 days" },
        { title: "active", count: 19 },
        { title: "archived", count: 44 },
    ];

    return (
        <div className="flex justify-between flex-wrap gap-6 my-6">
            {summary.map((item, index) => (
                <div
                    key={index}
                    aria-label={`${item.title} summary`}
                    className="flex flex-col items-center justify-center bg-blue-50 shadow-lg rounded-lg w-36 h-36 hover:bg-blue-100 transition duration-300 ease-in-out"
                >
                    <p className="text-4xl font-extrabold text-blue-600">{item.count}</p>
                    <p className="capitalize font-semibold text-gray-700">{item.title}</p>
                    {item.description && (
                        <p className="text-xs text-gray-500 mt-1 text-center px-2">
                            {item.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default DashboardSummary;
