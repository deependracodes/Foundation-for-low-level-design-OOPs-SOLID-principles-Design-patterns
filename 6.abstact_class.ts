abstract class ReportGenerator {
  // Shared concrete method for database connection logic
  connectDB(): void {
    console.log("Connecting to database infrastructure");
  }

  // Template method: Defines the high-level workflow invariant across all report types
  generate(data: string[]): void {
    console.log("Input content:", data);
    const content = this.format(data);
    console.log("Formatted content:\n", content);
    this.save(content);
  }

  // Shared concrete method for saving the final generated report
  save(content: string): void {
    this.connectDB();
    console.log("Saving report to database");
  }

  // Abstract method: Forces subclasses to implement their specific formatting logic
  abstract format(data: string[]): string;
}

class CSVReportGenerator extends ReportGenerator {
  // Concrete implementation for CSV formatting
  // these clases also share parent class methods also
  format(data: string[]): string {
    console.log("Formatting data to CSV");
    return data.join(",");
  }
}

class JSONReportGenerator extends ReportGenerator {
  // Concrete implementation for proper, structured JSON formatting
  format(data: string[]): string {
    return this.arrayToJsonKeyValue(data);
  }

  private arrayToJsonKeyValue(arr: string[]): string {
    const result: Record<string, string | null> = {};

    for (let i = 0; i < arr.length; i += 2) {
      const key = arr[i];
      const value = i + 1 < arr.length ? arr[i + 1] : null;
      result[key] = value;
    }

    return JSON.stringify(result, null, 2);
  }
}

const csv = new CSVReportGenerator();
csv.generate(["apple", "banana"]);

const json = new JSONReportGenerator();
json.generate(["name", "alex", "gender","male"]);
