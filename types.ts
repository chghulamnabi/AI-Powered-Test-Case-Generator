
export interface TestCase {
  id: string;
  description: string;
  expectedResult: string;
}

export interface TestCaseCategory {
  category: string;
  testCases: TestCase[];
}
