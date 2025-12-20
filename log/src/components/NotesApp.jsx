import { useState, useMemo } from 'react';

const SidebarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-50"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);

export default function NotesApp({ freeNotes, projectLogs, systemNotes }) {
    // Determine the view: 'About', 'Project Logs', 'Free Notes' (all), or a specific series name
    const [currentView, setCurrentView] = useState('Free Notes');
    const [expandedFolders, setExpandedFolders] = useState({ 'Free Notes': true });
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Extract unique series from freeNotes
    const uniqueSeries = useMemo(() => {
        const seriesSet = new Set(freeNotes.map(note => note.data.series).filter(Boolean));
        return Array.from(seriesSet).sort();
    }, [freeNotes]);

    // Define navigation structure
    const navigation = [
        { 
            name: 'About', 
            count: systemNotes.length, 
            data: systemNotes, 
            path: '/system',
            type: 'flat'
        },
        { 
            name: 'Free Notes', 
            count: freeNotes.length, 
            data: freeNotes, 
            path: '/freeNotes',
            type: 'folder',
            subItems: uniqueSeries.map(series => ({
                name: series,
                count: freeNotes.filter(n => n.data.series === series).length,
                data: freeNotes.filter(n => n.data.series === series),
                path: '/freeNotes' // Base path remains the same, we just filter logic
            }))
        },
        { 
            name: 'Project Logs', 
            count: projectLogs.length, 
            data: projectLogs, 
            path: '/projectLogs',
            type: 'flat'
        },
    ];

    const currentData = useMemo(() => {
        // Check if current view is a main category
        const mainCategory = navigation.find(n => n.name === currentView);
        if (mainCategory) return mainCategory.data;

        // Check if current view is a series sub-item
        const freeNotesNav = navigation.find(n => n.name === 'Free Notes');
        const subItem = freeNotesNav.subItems.find(s => s.name === currentView);
        if (subItem) return subItem.data;

        return [];
    }, [currentView, navigation]);

    const filteredData = useMemo(() => {
        return currentData.filter(item => 
            item.data.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [currentData, searchQuery]);

    const getBasePath = (item) => {
        // If it's a series, it lives under Free Notes
        if (uniqueSeries.includes(currentView)) return '/freeNotes';
        
        const navItem = navigation.find(n => n.name === currentView);
        return navItem ? navItem.path : '/';
    };

    const toggleFolder = (folderName, e) => {
        e.stopPropagation();
        setExpandedFolders(prev => ({ ...prev, [folderName]: !prev[folderName] }));
    };

    return (
        <div className="flex h-screen bg-zinc-950 overflow-hidden font-sans text-zinc-100">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full bg-zinc-950 text-white z-20 flex items-center justify-between p-4 shadow-md border-b border-zinc-800">
                <span className="font-semibold text-lg">Armstrong's Log</span>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <CloseIcon /> : <SidebarIcon />}
                </button>
            </div>

            {/* Sidebar Overlay for Mobile */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-40 w-64 bg-zinc-950 text-zinc-100 transform transition-transform duration-300 ease-in-out lg:border-r border-zinc-800
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 pt-20 lg:pt-6">
                    <h1 className="text-2xl font-bold mb-8 hidden lg:block tracking-tight text-white">Armstrong's Log</h1>
                    
                    <nav className="space-y-1">
                        {navigation.map((item) => (
                            <div key={item.name} className="space-y-1">
                                <div 
                                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                                        currentView === item.name
                                            ? 'bg-zinc-800 text-white'
                                            : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                    }`}
                                    onClick={() => {
                                        setCurrentView(item.name);
                                        setSearchQuery('');
                                        if (!item.subItems) setMobileMenuOpen(false);
                                    }}
                                >
                                    <div className="flex items-center flex-1">
                                        {item.subItems && (
                                            <button 
                                                onClick={(e) => toggleFolder(item.name, e)}
                                                className="mr-2 p-0.5 rounded hover:bg-zinc-700 text-zinc-500 hover:text-white transition"
                                            >
                                                <span className={`transform transition-transform inline-block ${expandedFolders[item.name] ? 'rotate-0' : '-rotate-90'}`}>
                                                    <ChevronDown />
                                                </span>
                                            </button>
                                        )}
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="text-xs bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded-full border border-zinc-800">
                                        {item.count}
                                    </span>
                                </div>

                                {/* Sub Items (Clusters) */}
                                {item.subItems && expandedFolders[item.name] && (
                                    <div className="pl-4 space-y-1 mt-1 border-l border-zinc-800 ml-3">
                                        {item.subItems.map(sub => (
                                            <button
                                                key={sub.name}
                                                onClick={() => {
                                                    setCurrentView(sub.name);
                                                    setMobileMenuOpen(false);
                                                    setSearchQuery('');
                                                }}
                                                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors ${
                                                    currentView === sub.name
                                                        ? 'bg-zinc-900 text-blue-400'
                                                        : 'text-zinc-500 hover:text-zinc-300'
                                                }`}
                                            >
                                                <div className="flex items-center">
                                                    <FolderIcon />
                                                    <span className="truncate max-w-[120px]" title={sub.name}>{sub.name}</span>
                                                </div>
                                                <span className="text-xs text-zinc-600">
                                                    {sub.count}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
                
                <div className="absolute bottom-0 w-full p-4 border-t border-zinc-900 text-xs text-zinc-600 text-center">
                    &copy; 2025 Armstrong's Log
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-0 pt-16 lg:pt-0 bg-zinc-950">
                <div className="p-6 lg:p-10 max-w-5xl mx-auto w-full flex flex-col h-full">
                    {/* Header Controls */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-2 text-sm text-zinc-500 mb-1">
                                {uniqueSeries.includes(currentView) && (
                                    <>
                                        <span>Free Notes</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </>
                                )}
                                <span>{uniqueSeries.includes(currentView) ? 'Series' : 'Collection'}</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">{currentView}</h2>
                            <p className="text-sm text-zinc-500 mt-1">
                                {filteredData.length} {filteredData.length === 1 ? 'entry' : 'entries'} found
                            </p>
                        </div>
                        
                        {/* <div className="relative w-full sm:w-72 group">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-4 py-3 pl-10 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all focus:border-blue-500"
                            />
                            <svg className="absolute left-3 top-3.5 text-zinc-500" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div> */}
                    </div>

                    {/* Content Grid */}
                    <div className="flex-1 overflow-y-auto pr-2 pb-10">
                        {filteredData.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                {filteredData.map(item => (
                                    <a
                                        key={item.slug}
                                        href={`${getBasePath(item)}/${item.slug}`}
                                        className="group bg-zinc-900 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-zinc-900/50 hover:bg-zinc-800 transition-all duration-200 border border-zinc-800 flex flex-col h-48"
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-2 leading-snug">
                                                {item.data.title}
                                            </h3>
                                            
                                            {/* Subtitle / Metadata */}
                                            <div className="mt-2 text-sm text-zinc-400 space-y-1">
                                                 {item.data.series && (
                                                     <p className="font-medium text-blue-400 flex items-center gap-1">
                                                        <FolderIcon />
                                                        {item.data.series}
                                                     </p>
                                                )}
                                                {item.data.project && (
                                                     <p className="font-medium text-zinc-300">{item.data.project}</p>
                                                )}
                                                {item.data.date && (
                                                    <p>{new Date(item.data.date).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                {item.data.maturity && (
                                                    <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium
                                                        ${item.data.maturity === 'evergreen' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50' : 
                                                          item.data.maturity === 'budding' ? 'bg-amber-900/30 text-amber-400 border border-amber-900/50' : 
                                                          'bg-zinc-800 text-zinc-400 border border-zinc-700'}`
                                                    }>
                                                        {item.data.maturity}
                                                    </span>
                                                )}
                                                {item.data.status && (
                                                    <span className={`text-xs px-2 py-1 rounded-full capitalize font-medium
                                                        ${item.data.status === 'completed' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-900/50' : 
                                                          item.data.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400 border border-blue-900/50' : 
                                                          'bg-red-900/30 text-red-400 border border-red-900/50'}`
                                                    }>
                                                        {item.data.status}
                                                    </span>
                                                )}
                                                 {item.data.type && (
                                                    <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-1 rounded-full capitalize border border-zinc-700">
                                                        {item.data.type}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-zinc-600">
                                <p className="text-lg">No entries found</p>
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
