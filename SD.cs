namespace SignalRSample
{
    public static class SD
    {
        //we need to intialize everything to 0 in the dictionary so that we can use it in the hub class to increment the values of wand, stone and cloak
        static SD()
        {
            DealthyHallowRace = new Dictionary<string, int>(); 
            DealthyHallowRace.Add(Wand, 0);
            DealthyHallowRace.Add(Stone, 0);
            DealthyHallowRace.Add(Cloak, 0);
        }
        //give values here 
        public const string Wand = "wand";
        public const string Stone = "stone";
        public const string Cloak = "cloak";
        //create a list of strings to hold the values of wand, stone and cloak
        public static Dictionary<string, int> DealthyHallowRace;
    }
}
