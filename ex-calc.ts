interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((h) => h > 0).length;
  const average = dailyHours.reduce((sum, h) => sum + h, 0) / periodLength;
  const success = average >= target;

  let rating: 1 | 2 | 3;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job, target met!";
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "you need to train more";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// ---- Command line handling ----
try {
  const [, , ...args] = process.argv;

  if (args.length < 2) {
    throw new Error("Please provide target followed by daily exercise hours.");
  }

  const [targetArg, ...dailyArgs] = args;
  const target = Number(targetArg);
  const dailyHours = dailyArgs.map(Number);

  if (isNaN(target) || dailyHours.some(isNaN)) {
    throw new Error("All arguments must be numbers.");
  }

  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) errorMessage += " Error: " + error.message;
  console.log(errorMessage);
}
