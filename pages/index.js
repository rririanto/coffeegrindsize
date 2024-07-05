// pages/index.js

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const tools = [
  { name: "Grind Size Converter", slug: "grind-size-converter" },
  //{ name: "Brew Ratio Calculator", slug: "brew-ratio-calculator" },
  //{ name: "Extraction Timer", slug: "extraction-timer" },
  // Add more tools here as needed
];

const MenuPage = () => {
  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-white shadow-lg rounded-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-800">
            Coffee Tools By @Kuncikuppi
          </h1>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {tool.name}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block ml-2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuPage;
