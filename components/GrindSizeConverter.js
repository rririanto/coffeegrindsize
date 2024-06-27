import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GrindSizeConverter = () => {
  const [grinders, setGrinders] = useState([]);
  const [conversionData, setConversionData] = useState([]);
  const [selectedGrinder1, setSelectedGrinder1] = useState("");
  const [selectedGrinder2, setSelectedGrinder2] = useState("");
  const [grindSize, setGrindSize] = useState({});
  const [convertedSize, setConvertedSize] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [grindersResponse, conversionResponse] = await Promise.all([
          fetch("/grinders.json"),
          fetch("/grinder-data.json"),
        ]);

        if (!grindersResponse.ok || !conversionResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const grindersData = await grindersResponse.json();
        const conversionData = await conversionResponse.json();

        setGrinders(grindersData);
        setConversionData(conversionData);
      } catch (error) {
        console.error("Error loading data:", error);
        // You might want to set some error state here to display to the user
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (label, value) => {
    setGrindSize((prev) => ({ ...prev, [label]: value }));
  };

  const renderInputs = (grinderId) => {
    const grinder = grinders.find((g) => g.id === grinderId);
    if (!grinder) return null;

    return grinder.labels.map((label) => (
      <div key={label}>
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-700"
        >
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </label>
        <Input
          id={label}
          type="number"
          value={grindSize[label] || ""}
          onChange={(e) => handleInputChange(label, e.target.value)}
          placeholder={`Enter ${label}`}
          className="mt-1 w-full"
        />
      </div>
    ));
  };

  const convertSize = () => {
    if (!selectedGrinder1 || !selectedGrinder2) {
      alert("Please select both grinders");
      return;
    }

    const conversionEntry = conversionData.find(
      (item) =>
        item.grinder1 === selectedGrinder1 &&
        item.grinder2 === selectedGrinder2 &&
        Object.entries(grindSize).every(
          ([key, value]) => item[key] === parseInt(value)
        )
    );

    if (conversionEntry) {
      setConvertedSize(conversionEntry.results);
    } else {
      setConvertedSize("out of range");
    }
  };

  const renderResult = () => {
    if (!convertedSize) return null;
    if (convertedSize === "out of range") {
      return <p className="text-red-500">Conversion is out of range</p>;
    }

    const targetGrinder = grinders.find((g) => g.id === selectedGrinder2);
    if (!targetGrinder) return null;

    if (targetGrinder.labels.length === 1) {
      const label = targetGrinder.labels[0];
      return (
        <p className="text-gray-600">
          <span className="font-medium">
            {label.charAt(0).toUpperCase() + label.slice(1)}:
          </span>{" "}
          {convertedSize[label]}
        </p>
      );
    } else {
      return (
        <div className="space-y-2">
          {targetGrinder.labels.map((label) => (
            <p key={label} className="text-gray-600">
              <span className="font-medium">
                {label.charAt(0).toUpperCase() + label.slice(1)}:
              </span>{" "}
              {convertedSize[label]}
            </p>
          ))}
        </div>
      );
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <CardHeader>
        <h2 className="text-2xl font-bold text-gray-800">
          Grind Size Converter
        </h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="grinder1-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Grinder 1
            </label>
            <Select
              onValueChange={(value) => {
                setSelectedGrinder1(value);
                setGrindSize({});
              }}
              value={selectedGrinder1}
            >
              <SelectTrigger id="grinder1-select" className="w-full">
                <SelectValue placeholder="Choose grinder 1" />
              </SelectTrigger>
              <SelectContent>
                {grinders.map((grinder) => (
                  <SelectItem key={grinder.id} value={grinder.id}>
                    {grinder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedGrinder1 && renderInputs(selectedGrinder1)}
          <div>
            <label
              htmlFor="grinder2-select"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Grinder 2
            </label>
            <Select
              onValueChange={setSelectedGrinder2}
              value={selectedGrinder2}
            >
              <SelectTrigger id="grinder2-select" className="w-full">
                <SelectValue placeholder="Choose grinder 2" />
              </SelectTrigger>
              <SelectContent>
                {grinders.map((grinder) => (
                  <SelectItem key={grinder.id} value={grinder.id}>
                    {grinder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={convertSize}
            disabled={
              !selectedGrinder1 ||
              !selectedGrinder2 ||
              Object.keys(grindSize).length === 0
            }
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Convert
          </Button>
        </div>
        {convertedSize && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Converted Size:
            </h3>
            {renderResult()}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-gray-500 flex flex-col items-start space-y-2">
        <p className="font-semibold">Important Notes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>These conversions are based on the provided JSON data.</li>
          <li>
            If a conversion is not found in the database, it will be shown as
            "out of range".
          </li>
          <li>
            Always taste and adjust based on your specific brewing method and
            preferences.
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
};

export default GrindSizeConverter;
