import { useState } from "react";
import classNames from "classnames";

export const TabNavigation = ({ tabs = [] }) => {
  const [activeTab, setActiveTab] = useState(
    tabs.length > 0 ? tabs[0].target : ""
  );

  const handleTabClick = (event) => {
    setActiveTab(event.target.getAttribute("data-tabs-target"));
  };

  return (
    <>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 ">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.target;
            const buttonClasses = classNames(
              "inline-block p-4 border-b-2 rounded-t-lg",
              {
                "text-black dark:text-tabText hover:text-TabText dark:hover:text-tabText border-tabText dark:border-tabText":
                  isActive,
                "dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300":
                  !isActive,
              }
            );
            return (
              <li
                className="me-2 flex-grow"
                role="presentation"
                key={tab.target}
              >
                <button
                  onClick={handleTabClick}
                  className={buttonClasses}
                  data-tabs-target={tab.target}
                  type="button"
                  role="tab"
                  aria-controls={tab.target.slice(1)}
                  aria-selected={activeTab === tab.target}
                >
                  {tab.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="text-black dark:text-white">
        {tabs.map((tab) => (
          <div
            className={`p-4 rounded-lg ${
              activeTab === tab.target ? "block " : "hidden"
            }`}
            id={tab.target.slice(1)}
            role="tabpanel"
            aria-labelledby={`${tab.target.slice(1)}-tab`}
            key={tab.target}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </>
  );
};
