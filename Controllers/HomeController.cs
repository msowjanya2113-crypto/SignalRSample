using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRSample.Hubs;
using SignalRSample.Models;

namespace SignalRSample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        //here add the Dependency Injection for the hub context to call the hub method from the controller
        //here the DeathlyHallowsHub is the hub class we created in the Hubs folder and we will use it to call the hub method from the controller
        private readonly IHubContext<DeathlyHallowsHub> _deathlyHub;
        //here also add the Dependency Injection for the hub context to call the hub method from the controller
        public HomeController(ILogger<HomeController> logger,
            IHubContext<DeathlyHallowsHub> deathlyHub)
        {
            _logger = logger;
            _deathlyHub = deathlyHub;
        }

        public IActionResult Index()
        {
            return View();
        }
        //give action method for DeathlyHallows here the type like cloak, wand and stone will be passed from the client side to the server side and we will increment the value of that type in the dictionary and return the updated value to the client side
        //inside this method we will give the invoke method to call the hub method to get the updated value of the type in the dictionary and return it to the client side
        public async Task<IActionResult> DeathlyHallows(string type)
        {
            //to increment the value of the type in the dictionary we will check if the type is present in the dictionary and if it is present we will increment the value of that type in the dictionary and return the updated value to the client side
            if (SD.DealthyHallowRace.ContainsKey(type)) 
            {
                SD.DealthyHallowRace[type]++;
            }
            //here add an notification for the client side to get the updated value of the type in the dictionary and return it to the client side
            //here the method name is UpdateDeathlyHallowsCount and it will be called from the client side to get the updated value of the type in the dictionary and return it to the client side
            await _deathlyHub.Clients.All.SendAsync("UpdateDeathlyHallowsCount",
                SD.DealthyHallowRace["cloak"],SD.DealthyHallowRace["stone"], SD.DealthyHallowRace["wand"]);
            return Accepted();
        }
        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
