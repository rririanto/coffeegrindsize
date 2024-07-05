import { useRouter } from "next/router";
import React, { useState, useMemo, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import grindersData from "./grinders.json";

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

const GrindSizeConverter = () => {
  const [selectedGrinder, setSelectedGrinder] = useState(
    "1Zpresso ZP6 Special"
  );
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [matchingMethods, setMatchingMethods] = useState([]);
  const [showAllGrinders, setShowAllGrinders] = useState(false);

  const criteriaOptions = useMemo(() => {
    const options = [
      { value: "brewingMethods", label: "Brewing Methods" },
      { value: "microns", label: "Microns" },
      { value: "grindSize", label: "Grind Size" },
    ];
    if (!showAllGrinders) {
      options.splice(1, 0, {
        value: grindersData[selectedGrinder].units,
        label:
          grindersData[selectedGrinder].units.charAt(0).toUpperCase() +
          grindersData[selectedGrinder].units.slice(1),
      });
    }
    return options;
  }, [selectedGrinder, showAllGrinders]);

  const valueOptions = useMemo(() => {
    if (selectedCriteria === "brewingMethods") {
      return grindersData[selectedGrinder].brewingMethods.map((method) => ({
        value: method.name,
        label: method.name,
      }));
    } else if (selectedCriteria === "microns") {
      return Array.from({ length: 15 }, (_, i) => ({
        value: ((i + 1) * 100).toString(),
        label: `${(i + 1) * 100} µm`,
      }));
    } else if (selectedCriteria === grindersData[selectedGrinder].units) {
      const [min, max] = grindersData[selectedGrinder].range;
      const step =
        grindersData[selectedGrinder].units === "rotations" ? 0.01 : 1;
      return Array.from(
        { length: Math.floor((max - min) / step) + 1 },
        (_, i) => {
          const value = (min + i * step).toFixed(
            grindersData[selectedGrinder].units === "rotations" ? 2 : 0
          );
          return { value, label: value };
        }
      );
    } else if (selectedCriteria === "grindSize") {
      return [
        "Extra Fine",
        "Fine",
        "Medium Fine",
        "Medium",
        "Medium Coarse",
        "Coarse",
        "Extra Coarse",
      ].map((size) => ({ value: size, label: size }));
    }
    return [];
  }, [selectedCriteria, selectedGrinder]);

  const handleGrinderChange = (value) => {
    setSelectedGrinder(value);
    setSelectedCriteria("");
    setSelectedValue("");
    setMatchingMethods([]);
  };

  const handleCriteriaChange = (value) => {
    setSelectedCriteria(value);
    setSelectedValue("");
    setMatchingMethods([]);
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleShowAllGrindersChange = (checked) => {
    setShowAllGrinders(checked);
    setSelectedCriteria("");
    setSelectedValue("");
    setMatchingMethods([]);
  };

  const handleFind = () => {
    let allMethods = [];
    const grindersToCheck = showAllGrinders
      ? Object.keys(grindersData)
      : [selectedGrinder];

    grindersToCheck.forEach((grinderName) => {
      const grinder = grindersData[grinderName];
      let methods;
      if (selectedCriteria === "brewingMethods") {
        methods = grinder.brewingMethods.filter(
          (method) => method.name === selectedValue
        );
      } else if (selectedCriteria === "microns") {
        const value = parseFloat(selectedValue);
        methods = grinder.brewingMethods.filter(
          (method) => value >= method.microns[0] && value <= method.microns[1]
        );
      } else if (selectedCriteria === grinder.units) {
        const value = parseFloat(selectedValue);
        methods = grinder.brewingMethods.filter(
          (method) =>
            method[grinder.units] &&
            method[grinder.units][0] !== null &&
            method[grinder.units][1] !== null &&
            value >= method[grinder.units][0] &&
            value <= method[grinder.units][1]
        );
      } else if (selectedCriteria === "grindSize") {
        methods = grinder.brewingMethods.filter((method) =>
          method.grindSize.includes(selectedValue)
        );
      }
      allMethods = [
        ...allMethods,
        ...methods.map((method) => ({ ...method, grinder: grinderName })),
      ];
    });

    setMatchingMethods(allMethods);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">
          Coffee Brewing Method Selector
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showAllGrinders"
            checked={showAllGrinders}
            onCheckedChange={handleShowAllGrindersChange}
          />
          <Label htmlFor="showAllGrinders">Show results for all grinders</Label>
        </div>

        {!showAllGrinders && (
          <div className="space-y-2">
            <Label htmlFor="grinder">Select Grinder</Label>
            <Select onValueChange={handleGrinderChange} value={selectedGrinder}>
              <SelectTrigger id="grinder">
                <SelectValue placeholder="Select Grinder" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(grindersData).map((grinder) => (
                  <SelectItem key={grinder} value={grinder}>
                    {grindersData[grinder].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="criteria">Select Criteria</Label>
          <Select onValueChange={handleCriteriaChange} value={selectedCriteria}>
            <SelectTrigger id="criteria">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {criteriaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCriteria && (
          <div className="space-y-2">
            <Label htmlFor="value">Select Value</Label>
            <Select onValueChange={handleValueChange} value={selectedValue}>
              <SelectTrigger id="value">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {valueOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Button className="w-full" onClick={handleFind}>
          Find Methods
        </Button>

        {matchingMethods.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Matching Brewing Methods:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {matchingMethods.map((method, index) => (
                <li key={`${method.grinder}-${method.name}-${index}`}>
                  <strong>{method.name}</strong> ({method.grinder})
                  <br />
                  {grindersData[method.grinder].units.charAt(0).toUpperCase() +
                    grindersData[method.grinder].units.slice(1)}
                  :{" "}
                  {method[grindersData[method.grinder].units][0] === null
                    ? "N/A"
                    : `${method[grindersData[method.grinder].units][0]} - ${
                        method[grindersData[method.grinder].units][1]
                      }`}
                  <br />
                  Grind Size: {method.grindSize}
                  <br />
                  Microns: {method.microns[0]} - {method.microns[1]} µm
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start text-sm text-gray-600">
        <h4 className="font-semibold mb-2">Important Notes:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>These recommendations are based on general guidelines.</li>
          <li>
            Adjust grind size based on your specific equipment and taste
            preferences.
          </li>
          <li>
            Different grinders may use different units (rotations, clicks, or
            notches).
          </li>
          <li>
            Some methods may not have specific settings for certain grinders
            (shown as N/A).
          </li>
        </ul>
      </CardFooter>
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
  );
};

export default GrindSizeConverter;
