using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class UserHub : Hub
    {
        //here added for total views count
        public static int TotalViews { get; set; } = 0; //as it shld start from 0 
        //to know the total user who have connected and when the connection is closed we will decrement the count
        public static int TotalUsers { get; set; } = 0; //as it shld start from 0

        //now create a method to increment the total users count when a new user connects
        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            //send the updated total users count to all clients
            //this will call the UpdateTotalUsers method on the client side and pass the updated total users count
            Clients.All.SendAsync("UpdateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        //now create a method to decrement the total users count when a user disconnects
        public override  Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            //this will call the UpdateTotalUsers method on the client side and pass the updated total users count
            Clients.All.SendAsync("UpdateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }

        //now create an method to increment the total views count and send it to all clients
        public async Task<string> NewWindowLoaded(string name) //here also added <string> and add here the name 
        {
            TotalViews++;
            //send the updated total views count to all clients
            //this will call the UpdateTotalViews method on the client side and pass the updated total views count
            //await Clients.All.SendAsync("methodname", parameter);
            await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
            //here adding an method for invoke
            //by this in inspect of the server u can see the total views count is updated in real time when a new window is loaded
            //add here the name also to know which user has loaded the new window
            return $"Total Views from {name} - {TotalViews}";
        }
        //to connect to client side 
        //Right Click on the project and select Add > Client Side Library.
        //In the dialog,select the provider as unpkg and select the library you want to add (for example, @microsoft/signalr@latest) and click Install. This will add the necessary client-side files to your project.
        //click next you can see those are downloaded in the wwwroot/lib folder. Now you can use those files in your HTML pages to connect to the SignalR hub and receive real-time updates.
    }
}
