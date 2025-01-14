import React from "react";
import { TabData } from ".";

const TabContent = ({ data }: { data: React.ReactNode & TabData }) => {
  const { name, images, stats, extraStats } = data;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Title */}
      <h2 className="text-white text-xl mb-6">{name}</h2>

      <div className="flex gap-6">
        {/* Left Column - Images Section */}
        <div className="w-1/3 flex flex-col gap-4">
          <div className="aspect-square bg-red-900/80 rounded-lg flex items-center justify-center text-white overflow-hidden">
            {images.primary ? (
              <img
                src={images.primary}
                alt="Primary"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>Primary Image</span>
            )}
          </div>
          <div className="aspect-square bg-red-900/80 rounded-lg flex items-center justify-center text-white overflow-hidden">
            {images.secondary ? (
              <img
                src={images.secondary}
                alt="Secondary"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>Secondary Image</span>
            )}
          </div>
        </div>

        {/* Right Column - Stats Section */}
        <div className="w-2/3">
          <div className="bg-gray-900 rounded-lg p-4">
            {/* Stats Header */}
            <h3 className="text-white text-lg mb-4">Stats</h3>

            {/* Stats Table */}
            <div className="space-y-3">
              <div className="grid grid-cols-3 text-white font-medium">
                <div>Attribute Name</div>
                <div>Type</div>
                <div>Value</div>
              </div>
              <div className="h-px bg-gray-700" />

              {/* Stats Rows */}
              {stats.map((stat, index) => (
                <div key={index} className="grid grid-cols-3 text-white/70">
                  <div>{stat.attributeName}</div>
                  <div>{stat.type}</div>
                  <div>{stat.value}</div>
                </div>
              ))}

              {/* Extra Section */}
              <h3 className="text-white text-lg pt-6 mb-4">Extra</h3>
              {extraStats.map((stat, index) => (
                <div key={index} className="grid grid-cols-3 text-white/70">
                  <div>{stat.attributeName}</div>
                  <div>{stat.type}</div>
                  <div>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;