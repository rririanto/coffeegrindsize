// pages/index.js

import React from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const tools = [
  { name: "Grind Size Converter", slug: "grind-size-converter" },
  //{ name: "Brew Ratio Calculator", slug: "brew-ratio-calculator" },
  //{ name: "Extraction Timer", slug: "extraction-timer" },
  // Add more tools here as needed
];

const InstagramIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

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
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-400">
            Developed by @rahmatramadhanirianto
          </p>
          <a
            href="https://www.instagram.com/rahmatramadhanirianto/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <InstagramIcon className="w-6 h-6" />
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MenuPage;
