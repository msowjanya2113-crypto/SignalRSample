//give here like this and change the method there like
var clockSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");
//create an connection to the server using SignalR
//near withUrl copy the connection from the hub class in the server side and build() we create an connection to the server
//to not show any logs in the console we can use connectionUserCount.logging = signalR.LogLevel.None; but here we want to show the logs in the console so we can use connectionUserCount.logging = signalR.LogLevel.Information;
//To show the detailed log we use connectionUserCount.logging = signalR.LogLevel.Trace; but here we want to show the logs in the console so we can use connectionUserCount.logging = signalR.LogLevel.Information;
//here give an con of connectionDeathlyHallows to connect to the server using SignalR and near withUrl copy the connection from the hub class in the server side and build() we create an connection to the server
var connectionDeathlyHallows = new signalR.HubConnectionBuilder().withUrl("/hubs/deathlyHallow").build();

//connect to methods that hub involves to receive notification from hub(Server) and convert value to string.
//before the count was not showing because here near newCountSpan the id shld match the index.html file span id
//here change the method name to UpdateDeathlyHallowCount and add the parameters cloak,stone,wand to receive the values from the server
connectionDeathlyHallows.on("UpdateDeathlyHallowsCount", (cloak, stone, wand) => {
    clockSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
});
//start connection to the server
//it has two methods like fullfilled and rejected , if connection is fullfilled then it will execute the function inside then() and if rejected it will execute the function inside catch()
//in new tab when we load we wont get the count of cloak,stone,wand because we need to invoke the function to send the notification to the server when a new window is loaded
function fulfilled() {
    connectionDeathlyHallows.invoke("GetRaceStatus").then((racecounter) => {
        clockSpan.innerText = racecounter.toString();
        stoneSpan.innerText = racecounter.toString();
        wandSpan.innerText = racecounter.toString();
    });
    console.log("Connection to the server is established successfully.");
    //before it was newWindowLoadedClient(); but here we need to invoke the function to send the notification to the server when a new window is loaded
    //and the count was coming two removed there so now it will come 1 
}
function rejected() {
    //rejected logs
}
connectionDeathlyHallows.start().then(fulfilled, rejected); 