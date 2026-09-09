using Microsoft.AspNetCore.SignalR;
namespace SignalRSample.Hubs
{
    public class DeathlyHallowsHub : Hub
    {
        public Dictionary<string, int> DealthyHallowRace()
        {
                       return SD.DealthyHallowRace;
        }
    }
}
