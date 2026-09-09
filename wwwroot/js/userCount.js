//create an connection to the server using SignalR
//near withUrl copy the connection from the hub class in the server side and build() we create an connection to the server
//to not show any logs in the console we can use connectionUserCount.logging = signalR.LogLevel.None; but here we want to show the logs in the console so we can use connectionUserCount.logging = signalR.LogLevel.Information;
//To show the detailed log we use connectionUserCount.logging = signalR.LogLevel.Trace; but here we want to show the logs in the console so we can use connectionUserCount.logging = signalR.LogLevel.Information;
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

//connect to methods that hub involves to receive notification from hub(Server) and convert value to string.
//before the count was not showing because here near newCountSpan the id shld match the index.html file span id 
connectionUserCount.on("UpdateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewsCount");
    newCountSpan.innerText = value.toString();
});
//for count of connected users
connectionUserCount.on("UpdateTotalUsers", (value) => {
    var newCountSpan = document.getElementById("totalUsersCount");
    newCountSpan.innerText = value.toString();
});
//invoke the function to send the notification 
function newWindowLoadedClient() {
    //here .send("") the method name given in UserHub.cs file
    //here also adding for invoke the function to send the notification to the server when a new window is loaded
    //change the method name to invoke and console log to show value in the inspect
    //to add the name parameter
    connectionUserCount.invoke("NewWindowLoaded","Sowjanya").then((value)=>console.log(value));
}
//start connection to the server
//it has two methods like fullfilled and rejected , if connection is fullfilled then it will execute the function inside then() and if rejected it will execute the function inside catch()
function fulfilled() {
    console.log("Connection to the server is established successfully.");
    newWindowLoadedClient();
}
function rejected() {
    //rejected logs
}
connectionUserCount.start().then(fulfilled, rejected); 