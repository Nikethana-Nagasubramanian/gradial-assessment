type TabNavigationProps<T extends string> = {
  tabs: { id: T; label: string }[];
  activeTab: T;
  setActiveTab: (tab: T) => void;
};

export function TabNavigation<T extends string>({
  tabs,
  activeTab,
  setActiveTab,
}: TabNavigationProps<T>) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, tabId: T) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveTab(tabId);
    } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const currentIndex = tabs.findIndex((t) => t.id === activeTab);
      const nextIndex = e.key === "ArrowRight" 
        ? (currentIndex + 1) % tabs.length
        : (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
      // Focus the next tab
      const nextTabId = `${tabs[nextIndex].id}-tab`;
      document.getElementById(nextTabId)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveTab(tabs[0].id);
      document.getElementById(`${tabs[0].id}-tab`)?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveTab(tabs[tabs.length - 1].id);
      document.getElementById(`${tabs[tabs.length - 1].id}-tab`)?.focus();
    }
  };

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 relative" role="tablist" aria-label="Editor tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id ? "true" : "false"}
          aria-controls={`${tab.id}-panel`}
          id={`${tab.id}-tab`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          className={`flex-1 px-2 py-1 text-sm font-medium transition-all duration-300 ease-in-out rounded-md relative z-10 ${
            activeTab === tab.id
              ? "text-gray-900 bg-white shadow-sm"
              : "text-gray-700 bg-gray-100 hover:text-gray-900"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

