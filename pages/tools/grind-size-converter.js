import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
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

const grinders = {
  "1Zpresso ZP6 Special": {
    name: "1Zpresso ZP6 Special",
    units: "rotations",
    range: [0, 1.36],
    brewingMethods: [
      {
        name: "Turkish",
        rotations: [null, null],
        microns: [40, 220],
        grindSize: "Extra Fine",
      },
      {
        name: "Espresso",
        rotations: [null, null],
        microns: [180, 380],
        grindSize: "Fine",
      },
      {
        name: "V60",
        rotations: [0, 0.36],
        microns: [400, 700],
        grindSize: "Medium Fine",
      },
      {
        name: "Aeropress",
        rotations: [0, 0.7],
        microns: [320, 960],
        grindSize: "Fine to Medium",
      },
      {
        name: "Moka Pot",
        rotations: [0, 0.31],
        microns: [360, 660],
        grindSize: "Fine",
      },
      {
        name: "Pour Over",
        rotations: [0, 0.66],
        microns: [410, 930],
        grindSize: "Medium",
      },
      {
        name: "Siphon",
        rotations: [0, 0.49],
        microns: [375, 800],
        grindSize: "Medium",
      },
      {
        name: "Filter Coffee Machine",
        rotations: [0, 0.62],
        microns: [300, 900],
        grindSize: "Medium",
      },
      {
        name: "French Press",
        rotations: [0.36, 1.23],
        microns: [690, 1300],
        grindSize: "Coarse",
      },
      {
        name: "Cupping",
        rotations: [0.07, 0.56],
        microns: [460, 850],
        grindSize: "Medium Coarse",
      },
      {
        name: "Cold Brew",
        rotations: [0.5, 1.36],
        microns: [800, 1440],
        grindSize: "Extra Coarse",
      },
      {
        name: "Cold Drip",
        rotations: [0.53, 1.19],
        microns: [820, 1270],
        grindSize: "Coarse",
      },
      {
        name: "Steep-and-release",
        rotations: [0.06, 0.52],
        microns: [450, 825],
        grindSize: "Medium",
      },
    ],
  },
  "Comandante C40 MK4": {
    name: "Comandante C40 MK4",
    units: "clicks",
    range: [0, 40],
    brewingMethods: [
      {
        name: "Turkish",
        clicks: [2, 8],
        microns: [40, 220],
        grindSize: "Extra Fine",
      },
      {
        name: "Espresso",
        clicks: [7, 13],
        microns: [180, 380],
        grindSize: "Fine",
      },
      {
        name: "V60",
        clicks: [15, 25],
        microns: [400, 700],
        grindSize: "Medium Fine",
      },
      {
        name: "Aeropress",
        clicks: [12, 35],
        microns: [320, 960],
        grindSize: "Fine to Medium",
      },
      {
        name: "Moka Pot",
        clicks: [14, 24],
        microns: [360, 660],
        grindSize: "Fine to Medium Fine",
      },
      {
        name: "Pour Over",
        clicks: [16, 34],
        microns: [410, 930],
        grindSize: "Medium",
      },
      {
        name: "Siphon",
        clicks: [14, 29],
        microns: [375, 800],
        grindSize: "Medium",
      },
      {
        name: "Filter Coffee Machine",
        clicks: [12, 33],
        microns: [300, 900],
        grindSize: "Medium",
      },
      {
        name: "French Press",
        clicks: [26, 40],
        microns: [690, 1300],
        grindSize: "Coarse",
      },
      {
        name: "Cupping",
        clicks: [17, 31],
        microns: [460, 850],
        grindSize: "Medium Coarse",
      },
      {
        name: "Cold Brew",
        clicks: [30, 40],
        microns: [800, 1440],
        grindSize: "Extra Coarse",
      },
      {
        name: "Cold Drip",
        clicks: [31, 40],
        microns: [820, 1270],
        grindSize: "Extra Coarse",
      },
      {
        name: "Steep-and-release",
        clicks: [17, 30],
        microns: [450, 825],
        grindSize: "Medium to Medium Coarse",
      },
    ],
  },
};

const GrindSizeConverter = () => {
  const [selectedGrinder, setSelectedGrinder] = useState(
    "1Zpresso ZP6 Special"
  );
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [matchingMethods, setMatchingMethods] = useState([]);

  const criteriaOptions = useMemo(() => {
    const options = [
      { value: "brewingMethods", label: "Brewing Methods" },
      {
        value: grinders[selectedGrinder].units,
        label:
          grinders[selectedGrinder].units.charAt(0).toUpperCase() +
          grinders[selectedGrinder].units.slice(1),
      },
      { value: "microns", label: "Microns" },
      { value: "grindSize", label: "Grind Size" },
    ];
    return options;
  }, [selectedGrinder]);

  const valueOptions = useMemo(() => {
    if (selectedCriteria === "brewingMethods") {
      return grinders[selectedGrinder].brewingMethods.map((method) => ({
        value: method.name,
        label: method.name,
      }));
    } else if (selectedCriteria === "microns") {
      return Array.from({ length: 15 }, (_, i) => ({
        value: ((i + 1) * 100).toString(),
        label: `${(i + 1) * 100} µm`,
      }));
    } else if (selectedCriteria === grinders[selectedGrinder].units) {
      const [min, max] = grinders[selectedGrinder].range;
      const step = grinders[selectedGrinder].units === "rotations" ? 0.01 : 1;
      return Array.from(
        { length: Math.floor((max - min) / step) + 1 },
        (_, i) => {
          const value = (min + i * step).toFixed(
            grinders[selectedGrinder].units === "rotations" ? 2 : 0
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

  const handleFind = () => {
    const grinder = grinders[selectedGrinder];
    let methods;
    if (selectedCriteria === "brewingMethods") {
      methods = grinder.brewingMethods.filter(
        (method) => method.name === selectedValue
      );
    } else if (
      selectedCriteria === grinder.units ||
      selectedCriteria === "microns"
    ) {
      const value = parseFloat(selectedValue);
      methods = grinder.brewingMethods.filter(
        (method) =>
          method[selectedCriteria] &&
          method[selectedCriteria][0] !== null &&
          method[selectedCriteria][1] !== null &&
          value >= method[selectedCriteria][0] &&
          value <= method[selectedCriteria][1]
      );
    } else if (selectedCriteria === "grindSize") {
      methods = grinder.brewingMethods.filter((method) =>
        method.grindSize.includes(selectedValue)
      );
    }
    setMatchingMethods(methods);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">
          Coffee Brewing Method Selector
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="grinder">Select Grinder</Label>
          <Select onValueChange={handleGrinderChange} value={selectedGrinder}>
            <SelectTrigger id="grinder">
              <SelectValue placeholder="Select Grinder" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(grinders).map((grinder) => (
                <SelectItem key={grinder} value={grinder}>
                  {grinders[grinder].name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
              {matchingMethods.map((method) => (
                <li key={method.name}>
                  <strong>{method.name}</strong>
                  <br />
                  {grinders[selectedGrinder].units.charAt(0).toUpperCase() +
                    grinders[selectedGrinder].units.slice(1)}
                  :{" "}
                  {method[grinders[selectedGrinder].units][0] === null
                    ? "N/A"
                    : `${method[grinders[selectedGrinder].units][0]} - ${
                        method[grinders[selectedGrinder].units][1]
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
            The 1Zpresso ZP6 Special uses rotations, while the Comandante C40
            MK4 uses clicks.
          </li>
          <li>
            Some methods may not have specific rotation settings for the
            1Zpresso ZP6 Special (shown as N/A).
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
};

export default GrindSizeConverter;
