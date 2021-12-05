interface HumanReadableDiagnostic {
  gammaRate: number;
  epsilonRate: number;
  powerConsumption: number;
  oxygenGeneratorRating: number;
  co2ScrubberRating: number;
  lifeSupportRating: number;
}

type Bit = '0' | '1';
type BinaryValue = `${Bit}${Bit}${Bit}${Bit}${Bit}`;

export const parseDiagnosticResult = (input: string): BinaryValue[] => {
  return input
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s !== '') as BinaryValue[];
};

function calculateForAllBits<T>(
  binaryValues: BinaryValue[],
  calcFn: (bitValues: Bit[]) => T,
): T[] {
  return [...binaryValues[0]].map((_, index) => {
    return calcFn(binaryValues.map((values) => values[index] as Bit));
  });
}

function filterForAllBitsUntilOneValue(
  binaryValues: BinaryValue[],
  filterFn: (binaryValues: BinaryValue[], bitValues: Bit[]) => BinaryValue[],
): BinaryValue {
  let inCourseBinaryValues = binaryValues;
  [...binaryValues[0]].some((_, index) => {
    inCourseBinaryValues = filterFn(
      inCourseBinaryValues,
      inCourseBinaryValues.map((values) => values[index] as Bit),
    );
    return inCourseBinaryValues.length === 1;
  });

  if (inCourseBinaryValues.length !== 1) {
    throw new Error('Invalid result');
  }

  return inCourseBinaryValues[0];
}

const countBitsByValue = (bitValues: Bit[]): Record<Bit, number> => {
  const countByValue: Record<Bit, number> = { '0': 0, '1': 0 };

  bitValues.forEach((bitValue) => {
    countByValue[bitValue]++;
  });

  return countByValue;
};

const calculateMostCommonBit = (
  bitValues: Bit[],
  ifEquality: Bit | null = null,
): Bit => {
  const countByValue = countBitsByValue(bitValues);
  if (countByValue['1'] === countByValue['0']) {
    if (ifEquality === null) throw new Error('Unexpected equality');
    return ifEquality;
  }
  return countByValue['1'] > countByValue['0'] ? '1' : '0';
};

const calculateLeastCommonBit = (
  bitValues: Bit[],
  ifEquality: Bit | null = null,
): Bit => {
  const countByValue = countBitsByValue(bitValues);
  if (countByValue['1'] === countByValue['0']) {
    if (ifEquality === null) throw new Error('Unexpected equality');
    return ifEquality;
  }
  return countByValue['1'] < countByValue['0'] ? '1' : '0';
};

const calculateGammaRate = (binaryValues: BinaryValue[]): number => {
  const mostCommonBits = calculateForAllBits(
    binaryValues,
    calculateMostCommonBit,
  );

  const binaryGammaRate = mostCommonBits.join('');
  return parseInt(binaryGammaRate, 2);
};

const calculateEpsilonRate = (binaryValues: BinaryValue[]): number => {
  const mostCommonBits = calculateForAllBits(
    binaryValues,
    calculateLeastCommonBit,
  );

  const binaryEpsilonRate = mostCommonBits.join('');
  return parseInt(binaryEpsilonRate, 2);
};

const calculateOxygenGeneratorRating = (
  binaryValues: BinaryValue[],
): number => {
  const binaryOxygenGeneratorRating = filterForAllBitsUntilOneValue(
    binaryValues,
    (leftBinaryValues, bitValues) => {
      const mostCommonBit = calculateMostCommonBit(bitValues, '1');
      return leftBinaryValues.filter(
        (_, index) => bitValues[index] === mostCommonBit,
      );
    },
  );
  return parseInt(binaryOxygenGeneratorRating, 2);
};

const calculateCo2ScrubberRating = (binaryValues: BinaryValue[]): number => {
  const binaryCo2ScrubberRating = filterForAllBitsUntilOneValue(
    binaryValues,
    (leftBinaryValues, bitValues) => {
      const leastCommonBit = calculateLeastCommonBit(bitValues, '0');
      return leftBinaryValues.filter(
        (_, index) => bitValues[index] === leastCommonBit,
      );
    },
  );
  return parseInt(binaryCo2ScrubberRating, 2);
};
export const processDiagnosticResult = (
  input: string,
): HumanReadableDiagnostic => {
  const binaryValues = parseDiagnosticResult(input);
  const gammaRate = calculateGammaRate(binaryValues);
  const epsilonRate = calculateEpsilonRate(binaryValues);
  const oxygenGeneratorRating = calculateOxygenGeneratorRating(binaryValues);
  const co2ScrubberRating = calculateCo2ScrubberRating(binaryValues);

  return {
    gammaRate,
    epsilonRate,
    powerConsumption: gammaRate * epsilonRate,
    oxygenGeneratorRating,
    co2ScrubberRating,
    lifeSupportRating: oxygenGeneratorRating * co2ScrubberRating,
  };
};
