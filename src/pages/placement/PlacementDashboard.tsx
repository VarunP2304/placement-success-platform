
import Layout from "@/components/layout/Layout";
import PlacementAnalytics from "@/components/placement/PlacementAnalytics";

const PlacementDashboard = () => {
  return (
    <Layout userType="placement">
      <div className="animate-fade-in space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Placement Department Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive placement analytics and insights
          </p>
        </div>

        <PlacementAnalytics />
      </div>
    </Layout>
  );
};

export default PlacementDashboard;
