import GrindSizeConverter from "../components/GrindSizeConverter";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800 test-text-blue">
        Coffee Grind Size Converter
      </h1>
      <div className="test-bg-red p-4">
        <GrindSizeConverter />
      </div>
    </div>
  );
}
