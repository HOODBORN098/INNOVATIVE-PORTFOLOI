import { LivePortfolioProject } from "./live-projects/LivePortfolioProject";
import { LiveStudentManagementProject } from "./live-projects/LiveStudentManagementProject";
import { LiveAlgorithmVisualizerProject } from "./live-projects/LiveAlgorithmVisualizerProject";
import { LiveBookRecommenderProject } from "./live-projects/LiveBookRecommenderProject";
import { LiveCampusEventsProject } from "./live-projects/LiveCampusEventsProject";
import { LiveNetworkScannerProject } from "./live-projects/LiveNetworkScannerProject";
import { LiveWeatherAnalyticsProject } from "./live-projects/LiveWeatherAnalyticsProject";

export function LiveProjectDeployer({ projectId }: { projectId: string }) {
  switch (projectId) {
    case "portfolio":
      return <LivePortfolioProject />;
    case "student-management":
      return <LiveStudentManagementProject />;
    case "algorithm-visualizer":
      return <LiveAlgorithmVisualizerProject />;
    case "book-recommender":
      return <LiveBookRecommenderProject />;
    case "campus-events":
      return <LiveCampusEventsProject />;
    case "network-scanner":
      return <LiveNetworkScannerProject />;
    case "weather-analytics":
      return <LiveWeatherAnalyticsProject />;
    default:
      return (
        <div className="w-full h-[600px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">Project demo not available</p>
        </div>
      );
  }
}