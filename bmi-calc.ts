export const calculateBmi = (heightCm: number, weightKg: number): string => {
  const heightM = heightCm / 100;
  const bmi = weightKg / heightM ** 2;

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal (healthy weight)";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

// ---- Command line handling ----
try {
  const [, , heightArg, weightArg] = process.argv;

  if (!heightArg || !weightArg) {
    throw new Error(
      "Please provide height and weight, e.g. npm run calculateBmi 180 91"
    );
  }

  const height = Number(heightArg);
  const weight = Number(weightArg);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Height and weight must be numbers.");
  }

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) errorMessage += " Error: " + error.message;
  console.log(errorMessage);
}
