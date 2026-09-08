//create an connection to the server using SignalR
//near withUrl copy the connection from the hub class in the server side and build() we create an connection to the server
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
    connectionUserCount.send("NewWindowLoaded");
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