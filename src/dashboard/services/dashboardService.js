// Dashboard service for fetching and aggregating data
export const fetchDashboardData = async () => {
  try {
    // Fetch data from multiple endpoints in parallel
    const [devicesResponse, statisticsResponse, eventsResponse] = await Promise.all([
      fetch('/api/devices'),
      fetch('/api/statistics?' + new URLSearchParams({
        from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
        to: new Date().toISOString(),
      })),
      fetch('/api/events?' + new URLSearchParams({
        from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
        to: new Date().toISOString(),
      })),
    ]);

    const devices = devicesResponse.ok ? await devicesResponse.json() : [];
    const statistics = statisticsResponse.ok ? await statisticsResponse.json() : [];
    const events = eventsResponse.ok ? await eventsResponse.json() : [];

    // Process fleet overview data
    const fleetOverview = {
      total: devices.length,
      online: devices.filter(d => d.status === 'online').length,
      offline: devices.filter(d => d.status === 'offline').length,
      unknown: devices.filter(d => d.status === 'unknown').length,
    };

    // Process recent activity (last device updates)
    const recentActivity = devices
      .filter(d => d.lastUpdate)
      .sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate))
      .slice(0, 10)
      .map(device => ({
        id: device.id,
        name: device.name,
        status: device.status,
        lastUpdate: device.lastUpdate,
        uniqueId: device.uniqueId,
      }));

    // Process alerts data
    const alerts = {
      total: events.length,
      recent: events
        .sort((a, b) => new Date(b.eventTime) - new Date(a.eventTime))
        .slice(0, 5)
        .map(event => ({
          id: event.id,
          type: event.type,
          eventTime: event.eventTime,
          deviceId: event.deviceId,
        })),
    };

    // Process quick stats (use latest statistics entry)
    const latestStats = statistics.length > 0 ? statistics[statistics.length - 1] : {};
    const quickStats = {
      activeUsers: latestStats.activeUsers || 0,
      messagesReceived: latestStats.messagesReceived || 0,
      messagesStored: latestStats.messagesStored || 0,
      requests: latestStats.requests || 0,
    };

    return {
      fleetOverview,
      recentActivity,
      alerts,
      quickStats,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Helper function to get device status color
export const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return 'success';
    case 'offline':
      return 'error';
    case 'unknown':
    default:
      return 'warning';
  }
};

// Helper function to format time ago
export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}; 