import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { usePlanFeatures } from '@/hooks/usePlanFeatures';
import { SupportAnalyticsDashboard } from '@/components/SupportAnalyticsDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SupportAnalyticsPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { hasFeature } = usePlanFeatures();
  const [startDate, setStartDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30); // Default to last 30 days
    return date;
  });
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!hasFeature('analytics')) {
      navigate('/billing');
    }
  }, [user, hasFeature, navigate]);

  if (!user || !hasFeature('analytics')) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Support Analytics</h1>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => {
              const date = new Date();
              date.setDate(date.getDate() - 7);
              setStartDate(date);
              setEndDate(new Date());
            }}
          >
            Last 7 Days
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const date = new Date();
              date.setDate(date.getDate() - 30);
              setStartDate(date);
              setEndDate(new Date());
            }}
          >
            Last 30 Days
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const date = new Date();
              date.setDate(date.getDate() - 90);
              setStartDate(date);
              setEndDate(new Date());
            }}
          >
            Last 90 Days
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <SupportAnalyticsDashboard startDate={startDate} endDate={endDate} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Export your support analytics data for further analysis or reporting.
              </p>
              <div className="space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    // TODO: Implement CSV export
                    console.log('Export CSV');
                  }}
                >
                  Export as CSV
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    // TODO: Implement PDF export
                    console.log('Export PDF');
                  }}
                >
                  Export as PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select a custom date range to view analytics data.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={startDate.toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={endDate.toISOString().split('T')[0]}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 